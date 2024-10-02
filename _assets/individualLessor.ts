import { z } from 'zod'

// INDIVIDUAL LESSOR
export const individualLessorAccordionItem = {
  accordionTrigger: 'Bailleur',
  fields: [
    {
      name: 'lessorGenderSalutation',
      label: 'Civilité',
      placeholder: 'Monsieur ou Madame',
      defaultValue: 'Monsieur',
      schema: z.string(),
      description:
        'Entrez la salutation appropriée (Monsieur, Madame) du bailleur.'
    },
    {
      name: 'lessorFirstName',
      label: 'Prénom',
      placeholder: 'Jean',
      defaultValue: 'Jean',
      schema: z.string(),
      description: 'Entrez le prénom du bailleur.'
    },
    {
      name: 'lessorLastName',
      label: 'Nom',
      placeholder: 'Dupont',
      defaultValue: 'Dupont',
      schema: z.string(),
      description: 'Entrez le nom du bailleur.'
    },
    {
      name: 'lessorDateOfBirth',
      label: 'Date de naissance',
      placeholder: '14/05/1994',
      defaultValue: '14/05/1994',
      schema: z.string(),
      description: 'Entrez la date de naissance du bailleur.'
    },
    {
      name: 'lessorBirthCity',
      label: 'Ville de naissance',
      placeholder: 'Paris',
      defaultValue: 'Paris',
      schema: z.string(),
      description: 'Entrez la ville de naissance du bailleur.'
    },
    {
      name: 'lessorStreetNumber',
      label: 'Numéro de rue',
      placeholder: '5',
      defaultValue: '5',
      schema: z.string(),
      description: 'Entrez le numéro de rue du bailleur.'
    },
    {
      name: 'lessorStreetName',
      label: 'Nom de rue',
      placeholder: 'Avenue de la Liberté',
      defaultValue: 'Avenue de la Liberté',
      schema: z.string(),
      description: 'Entrez le nom de rue du bailleur.'
    },
    {
      name: 'lessorPostalCode',
      label: 'Code postal',
      placeholder: '59590',
      defaultValue: '59590',
      schema: z.string(),
      description: 'Entrez le code postal du bailleur.'
    },
    {
      name: 'lessorCity',
      label: 'Ville',
      placeholder: 'Raismes',
      defaultValue: 'Raismes',
      schema: z.string(),
      description: 'Entrez la ville où habite le bailleur.'
    }
  ]
}
export const individualLessorSchemaShape =
  individualLessorAccordionItem.fields.reduce((acc, { name }) => {
    acc[name] = z.string() // Assuming all values are strings
    return acc
  }, {} as Record<string, any>)
export const individualLessorDefaultValues =
  individualLessorAccordionItem.fields.reduce((acc, { name, defaultValue }) => {
    acc[name] = defaultValue
    return acc
  }, {} as Record<string, string>)
