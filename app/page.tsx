'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import OrderPreviewButton from '@/components/OrderPreviewButton'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  tenantName: string
  lessorName: string
}

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
  } = useForm<Inputs>()

  const onSubmit2: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data)
      setIsLoading(true)
      setError(null) // Clear previous errors when a new request starts
      const response: Response = await fetch('/api/patchLease', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
          // 'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        // body: data
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
        <form onSubmit={handleSubmit(onSubmit2)}>
          <input defaultValue='tenantName' {...register('tenantName')} />

          <input
            defaultValue='lessorName'
            {...register('lessorName', { required: true })}
          />
          {errors.lessorName && <span>lessorName est requis</span>}

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
