import { IPatch } from 'docx'
import { z } from 'zod'
import {
  individualLessorAccordionItem,
  individualLessorDefaultValues,
  individualLessorSchemaShape
} from './individualLessor'
import {
  tenantAccordionItem,
  tenantSchemaShape,
  tenantDefaultValues
} from './tenant'
import {
  contractAccordionItem,
  contractSchemaShape,
  contractDefaultValues
} from './contract'
import {
  residenceAccordionItem,
  residenceSchemaShape,
  residenceDefaultValues
} from './residence'

export const accordionItems = [
  individualLessorAccordionItem,
  tenantAccordionItem,
  residenceAccordionItem,
  contractAccordionItem
]

export const individualFormSchema = z.object({
  ...individualLessorSchemaShape,
  ...tenantSchemaShape,
  ...residenceSchemaShape,
  ...contractSchemaShape
})

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
// console.log(
//   '🚀 ~ arrayToCreateTags:',
//   arrayToCreateTags.map((item) => item.name).join('}} {{')
// )
export type Tags = {
  [K in (typeof arrayToCreateTags)[number]['name']]: IPatch
}
