import { z } from 'zod'

// TENANT
export const tenantAccordionItem = {
  accordionTrigger: 'Locataire',
  fields: [
    {
      name: 'tenantGenderSalutation',
      label: 'Civilité',
      placeholder: 'Monsieur ou Madame',
      defaultValue: 'Madame',
      schema: z.string(),
      description:
        'Entrez la salutation appropriée (Monsieur, Madame) du locataire.'
    },
    {
      name: 'tenantFirstName',
      label: 'Prénom',
      placeholder: 'Janine',
      defaultValue: 'Janine',
      schema: z.string(),
      description: 'Entrez le prénom du locataire.'
    },
    {
      name: 'tenantLastName',
      label: 'Nom',
      placeholder: 'Chirac',
      defaultValue: 'Chirac',
      schema: z.string(),
      description: 'Entrez le nom du locataire.'
    },
    {
      name: 'tenantDateOfBirth',
      label: 'Date de naissance',
      placeholder: '18/05/1884',
      defaultValue: '18/05/1884',
      schema: z.string(),
      description: 'Entrez la date de naissance du locataire.'
    },
    {
      name: 'tenantBirthCity',
      label: 'Ville de naissance',
      placeholder: 'Lyon',
      defaultValue: 'Lyon',
      schema: z.string(),
      description: 'Entrez la ville de naissance du locataire.'
    },
    {
      name: 'tenantStreetNumber',
      label: 'Numéro de rue',
      placeholder: '43',
      defaultValue: '43',
      schema: z.string(),
      description: 'Entrez le numéro de rue du locataire.'
    },
    {
      name: 'tenantStreetName',
      label: 'Nom de rue',
      placeholder: 'Avenue de la Liberté',
      defaultValue: 'Rue Jean Jaurès',
      schema: z.string(),
      description: 'Entrez le nom de rue du locataire.'
    },
    {
      name: 'tenantPostalCode',
      label: 'Code postal',
      placeholder: '59599',
      defaultValue: '59599',
      schema: z.string(),
      description: 'Entrez le code postal du bailleur.'
    },
    {
      name: 'tenantCity',
      label: 'Ville',
      placeholder: 'Tourcoing',
      defaultValue: 'Tourcoing',
      schema: z.string(),
      description: 'Entrez la ville du locataire.'
    }
  ]
}
export const tenantSchemaShape = tenantAccordionItem.fields.reduce(
  (acc, { name }) => {
    acc[name] = z.string() // Assuming all values are strings
    return acc
  },
  {} as Record<string, any>
)
export const tenantDefaultValues = tenantAccordionItem.fields.reduce(
  (acc, { name, defaultValue }) => {
    acc[name] = defaultValue
    return acc
  },
  {} as Record<string, string>
)
