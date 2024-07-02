'use client'

import { useState, FormEvent } from 'react'

export default function Home() {
  const [showDowloadButton, setShowDownloadButton] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/generateLease', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()
    console.log('🚀 ~ onSubmit ~ data:', data)

    setShowDownloadButton(true)
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

      {showDowloadButton && (
        <a href='http://localhost:3000/api/downloadDocx'>Télécharger le bail</a>
      )}
    </main>
  )
}
