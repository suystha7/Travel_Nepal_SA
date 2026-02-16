import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

export interface IFAQListItem {
  id: string;
  created_at: string;
  updated_at: string;
  question: string;
  answer: string;
}

export type FAQListItemResponse = IPaginationResponse<IFAQListItem>;

export type FAQDetailsResponse = IApiDetailsResponse<IFAQListItem>;
