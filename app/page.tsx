'use client'

import React, { useState, FormEvent } from 'react'

export default function Home() {
  const [leaseUrl, setLeaseUrl] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget)

      const response = await fetch('/api/generateLease', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData))
      })
      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }
      const data = await response.json()
      console.log('🚀 ~ onSubmit ~ data:', data)
      setLeaseUrl(data.url)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(JSON.stringify(error))
    }
  }

  return (
    <main className='p-24'>
      <h1 className='text-2xl'>Créer un bail</h1>

      <form onSubmit={onSubmit}>
        <input
          className='m-10 bg-slate-300'
          type='text'
          name='tenantName'
          placeholder='tenantName'
        />
        <input
          className='m-10 bg-slate-300'
          type='text'
          name='lessorName'
          placeholder='lessorName'
        />
        <button className='bg-slate-200' type='submit'>
          Générer le bail
        </button>
      </form>

      {leaseUrl && <a href={leaseUrl}>Télécharger le bail</a>}
    </main>
  )
}
