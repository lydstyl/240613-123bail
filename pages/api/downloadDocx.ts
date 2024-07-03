import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'

import { list, del, ListBlobResult } from '@vercel/blob'

type Blob = {
  url: string
}

async function deleteAllBlobs() {
  let cursor

  do {
    const listResult: ListBlobResult = await list({
      cursor,
      limit: 1000
    })
    console.log('🚀 ~ deleteAllBlobs ~ listResult:', listResult)

    if (listResult.blobs.length > 0) {
      await del(listResult.blobs.map((blob: Blob) => blob.url))
    }

    cursor = listResult.cursor
  } while (cursor)

  console.log('All blobs were deleted')
}

// deleteAllBlobs().catch((error) => {
//   console.error('An error occurred:', error)
// })

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

    // remove file after download
    fs.unlinkSync(filePath)
    // await del(blob.url)
    await deleteAllBlobs()
  } catch (error) {
    console.error('Error downloading file:', error)
    res.status(500).json({ error: 'Failed to download file' })
  }
}
