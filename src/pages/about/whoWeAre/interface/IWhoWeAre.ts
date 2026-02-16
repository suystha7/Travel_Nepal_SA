import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IWhoWeAreListItem {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  images: (string | File)[];
}
export type WhoWeAreListItemResponse = IPaginationResponse<IWhoWeAreListItem>;

// details
export type WhoWeAreDetailsResponse = IApiDetailsResponse<IWhoWeAreListItem>;
