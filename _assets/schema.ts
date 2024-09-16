import { z } from 'zod'

export const chooseLessorType = z.object({
  individual: z.boolean()
})
export const individualLessorSchema = z.object({
  genderSalutation: z.string(),
  lastName: z.string(),
  firstName: z.string(),
  dateOfBirth: z.string(),
  birthCity: z.string(),
  streetNumber: z.string(),
  streetName: z.string(),
  city: z.string(),
  postalCode: z.string()
})
export const companyLessorSchema = z.object({
  companyName: z.string().min(2).max(50),
  officeStreetNumber: z.string(),
  officeStreetName: z
    .string()
    .min(1, { message: 'Ce champs est requis mon coco !' }),
  officeCity: z.string(),
  siren: z.string(),

  managerLastName: z.string(),
  managerFirstName: z.string().min(2).max(50),
  position: z.string()
})
export const tenantSchema = z.object({
  genderSalutation: z.string(),
  tenantLastName: z.string(),
  tenantFirstName: z.string(),
  dateOfBirth: z.string(),
  birthCity: z.string(),
  tenantStreetNumber: z.string(),
  tenantStreetName: z.string(),
  tenantCity: z.string()
})
export const residenceSchema = z.object({
  residenceStreetNumber: z.string(),
  residenceStreetName: z.string(),
  residenceCity: z.string(),
  livingArea: z.string()
})

export const contratSchema = z.object({
  contractEffectiveDate: z.string(),
  rentExcludingCharges: z.string(),
  charges: z.string()
})

export const formSchema = z.union([
  companyLessorSchema,
  tenantSchema,
  residenceSchema,
  contratSchema
])

export const formDefaultValues = {
  // individual: false,

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

export type Inputs = z.infer<typeof formSchema>
