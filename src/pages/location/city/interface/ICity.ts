import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface ICityListItem {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  country: { id: string; name: string; slug: string; country_id: string };
}
export type CityListItemResponse = IPaginationResponse<ICityListItem>;

// details
export type CityDetailsResponse = IApiDetailsResponse<ICityListItem>;
