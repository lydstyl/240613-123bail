'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import OrderPreviewButton from '@/components/OrderPreviewButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formDefaultValues, companyFormSchema } from '@/_assets/schema'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { Progress } from '@/components/ui/progress'

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} />
}

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Link from 'next/link'

type Props = {
  // leaseUrl: string | null
}

const Home: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const leaseUrl2 = searchParams?.get('leaseUrl2') || null

  const [leaseUrl, setLeaseUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: formDefaultValues
  })

  const onSubmit = async (data: z.infer<typeof companyFormSchema>) => {
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
      <ProgressDemo />
      <h1 className='text-2xl'>123 bail !</h1>
      <hr className='border-4 border-primary' />

      {!leaseUrl2 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Bailleur</AccordionTrigger>
                <AccordionContent>
                  {/* <FormField
                    control={form.control}
                    name='individual'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox {...field} />
                        </FormControl>
                        <FormLabel className='pl-2'>
                          Je suis un particulier
                        </FormLabel>
                        <FormDescription>
                          Si vous êtes une SCI ou autre société ne coché pas
                          cette case.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
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
                          Le nom de votre SCI ou entreprise bailleur.
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
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger>Locataire</AccordionTrigger>
                <AccordionContent>
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
                          Entrez la salutation appropriée (Monsieur, Madame,
                          etc.) du locataire.
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
                          {"Entrez le numéro de rue de l'adresse du locataire."}
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
                          {"Entrez le nom de la rue de l'adresse du locataire."}
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
                          {
                            "Entrez la ville où réside le locataire avant l'entrée dans le logement à louer."
                          }
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4'>
                <AccordionTrigger>Résidence louée</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name='residenceStreetNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de rue de la résidence</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='residenceStreetNumber'
                            {...field}
                          />
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
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-5'>
                <AccordionTrigger>Contrat</AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name='contractEffectiveDate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de début du contrat</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='contractEffectiveDate'
                            {...field}
                          />
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
                          <Input
                            placeholder='rentExcludingCharges'
                            {...field}
                          />
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <hr className='border-4 border-primary' />

            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      )}

      {leaseUrl && <OrderPreviewButton leaseUrl={leaseUrl} />}
      {leaseUrl2 && (
        <>
          <a href={leaseUrl2}>Télécharger le bail</a>
          <div>
            <Link href='/'>Créer un nouveau bail.</Link>
          </div>
        </>
      )}
      {/* {leaseUrl && <a href={leaseUrl}>Remove this download dev button</a>} */}
    </main>
  )
}

export default Home
