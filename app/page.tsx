'use client'

import React, { useState, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import OrderPreviewButton from '@/components/OrderPreviewButton'

type Props = {
  // leaseUrl: string | null
}

const Home: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const leaseUrl2 = searchParams?.get('leaseUrl2') || null

  const [leaseUrl, setLeaseUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget)

      const response = await fetch('/api/patchLease', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
          // 'Content-Type': 'application/json'
        },
        // body: Object.fromEntries(formData)
        body: JSON.stringify(Object.fromEntries(formData))
      })
      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }
      const data = await response.json()
      setLeaseUrl(data.url)
      // // in local storage
      // if (typeof window !== 'undefined') {
      //   console.log('localStorage', data.url)

      //   localStorage.setItem(data.url, data.url)
      // }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(JSON.stringify(error))
    }
  }

  return (
    <main className='p-24'>
      <h1 className='text-2xl'>123 bail !</h1>

      {!leaseUrl2 && (
        <form onSubmit={onSubmit}>
          <input
            className='m-10 bg-slate-300'
            type='text'
            name='tenantName'
            placeholder='Nom du locataire'
          />
          <input
            className='m-10 bg-slate-300'
            type='text'
            name='lessorName'
            placeholder='Nom du bailleur'
          />

          <button className='bg-slate-200' type='submit'>
            Générer le bail
          </button>
        </form>
      )}

      {leaseUrl && <OrderPreviewButton leaseUrl={leaseUrl} />}
      {leaseUrl2 && <a href={leaseUrl2}>Télécharger le bail</a>}

      {leaseUrl && <a href={leaseUrl}>Remove this download dev button</a>}
      {/* mettre tout ça sur une autre page pour que la home soit une home de SEO avec video et argument marketing */}
    </main>
  )
}

export default Home
