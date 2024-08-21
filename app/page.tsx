'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import OrderPreviewButton from '@/components/OrderPreviewButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formSchema } from '@/_assets/schema'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type Props = {
  // leaseUrl: string | null
}

const Home: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const leaseUrl2 = searchParams?.get('leaseUrl2') || null

  const [leaseUrl, setLeaseUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: 'LOGIS ANGE',
      officeStreetNumber: '12',
      officeStreetName: 'Rue des Fleurs',
      officeCity: 'Paris',
      siren: '123456789',

      managerLastName: 'Dupont',
      managerFirstName: 'Jean',
      position: 'gérant',

      genderSalutation: 'Monsieur',
      tenantLastName: 'Martin',
      tenantFirstName: 'Pierre',
      dateOfBirth: '14/05/1994',
      birthCity: 'Lyon',
      tenantStreetNumber: '5',
      tenantStreetName: 'Avenue de la Liberté',
      tenantCity: 'Marseille',

      residenceStreetNumber: '8',
      residenceStreetName: 'Boulevard Saint-Germain',
      residenceCity: 'Paris',
      livingArea: '75',

      contractEffectiveDate: '01/09/2024',
      rentExcludingCharges: '1000',
      charges: '100'
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='companyName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la SCI</FormLabel>
                  <FormControl>
                    <Input placeholder='companyName' {...field} />
                  </FormControl>
                  <FormDescription>
                    C'est le nom de votre SCI ou entreprise bailleur.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='officeStreetNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de rue</FormLabel>
                  <FormControl>
                    <Input placeholder='officeStreetNumber' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le numéro de rue de la SCI.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='officeStreetName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la rue</FormLabel>
                  <FormControl>
                    <Input placeholder='officeStreetName' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le nom de la rue de la SCI.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='officeCity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input placeholder='officeCity' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez la ville où se trouve la SCI.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='siren'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro SIREN</FormLabel>
                  <FormControl>
                    <Input placeholder='siren' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le numéro SIREN de la société.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='managerLastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du manageur</FormLabel>
                  <FormControl>
                    <Input placeholder='managerLastName' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le nom de famille du manageur de la SCI.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='managerFirstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom du manageur</FormLabel>
                  <FormControl>
                    <Input placeholder='managerFirstName' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le prénom du manageur de la SCI.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='position'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position du manageur</FormLabel>
                  <FormControl>
                    <Input placeholder='position' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez la position du manageur dans la SCI.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='genderSalutation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Civilité</FormLabel>
                  <FormControl>
                    <Input placeholder='genderSalutation' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez la salutation appropriée (Monsieur, Madame, etc.) du
                    locataire.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tenantLastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du locataire</FormLabel>
                  <FormControl>
                    <Input placeholder='tenantLastName' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le nom de famille du locataire.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tenantFirstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom du locataire</FormLabel>
                  <FormControl>
                    <Input placeholder='tenantFirstName' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le prénom du locataire.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dateOfBirth'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input placeholder='dateOfBirth' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez la date de naissance du locataire.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='birthCity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville de naissance</FormLabel>
                  <FormControl>
                    <Input placeholder='birthCity' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez la ville de naissance du locataire.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tenantStreetNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de rue du locataire</FormLabel>
                  <FormControl>
                    <Input placeholder='tenantStreetNumber' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le numéro de rue de l'adresse du locataire.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tenantStreetName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de rue du locataire</FormLabel>
                  <FormControl>
                    <Input placeholder='tenantStreetName' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le nom de la rue de l'adresse du locataire.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tenantCity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville du locataire</FormLabel>
                  <FormControl>
                    <Input placeholder='tenantCity' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez la ville où réside le locataire avant l'entrée dans
                    le logement à louer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='residenceStreetNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de rue de la résidence</FormLabel>
                  <FormControl>
                    <Input placeholder='residenceStreetNumber' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le numéro de rue de la résidence à louer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='residenceStreetName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de rue de la résidence</FormLabel>
                  <FormControl>
                    <Input placeholder='residenceStreetName' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le nom de la rue de la résidence à louer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='residenceCity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville de la résidence</FormLabel>
                  <FormControl>
                    <Input placeholder='residenceCity' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez la ville où se trouve la résidence à louer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='livingArea'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surface habitable</FormLabel>
                  <FormControl>
                    <Input placeholder='livingArea' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez la surface habitable de la résidence à louer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='contractEffectiveDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début du contrat</FormLabel>
                  <FormControl>
                    <Input placeholder='contractEffectiveDate' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez la date de début du contrat.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='rentExcludingCharges'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loyer hors charges</FormLabel>
                  <FormControl>
                    <Input placeholder='rentExcludingCharges' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le montant du loyer hors charges.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='charges'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charges</FormLabel>
                  <FormControl>
                    <Input placeholder='charges' {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrez le montant des charges.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      )}

      <hr />

      {leaseUrl && <OrderPreviewButton leaseUrl={leaseUrl} />}
      {leaseUrl2 && <a href={leaseUrl2}>Télécharger le bail</a>}
      {leaseUrl && <a href={leaseUrl}>Remove this download dev button</a>}
    </main>
  )
}

export default Home
