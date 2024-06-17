import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function hello(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log('hello')

  res.status(200).json({ message: 'hello app router !' })
}
