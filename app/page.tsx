'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import OrderPreviewButton from '@/components/OrderPreviewButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const mySchema2 = z.object({
  managerLastName: z.string().min(1, { message: 'Required !!' }),
  managerFirstName: z.string().min(1, { message: 'Required yé' }),

  companyName: z.string()
})

export type Inputs = z.infer<typeof mySchema2>
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
          <input
            defaultValue='managerLastName'
            {...register('managerLastName')}
          />

          <input
            defaultValue='managerFirstName'
            {...register('managerFirstName', { required: true })}
          />
          {errors.managerFirstName?.message && (
            <p>{errors.managerFirstName?.message?.toString()}</p>
          )}
          <hr />
          <div>
            <input
              defaultValue='companyName'
              {...register('companyName', { required: true })}
            />
            {errors.companyName?.message && (
              <p>{errors.companyName?.message?.toString()}</p>
            )}
          </div>

          <hr />

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
