import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const fileName = 'bail.docx'
  const filePath = path.resolve('/tmp', fileName)

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' })
      return
    }
    const fileBuffer = fs.readFileSync(filePath)

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)
    res.setHeader('Content-Length', fileBuffer.length.toString())

    res.status(200).send(fileBuffer)

    // remove file after download todo
    fs.unlinkSync(filePath)
  } catch (error) {
    console.error('Error downloading file:', error)
    res.status(500).json({ error: 'Failed to download file' })
  }
}
