import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { NextRequest, NextResponse } from 'next/server'
import * as fs from 'fs'
import path from 'path'
import { Document, Packer, Paragraph, TextRun } from 'docx'

type ResponseData = {
  message: string
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
    const parsed = schema.parse(JSON.parse(req.body))
    console.log('🚀 ~ parsed:', parsed)

    // res.redirect(307, `/api/downloadDocx`)

    // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
    // This simple example will only contain one section
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun('Hello World '),
                new TextRun({
                  text: `${parsed.tenantName} ${parsed.lessorName}`,
                  bold: true
                }),
                new TextRun({
                  text: parsed.lessorName,
                  bold: true
                }),
                new TextRun({
                  text: '\tGithub is the best',
                  bold: true
                })
              ]
            })
          ]
        }
      ]
    })

    // Used to export the file into a .docx file
    Packer.toBuffer(doc).then((buffer) => {
      const filePath = path.resolve('.', 'tmp/bail.docx')
      // fs.writeFileSync('bail.docx', buffer)
      fs.writeFileSync(filePath, buffer)
    })

    // Done! A file called 'My Document.docx' will be in your file system.

    res.status(200).json({ message: 'Un bail doit être généré !' })
  } catch (error) {
    console.log('🚀 ~ error:', error)
  }
}
