import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import * as fs from 'fs'
import path from 'path'
import { Paragraph, patchDocument, PatchType, IPatch } from 'docx'
import { put } from '@vercel/blob'
import { mySchema2, Inputs } from '@/app/page'

type ResponseData = {
  message: string
  url?: string
}

const schema = z.object({
  tenantName: z.string(),
  lessorName: z.string()
})

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
    const parsed = mySchema2.parse(JSON.parse(req.body))
    console.log('🚀 ~ parsed:', parsed)
    if (!parsed) {
      res.status(400).json({ message: 'Content is required' })
      return
    }

    type Tag = {
      type: 'file'
      children: Paragraph[]
    }
    type Tags = {
      // tenantName: IPatch
      tenantName: Tag
      lessorName: Tag
      companyName: Tag
    }
    // | {}
    const tags: any = {}
    const children = Object.keys(parsed).forEach((key) => {
      const tag = {
        type: PatchType.DOCUMENT,
        children: [new Paragraph({ text: parsed[key as keyof Inputs] })]
      }
      // tags[key] = tag

      tags[key as keyof Tags] = tag

      // new Paragraph({ text: parsed[key as keyof Inputs] })
    })

    const patches: {
      readonly [key: string]: IPatch
    } = {
      // my_tag_here: {
      //   type: PatchType.DOCUMENT,
      //   children: [new Paragraph({ text: parsed.lessorName })]
      // }
      ...tags
    }

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
