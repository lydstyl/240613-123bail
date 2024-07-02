// pages/api/download-docx.ts
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.resolve('.', 'public/TestTemplate.docx') // Assurez-vous de mettre le bon chemin
  const fileName = 'your-file.docx' // Nom du fichier à télécharger

  try {
    const fileBuffer = fs.readFileSync(filePath)

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)
    res.setHeader('Content-Length', fileBuffer.length.toString())

    res.status(200).send(fileBuffer)
  } catch (error) {
    console.error('Error downloading file:', error)
    res.status(500).json({ error: 'Failed to download file' })
  }
}
