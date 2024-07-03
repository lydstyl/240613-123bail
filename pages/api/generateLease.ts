import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import * as fs from 'fs'
import path from 'path'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { put } from '@vercel/blob'

type ResponseData = {
  message: string
  url?: string
}

const schema = z.object({
  tenantName: z.string(),
  lessorName: z.string()
})

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

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun('BAIL DE LOCATION\n\n'),
                new TextRun('Locataire: '),
                new TextRun({
                  text: `\t${parsed.tenantName} `,
                  bold: true
                }),
                new TextRun('bailleur: '),
                new TextRun({
                  text: `\t${parsed.lessorName}`,
                  bold: false
                })
              ]
            })
          ]
        }
      ]
    })

    // Used to export the file into a .docx file
    const buffer = await Packer.toBuffer(doc)
    const fileName = 'bail.docx'
    // const filePath = path.resolve(process.cwd(), 'tmp', fileName)
    const filePath = path.resolve('/tmp', fileName)

    fs.writeFileSync(filePath, buffer)
    const blob = await put(filePath, buffer, { access: 'public' })

    res.status(200).json({ message: `Bail généré: ${blob.url}`, url: blob.url })
  } catch (error) {
    console.log('🚀 ~ error:', error)
  }
}
