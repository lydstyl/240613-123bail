import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import path from 'path'
import { patchDocument, PatchType, IPatch, TextRun } from 'docx'
import { put } from '@vercel/blob'
import { individualFormSchema, IndividualForm } from '@/_assets/schema'
import { Tags } from '@/_assets/schema'

type ResponseData = {
  message: string
  url?: string
}
// https://docx.js.org/#/usage/patcher

// interface Patch {
//   type: PatchType
//   children: FileChild[] | ParagraphChild[]
// }

// const editDocx = async (patches: { readonly [key: string]: IPatch }) => {
//   try {
//     const doc = await patchDocument(
//       fs.readFileSync(path.join(process.cwd(), '_assets', 'template.docx')),
//       {
//         // patches

//         //   "patch1": {
//         //     type: "PARAGRAPH", // Patch type can be either "DOCUMENT" or "PARAGRAPH"
//         //     children: [
//         //         { type: "Text", content: "This is some new paragraph text." },
//         //         { type: "Image", content: "image-url-or-path" }
//         //     ]
//         // },
//         // "patch2": {
//         //     type: "DOCUMENT", // Here we are patching at the document level
//         //     children: [
//         //         { type: "Paragraph", content: "This is an entire new paragraph." },
//         //         { type: "Table", content: "Table data or structure" }
//         //     ]
//         // }
//       }
//     )
//     return doc
//   }

const editDocx = async (patches: { readonly [key: string]: IPatch }) => {
  try {
    const doc = await patchDocument({
      outputType: 'arraybuffer',
      data: 'data',
      patches,
      keepOriginalStyles: true
    })
    return doc
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method not allowed' })
      return
    }
    const parsed = individualFormSchema.parse(JSON.parse(req.body))
    console.log('🚀 ~ parsed:', parsed)
    if (!parsed) {
      res.status(400).json({ message: 'Content is required' })
      return
    }

    // type Tags = {
    //   // companyName: IPatch,
    //   companyName: IPatch
    //   officeStreetNumber: IPatch
    //   officeStreetName: IPatch
    //   officeCity: IPatch
    //   siren: IPatch

    //   managerLastName: IPatch
    //   managerFirstName: IPatch
    //   position: IPatch

    //   genderSalutation: IPatch
    //   tenantLastName: IPatch
    //   tenantFirstName: IPatch
    //   dateOfBirth: IPatch
    //   birthCity: IPatch
    //   tenantStreetNumber: IPatch
    //   tenantStreetName: IPatch
    //   tenantCity: IPatch

    //   residenceStreetNumber: IPatch
    //   residenceStreetName: IPatch
    //   residenceCity: IPatch
    //   livingArea: IPatch

    //   contractEffectiveDate: IPatch
    //   rentExcludingCharges: IPatch
    //   charges: IPatch
    // }
    const tags: any = {}
    Object.keys(parsed).forEach((key) => {
      const tag = {
        // type: PatchType.DOCUMENT,
        type: PatchType.PARAGRAPH,
        // children: [new Paragraph({ text: parsed[key as keyof Inputs] })]
        children: [new TextRun({ text: parsed[key as keyof IndividualForm] })]
      }
      tags[key as keyof Tags] = tag
    })

    const patches: {
      readonly [key: string]: IPatch
    } = tags

    const doc = await editDocx(patches)
    if (!doc) {
      throw new Error('Failed to generate the document')
    }

    const buffer = Buffer.from(new Uint8Array(doc as ArrayBuffer))
    const fileName = 'bail.docx'
    const filePath = path.resolve('/tmp', fileName)

    fs.writeFileSync(filePath, buffer) // needed ?
    const blob = await put(filePath, buffer, { access: 'public' })

    res.status(200).json({ message: `Bail généré: ${blob.url}`, url: blob.url })
  } catch (error) {
    console.log('🚀 ~ error:', error)
  }
}
