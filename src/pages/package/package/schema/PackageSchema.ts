import * as Yup from 'yup';

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

  duration: Yup.number()
    .typeError('Duration must be a number')
    .required('Duration is required')
    .positive(),

  start_point: Yup.string().required('Start Point is required'),
  end_point: Yup.string().required('End Point is required'),

  group_size: Yup.string().required('Group Size is required'),
  max_altitude: Yup.string().required('Max Altitude is required'),

  image: Yup.mixed().optional(),

  previous_price: Yup.string().required('Previous Price is required'),
  current_price: Yup.string().required('Current Price is required'),

  start_date: Yup.string().required('Start Date is required'),
  end_date: Yup.string()
    .required('End Date is required')
    .test('end_after_start', 'End Date cannot be before Start Date', function (value) {
      const { start_date } = this.parent;
      if (!start_date || !value) return true;
      return new Date(value) >= new Date(start_date);
    }),

  cancellation_policy: Yup.string().required('Cancellation Policy is required'),
  payment_policy: Yup.string().required('Payment Policy is required'),
  terms_conditions: Yup.string().required('Terms & Conditions is required'),

  is_top_tour: Yup.boolean().required(),
  is_top_deals: Yup.boolean().required(),

  availability_month: Yup.array().of(Yup.string()).optional().default([]),

  inclusions: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required(),
        description: Yup.string().optional().default(''),
      })
    )
    .default([]),

  exclusions: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required(),
        description: Yup.string().optional().default(''),
      })
    )
    .default([]),

  notices: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required(),
        description: Yup.string().optional().default(''),
      })
    )
    .default([]),

  highlights: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required(),
        description: Yup.string().optional().default(''),
      })
    )
    .default([]),

  itinerary: Yup.array()
    .of(
      Yup.object({
        day: Yup.number().typeError('Day must be a number').required('Day is required'),
        title: Yup.string().required('Title is required'),
        description: Yup.string().optional().default(''),
        meals: Yup.string().required('Meals is required'),
        accomodation: Yup.string().required('Accomodation is required'),
        activities: Yup.string().required('Activities is required'),
      })
    )
    .default([]),

 
});

export type PackageValidationSchemaType = Yup.InferType<typeof PackageValidationSchema>;
