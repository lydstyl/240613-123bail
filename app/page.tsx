'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import OrderPreviewButton from '@/components/OrderPreviewButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const mySchema2 = z.object({
  tenantName: z.string().min(1, { message: 'Required !!' }),
  lessorName: z.string().min(1, { message: 'Required yé' })
})

type Inputs = z.infer<typeof mySchema2>
type Props = {
  // leaseUrl: string | null
}

const Home: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const leaseUrl2 = searchParams?.get('leaseUrl2') || null

  const [leaseUrl, setLeaseUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(mySchema2)
  })

  const onSubmit = async (data: any) => {
    try {
      console.log(data)
      setIsLoading(true)
      setError(null)
      const response: Response = await fetch('/api/patchLease', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
          // 'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }
      const data2 = await response.json()
      setLeaseUrl(data2.url)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(JSON.stringify(error))
    }
  }

  if (error) {
    return <div>{error}</div>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className='p-24'>
      <h1 className='text-2xl'>123 bail !</h1>
      <hr />
      {!leaseUrl2 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue='tenantName' {...register('tenantName')} />

          <input
            defaultValue='lessorName'
            {...register('lessorName', { required: true })}
          />
          {errors.lessorName?.message && (
            <p>{errors.lessorName?.message?.toString()}</p>
          )}

          <input type='submit' />
        </form>
      )}
      <hr />
      {leaseUrl && <OrderPreviewButton leaseUrl={leaseUrl} />}
      {leaseUrl2 && <a href={leaseUrl2}>Télécharger le bail</a>}
      {leaseUrl && <a href={leaseUrl}>Remove this download dev button</a>}
    </main>
  )
}

export default Home
