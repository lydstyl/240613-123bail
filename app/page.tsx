'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import OrderPreviewButton from '@/components/OrderPreviewButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { schema } from '@/_assets/schema'

export type Inputs = z.infer<typeof schema>
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
    resolver: zodResolver(schema)
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
          <input defaultValue='companyName' {...register('companyName')} />
          <input
            defaultValue='officeStreetNumber'
            {...register('officeStreetNumber', { required: true })}
          />
          {errors.officeStreetNumber?.message && (
            <p>{errors.officeStreetNumber?.message?.toString()}</p>
          )}
          <input
            defaultValue='officeStreetName'
            {...register('officeStreetName')}
          />
          {errors.officeStreetName?.message && (
            <p>{errors.officeStreetName?.message?.toString()}</p>
          )}
          <input defaultValue='officeCity' {...register('officeCity')} />
          <input defaultValue='siren' {...register('siren')} />

          <hr />
          <input
            defaultValue='managerLastName'
            {...register('managerLastName')}
          />
          <input
            defaultValue='managerFirstName'
            {...register('managerFirstName')}
          />
          <input defaultValue='position' {...register('position')} />
          <hr />

          <hr />
          <input
            defaultValue='genderSalutation'
            {...register('genderSalutation')}
          />
          <input
            defaultValue='tenantLastName'
            {...register('tenantLastName')}
          />
          <input
            defaultValue='tenantFirstName'
            {...register('tenantFirstName')}
          />
          <input defaultValue='dateOfBirth' {...register('dateOfBirth')} />
          <input defaultValue='birthCity' {...register('birthCity')} />
          <input
            defaultValue='tenantStreetNumber'
            {...register('tenantStreetNumber')}
          />
          <input
            defaultValue='tenantStreetName'
            {...register('tenantStreetName')}
          />
          <input defaultValue='tenantCity' {...register('tenantCity')} />
          <hr />

          <hr />
          <input
            defaultValue='residenceStreetNumber'
            {...register('residenceStreetNumber')}
          />
          <input
            defaultValue='residenceStreetName'
            {...register('residenceStreetName')}
          />
          <input defaultValue='residenceCity' {...register('residenceCity')} />
          <input defaultValue='livingArea' {...register('livingArea')} />
          <hr />

          <hr />
          <input
            defaultValue='contractEffectiveDate'
            {...register('contractEffectiveDate')}
          />
          <input
            defaultValue='rentExcludingCharges'
            {...register('rentExcludingCharges')}
          />
          <input defaultValue='charges' {...register('charges')} />
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
