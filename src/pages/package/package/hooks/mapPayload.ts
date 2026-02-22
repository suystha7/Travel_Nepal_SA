import type { PackageValidationSchemaType } from '../schema/PackageSchema';

export const mapPackagePayload = (values: PackageValidationSchemaType) => ({
  package_type_id: values.package_type_id,
  category_id: values.category_id,
  country_id: values.country_id,
  city_id: values.city_id,
  name: values.name,
  description: values.description,
  destination: values.destination,
  duration: Number(values.duration),
  start_point: values.start_point,
  end_point: values.end_point,
  group_size: values.group_size,
  max_altitude: values.max_altitude,
  previous_price: values.previous_price,
  current_price: values.current_price,
  start_date: values.start_date,
  end_date: values.end_date,
  cancellation_policy: values.cancellation_policy,
  payment_policy: values.payment_policy,
  terms_conditions: values.terms_conditions,
  is_top_tour: values.is_top_tour,
  is_top_deals: values.is_top_deals,

  inclusions: values.inclusions.map(i => ({
    title: i.title,
    description: i.description,
  })),

  exclusions: values.exclusions.map(e => ({
    title: e.title,
    description: e.description,
  })),

  notices: values.notices.map(n => ({
    title: n.title,
    description: n.description,
  })),

  highlights: values.highlights.map(h => ({
    title: h.title,
    description: h.description,
  })),

  itinerary:
    values?.itinerary?.map(it => ({
      day: Number(it.day),
      title: it.title,
      description: it.description,
      accommodations:
        it.accommodations?.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
        })) || [],
      meals:
        it.meals?.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
        })) || [],
      activities:
        it.activities?.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
        })) || [],
    })) || [], 
});
