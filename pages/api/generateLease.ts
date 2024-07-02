import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import path from 'path'
import { Document, Packer, Paragraph, TextRun } from 'docx'

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log('il faut générer un bail ici', req.body, typeof req.body)

  // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
  // This simple example will only contain one section
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun('Hello World'),
              new TextRun({
                text: req.body,
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
    const filePath = path.resolve('.', 'public/bail.docx')
    // fs.writeFileSync('bail.docx', buffer)
    fs.writeFileSync(filePath, buffer)
  })

  // Done! A file called 'My Document.docx' will be in your file system.

  res.status(200).json({ message: 'Un bail doit être généré !' })
}
