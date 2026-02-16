import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

export interface IPackageData {
  id: string;
  package_type: { id: string; name: string };
  category: { id: string; name: string };
  country: { id: string; name: string };
  city: { id: string; name: string }[];
  name: string;
  description: string;
  image: string;
  destination: string;
  duration: string;
  start_point: string;
  end_point: string;
  group_size: string;
  max_altitude: string;
  previous_price: string;
  current_price: string;
  availability_month: (string | { month: string; name: string })[];
  start_date: string;
  end_date: string;
  cancellation_policy: string;
  payment_policy: string;
  terms_conditions: string;
  is_top_tour: boolean;
  is_top_deals: boolean;
  inclusions: IPackageInclusion[];
  exclusions: IPackageExclusion[];
  notices: IPackageNotice[];
  highlights: IPackageHighlight[];
  itinerary: IPackageItinerary[];
  meals: IPackageMeal[];
  activities: IPackageActivity[];
  accommodations: IPackageAccommodation[];
}

export interface IPackageInclusion {
  id: string;
  title: string;
  description: string;
  package: IPackagePackage;
}

export interface IPackagePackage {
  id: string;
  name: string;
}
export interface IAvailability {
  id: string;
  title: string;
}

export interface IPackageExclusion {
  id: string;
  package: IPackagePackage;
  title: string;
  description: string;
}

export interface IPackageNotice {
  id: string;
  package: IPackagePackage;
  title: string;
  description: string;
}

export interface IPackageHighlight {
  id: string;
  package: IPackagePackage;
  title: string;
  description: string;
}

export interface IPackageItinerary {
  id: string;
  day: string;
  title: string;
  description: string;
  time: string;
  package: IPackagePackage;
  images: string;
}

export interface IPackageMeal {
  id: string;
  title: string;
  description: string;
  day: string;
  package: IPackagePackage;
  itinerary: IPackageItinerary;
}
export interface IPackageAccommodation {
  id: string;
  title: string;
  day: string;
  description: string;
  package: IPackagePackage;
  itinerary: IPackageItinerary;
}

export interface IPackageItinerary {
  id: string;
  title: string;
}

export interface IPackageActivity {
  id: string;
  title: string;
  day: string;
  description: string;
  package: IPackagePackage;
  itinerary: IPackageItinerary;
}
export type PackageFormListResponse = IPaginationResponse<IPackageData>;
export type PackageFormDetailsResponse = IApiDetailsResponse<IPackageData>;
