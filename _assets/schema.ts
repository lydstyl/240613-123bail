import { IPatch } from 'docx'
import { z } from 'zod'

// INDIVIDUAL LESSOR
const individualLessorAccordionItem = {
  accordionTrigger: 'Bailleur',
  fields: [
    {
      name: 'lessorGenderSalutation', //
      label: 'Civilité',
      placeholder: 'Monsieur ou Madame',
      defaultValue: 'Monsieur', //
      schema: z.string(), //
      description:
        'Entrez la salutation appropriée (Monsieur, Madame) du locataire.'
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
      name: 'lessorFirstName',
      label: 'Prénom',
      placeholder: 'Jean',
      defaultValue: 'Jean',
      schema: z.string(),
      description: 'Entrez le prénom du bailleur.'
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
      placeholder: 'Lyon',
      defaultValue: '14/05/1994',
      schema: z.string(),
      description: 'Entrez la ville de naissance du bailleur.'
    },
    {
      name: 'lessorStreetNumber',
      label: 'Numéro de rue',
      placeholder: '5',
      defaultValue: '14/05/1994',
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
      name: 'lessorCity',
      label: 'Ville',
      placeholder: 'Marseille',
      defaultValue: 'Marseille',
      schema: z.string(),
      description: 'Entrez la ville du bailleur.'
    },
    {
      name: 'lessorPostalCode',
      label: 'Code postal',
      placeholder: '13000',
      defaultValue: '13000',
      schema: z.string(),
      description: 'Entrez le code postal du bailleur.'
    }
  ]
}
const individualLessorSchemaShape = individualLessorAccordionItem.fields.reduce(
  (acc, { name }) => {
    acc[name] = z.string() // Assuming all values are strings
    return acc
  },
  {} as Record<string, any>
)
const individualLessorSchema = z.object(individualLessorSchemaShape)
const individualLessorDefaultValues =
  individualLessorAccordionItem.fields.reduce((acc, { name, defaultValue }) => {
    acc[name] = defaultValue
    return acc
  }, {} as Record<string, string>)

// TENANT
const tenantAccordionItem = {
  accordionTrigger: 'Locataire',
  fields: [
    {
      name: 'tenantGenderSalutation',
      label: 'Civilité',
      placeholder: 'Monsieur ou Madame',
      defaultValue: 'Monsieur',
      schema: z.string(),
      description:
        'Entrez la salutation appropriée (Monsieur, Madame) du locataire.'
    },
    {
      name: 'tenantLastName',
      label: 'Nom',
      placeholder: 'Dupont',
      defaultValue: 'Dupont',
      schema: z.string(),
      description: 'Entrez le nom du locataire.'
    },
    {
      name: 'tenantFirstName',
      label: 'Prénom',
      placeholder: 'Jean',
      defaultValue: 'Jean',
      schema: z.string(),
      description: 'Entrez le prénom du locataire.'
    },
    {
      name: 'tenantDateOfBirth',
      label: 'Date de naissance',
      placeholder: '14/05/1994',
      defaultValue: '14/05/1994',
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
      placeholder: '5',
      defaultValue: '5',
      schema: z.string(),
      description: 'Entrez le numéro de rue du locataire.'
    },
    {
      name: 'tenantStreetName',
      label: 'Nom de rue',
      placeholder: 'Avenue de la Liberté',
      defaultValue: 'Avenue de la Liberté',
      schema: z.string(),
      description: 'Entrez le nom de rue du locataire.'
    },
    {
      name: 'tenantCity',
      label: 'Ville',
      placeholder: 'Marseille',
      defaultValue: 'Marseille',
      schema: z.string(),
      description: 'Entrez la ville du locataire.'
    }
  ]
}
const tenantSchemaShape = tenantAccordionItem.fields.reduce((acc, { name }) => {
  acc[name] = z.string() // Assuming all values are strings
  return acc
}, {} as Record<string, any>)
const tenantSchema = z.object(tenantSchemaShape)
const tenantDefaultValues = tenantAccordionItem.fields.reduce(
  (acc, { name, defaultValue }) => {
    acc[name] = defaultValue
    return acc
  },
  {} as Record<string, string>
)

// RESIDENCE
const residenceAccordionItem = {
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
const residenceSchemaShape = residenceAccordionItem.fields.reduce(
  (acc, { name }) => {
    acc[name] = z.string() // Assuming all values are strings
    return acc
  },
  {} as Record<string, any>
)
const residenceSchema = z.object(residenceSchemaShape)
const residenceDefaultValues = residenceAccordionItem.fields.reduce(
  (acc, { name, defaultValue }) => {
    acc[name] = defaultValue
    return acc
  },
  {} as Record<string, string>
)

// CONTRAT
const contractAccordionItem = {
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
    }
  ]
}
const contractSchemaShape = contractAccordionItem.fields.reduce(
  (acc, { name }) => {
    acc[name] = z.string() // Assuming all values are strings
    return acc
  },
  {} as Record<string, any>
)
const contractSchema = z.object(contractSchemaShape)
const contractDefaultValues = contractAccordionItem.fields.reduce(
  (acc, { name, defaultValue }) => {
    acc[name] = defaultValue
    return acc
  },
  {} as Record<string, string>
)

export const accordionItems = [
  individualLessorAccordionItem,
  tenantAccordionItem,
  residenceAccordionItem,
  contractAccordionItem
]
export const individualFormSchema = z.union([
  individualLessorSchema,
  tenantSchema,
  residenceSchema,
  contractSchema
])
export type IndividualForm = z.infer<typeof individualFormSchema>

export const individualFormDefaultValues: IndividualForm = {
  ...individualLessorDefaultValues,
  ...tenantDefaultValues,
  ...residenceDefaultValues,
  ...contractDefaultValues
}

const arrayToCreateTags = [
  ...contractAccordionItem.fields,
  ...individualLessorAccordionItem.fields,
  ...residenceAccordionItem.fields,
  ...tenantAccordionItem.fields
]
export type Tags = {
  [K in (typeof arrayToCreateTags)[number]['name']]: IPatch
}
