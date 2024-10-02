import { z } from 'zod'

// CONTRAT
export const contractAccordionItem = {
  accordionTrigger: 'Contrat',
  fields: [
    {
      name: 'contractEffectiveDate',
      label: "Date d'effet du bail",
      placeholder: '01/09/2024',
      defaultValue: '01/09/2024',
      schema: z.string(),
      description: "Entrez la date d'effet du bail."
    },
    {
      name: 'contractRentExcludingCharges',
      label: 'Loyer hors charges',
      placeholder: '600',
      defaultValue: '600',
      schema: z.string(),
      description: 'Entrez le loyer hors charges.'
    },
    {
      name: 'contractCharges',
      label: 'Charges',
      placeholder: '60',
      defaultValue: '60',
      schema: z.string(),
      description: 'Entrez les charges.'
    },
    {
      name: 'contractProRataRent',
      label: 'Prorata de loyer',
      placeholder: '420',
      defaultValue: '420',
      schema: z.string().optional(),
      description:
        'Indiquez le montant du prorata de loyer pour un emménagement en cours de mois (le cas échéant).'
    }
  ]
}
export const contractSchemaShape = contractAccordionItem.fields.reduce(
  (acc, { name }) => {
    acc[name] = z.string() // Assuming all values are strings
    return acc
  },
  {} as Record<string, any>
)
export const contractDefaultValues = contractAccordionItem.fields.reduce(
  (acc, { name, defaultValue }) => {
    acc[name] = defaultValue
    return acc
  },
  {} as Record<string, string>
)
