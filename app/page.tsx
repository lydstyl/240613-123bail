'use client'

import { FormEvent } from 'react'

export default function Home() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/generateLease', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()
    console.log('🚀 ~ onSubmit ~ data:', data)
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
        <button className='bg-slate-200' type='submit'>
          Générer le bail
        </button>
      </form>
    </main>
  )
}
