import { z } from 'zod'

export const formSchema = z.object({
  companyName: z.string().min(2).max(50),
  officeStreetNumber: z.string(),
  officeStreetName: z
    .string()
    .min(1, { message: 'Ce champs est requis mon coco !' }),
  officeCity: z.string(),
  siren: z.string(),

  managerLastName: z.string(),
  managerFirstName: z.string().min(2).max(50),
  position: z.string(),

  genderSalutation: z.string(),
  tenantLastName: z.string(),
  tenantFirstName: z.string(),
  dateOfBirth: z.string(),
  birthCity: z.string(),
  tenantStreetNumber: z.string(),
  tenantStreetName: z.string(),
  tenantCity: z.string(),

  residenceStreetNumber: z.string(),
  residenceStreetName: z.string(),
  residenceCity: z.string(),
  livingArea: z.string(),

  contractEffectiveDate: z.string(),
  rentExcludingCharges: z.string(),
  charges: z.string()
})

export type Inputs = z.infer<typeof formSchema>
