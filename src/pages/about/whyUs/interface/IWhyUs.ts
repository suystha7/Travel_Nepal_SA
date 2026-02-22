import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IWhyUsListItem {
  id: string;
  created_at: string;
  updated_at: string;
  heading: string;
  sub_heading: string;
  listItems: {
    title: string;
    description: string;
  };
}
export type WhyUsListItemResponse = IPaginationResponse<IWhyUsListItem>;

// details
export type WhyUsDetailsResponse = IApiDetailsResponse<IWhyUsListItem>;
