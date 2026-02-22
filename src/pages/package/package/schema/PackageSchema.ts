import * as Yup from 'yup';

const entrySchema = Yup.object({
  id: Yup.string().optional(),
  title: Yup.string().required('Title is required'),
  description: Yup.string().optional().default(''),
});

export const PackageValidationSchema = Yup.object({
  package_type_id: Yup.string().required('Package Type is required'),
  country_id: Yup.string().required('Country is required'),
  category_id: Yup.string().required('Package Category is required'),

  city_id: Yup.array()
    .of(Yup.string().required())
    .min(1, 'City is required')
    .required('City is required'),

  name: Yup.string().required('Package Name is required'),
  description: Yup.string().required('Package Description is required'),
  destination: Yup.string().required('Destination is required'),

  duration: Yup.number().required().positive(),

  start_point: Yup.string().required(),
  end_point: Yup.string().required(),

  group_size: Yup.string().required(),
  max_altitude: Yup.string().required(),

  image: Yup.mixed().optional(),

  previous_price: Yup.string().required(),
  current_price: Yup.string().required(),

  start_date: Yup.string().required(),
  end_date: Yup.string().required(),

  cancellation_policy: Yup.string().required(),
  payment_policy: Yup.string().required(),
  terms_conditions: Yup.string().required(),

  is_top_tour: Yup.boolean().required(),
  is_top_deals: Yup.boolean().required(),

  inclusions: Yup.array().of(entrySchema).default([]),
  exclusions: Yup.array().of(entrySchema).default([]),
  notices: Yup.array().of(entrySchema).default([]),
  highlights: Yup.array().of(entrySchema).default([]),

  itinerary: Yup.array().of(
    Yup.object({
      id: Yup.string().optional(),
      day: Yup.number().required(),
      title: Yup.string().required(),
      description: Yup.string().optional().default(''),
      activities: Yup.array().of(entrySchema).default([]),
      accommodations: Yup.array().of(entrySchema).default([]),
      meals: Yup.array().of(entrySchema).default([]),
    })
  ),
});

export type PackageValidationSchemaType = Yup.InferType<typeof PackageValidationSchema>;