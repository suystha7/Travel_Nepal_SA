import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list

export interface IAboutUsListItem {
  id: string;
  title: string;
  sub_title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export type AboutUsListItemResponse = IPaginationResponse<IAboutUsListItem>;

// details
export type AboutUsDetailsResponse = IApiDetailsResponse<IAboutUsListItem>;
