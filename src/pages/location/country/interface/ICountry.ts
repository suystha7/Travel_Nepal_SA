import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface ICountryListItem {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  continent: string;
  destination_type: string;
  image: string;
}
export type CountryListItemResponse = IPaginationResponse<ICountryListItem>;

// details
export type CountryDetailsResponse = IApiDetailsResponse<ICountryListItem>;
