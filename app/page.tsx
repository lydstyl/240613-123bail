'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import OrderPreviewButton from '@/components/OrderPreviewButton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  accordionItems,
  individualFormSchema,
  IndividualForm, // type from individualFormSchema
  individualFormDefaultValues
} from '@/_assets/schema'
import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'

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
// import ProgressDemo from '@/components/ProgressDemo'

type Props = {
  // leaseUrl: string | null
}

const Home: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const leaseUrl2 = searchParams?.get('leaseUrl2') || null

  const [leaseUrl, setLeaseUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<IndividualForm>({
    resolver: zodResolver(individualFormSchema),
    defaultValues: individualFormDefaultValues
  })

  const onSubmit = async (data: IndividualForm) => {
    try {
      setIsLoading(true)
      setError(null)
      console.log('🚀 ~ onSubmit ~ data:', data)
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
      console.log('🚀 ~ onSubmit ~ data2:', data2)
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
      {/* <ProgressDemo /> */}
      <h1 className='text-2xl'>123 bail !</h1>

      {!leaseUrl2 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <Accordion type='single' collapsible className='w-full'>
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={`item-${index + 1}`}
                  value={`item-${index + 1}`}
                >
                  <AccordionTrigger>{item.accordionTrigger}</AccordionTrigger>
                  <AccordionContent>
                    {item.fields.map((fieldItem, index) => (
                      <FormField
                        key={`${item.accordionTrigger}-${index}-${fieldItem.name}`}
                        control={form.control}
                        name={fieldItem.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{fieldItem.label}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={fieldItem.placeholder}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {fieldItem.description}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

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
      {leaseUrl && <a href={leaseUrl}>Remove this download dev button</a>}
    </main>
  )
}

export default Home
