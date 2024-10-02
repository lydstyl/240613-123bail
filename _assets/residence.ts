import { z } from 'zod'

// RESIDENCE
export const residenceAccordionItem = {
  accordionTrigger: 'Résidence louée',
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
      name: 'residencePostalCode',
      label: 'Code postal',
      placeholder: '75000',
      defaultValue: '75000',
      schema: z.string(),
      description: 'Entrez le code postal de la résidence.'
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
    },
    {
      name: 'residenceNumberOfMainRooms',
      label: 'Nombre de pièces principales',
      placeholder: '3',
      defaultValue: '3',
      schema: z.number(),
      description: 'Entrez le nombre de pièces principales du logement.'
    },
    {
      name: 'residenceAccessoryPremises',
      label: 'Locaux loués accessoires',
      placeholder: 'Garage, cave, parking',
      defaultValue: 'Cave',
      schema: z.string().optional(),
      description:
        'Indiquez les locaux loués accessoires au logement (garage, cave, parking, etc.).'
    },
    {
      name: 'residenceOtherPartsOfTheHouse',
      label: 'Autres parties du logement',
      placeholder: 'Balcon, terrasse, jardin',
      defaultValue: 'Balcon',
      schema: z.string().optional(),
      description:
        'Indiquez les autres parties incluses dans la location qui ne sont pas des locaux accessoires (balcon, terrasse, jardin, etc.).'
    },
    {
      name: 'residenceEquipment',
      label: 'Équipements du logement',
      placeholder: 'Four, réfrigérateur, plaques de cuisson',
      defaultValue: 'Four',
      schema: z.string().optional(),
      description: 'Indiquez les équipements du logement (si équipé).'
    },
    {
      name: 'residenceHeatingType',
      label: 'Type de chauffage',
      placeholder: 'Individuel',
      defaultValue: 'Individuel',
      schema: z.string(),
      description: 'Indiquez le type de chauffage (individuel ou collectif).'
    },
    {
      name: 'residenceHotWaterSystem',
      label: 'Système de production d’eau chaude sanitaire',
      placeholder: 'Individuel',
      defaultValue: 'Individuel',
      schema: z.string(),
      description:
        'Indiquez le système de production d’eau chaude sanitaire (individuel ou collectif).'
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
