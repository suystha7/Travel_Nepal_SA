import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

export interface IContactUsListItem {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  service: string;
  message: string;
  phone: string;
}

export type ContactUsListItemResponse = IPaginationResponse<IContactUsListItem>;

export type ContactUsDetailsResponse = IApiDetailsResponse<IContactUsListItem>;
