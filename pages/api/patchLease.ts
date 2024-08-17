import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import * as fs from 'fs'
import path from 'path'
import { patchDocument, PatchType, IPatch, TextRun } from 'docx'
import { put } from '@vercel/blob'
import { schema, Inputs } from '@/_assets/schema'

type ResponseData = {
  message: string
  url?: string
}

const editDocx = async (patches: { readonly [key: string]: IPatch }) => {
  try {
    const doc = await patchDocument(
      fs.readFileSync(path.join(process.cwd(), '_assets', 'template.docx')),
      {
        patches
      }
    )
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
    const parsed = schema.parse(JSON.parse(req.body))
    console.log('🚀 ~ parsed:', parsed)
    if (!parsed) {
      res.status(400).json({ message: 'Content is required' })
      return
    }

    type Tags = {
      // companyName: IPatch,
      companyName: IPatch
      officeStreetNumber: IPatch
      officeStreetName: IPatch
      officeCity: IPatch
      siren: IPatch

      managerLastName: IPatch
      managerFirstName: IPatch
      position: IPatch

      genderSalutation: IPatch
      tenantLastName: IPatch
      tenantFirstName: IPatch
      dateOfBirth: IPatch
      birthCity: IPatch
      tenantStreetNumber: IPatch
      tenantStreetName: IPatch
      tenantCity: IPatch

      residenceStreetNumber: IPatch
      residenceStreetName: IPatch
      residenceCity: IPatch
      livingArea: IPatch

      contractEffectiveDate: IPatch
      rentExcludingCharges: IPatch
      charges: IPatch
    }
    const tags: any = {}
    Object.keys(parsed).forEach((key) => {
      const tag = {
        // type: PatchType.DOCUMENT,
        type: PatchType.PARAGRAPH,
        // children: [new Paragraph({ text: parsed[key as keyof Inputs] })]
        children: [new TextRun({ text: parsed[key as keyof Inputs] })]
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

    const buffer = Buffer.from(doc)
    const fileName = 'bail.docx'
    const filePath = path.resolve('/tmp', fileName)

    fs.writeFileSync(filePath, buffer) // needed ?
    const blob = await put(filePath, buffer, { access: 'public' })

    res.status(200).json({ message: `Bail généré: ${blob.url}`, url: blob.url })
  } catch (error) {
    console.log('🚀 ~ error:', error)
  }
}
