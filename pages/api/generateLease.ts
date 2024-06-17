import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log('il faut générer un bail ici')

  res.status(200).json({ message: 'Un bail doit être généré !' })
}
