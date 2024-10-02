import { z } from 'zod'

// RESIDENCE
export const residenceAccordionItem = {
  accordionTrigger: 'Résidence',
  fields: [
    {
      name: 'residenceStreetNumber',
      label: 'Numéro de rue',
      placeholder: '8',
      defaultValue: '8',
      schema: z.string(),
      description: 'Entrez le numéro de rue de la résidence.'
    },
    {
      name: 'residenceStreetName',
      label: 'Nom de rue',
      placeholder: 'Boulevard Saint-Germain',
      defaultValue: 'Boulevard Saint-Germain',
      schema: z.string(),
      description: 'Entrez le nom de rue de la résidence.'
    },
    {
      name: 'residenceCity',
      label: 'Ville',
      placeholder: 'Paris',
      defaultValue: 'Paris',
      schema: z.string(),
      description: 'Entrez la ville de la résidence.'
    },
    {
      name: 'residenceLivingArea',
      label: 'Surface habitable',
      placeholder: '75',
      defaultValue: '75',
      schema: z.string(),
      description: 'Entrez la surface en m² habitable de la résidence.'
    }
  ]
}
export const residenceSchemaShape = residenceAccordionItem.fields.reduce(
  (acc, { name }) => {
    acc[name] = z.string() // Assuming all values are strings
    return acc
  },
  {} as Record<string, any>
)
export const residenceDefaultValues = residenceAccordionItem.fields.reduce(
  (acc, { name, defaultValue }) => {
    acc[name] = defaultValue
    return acc
  },
  {} as Record<string, string>
)
