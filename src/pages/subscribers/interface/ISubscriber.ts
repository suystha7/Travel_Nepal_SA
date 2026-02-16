import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface ISubscriberListItem {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
}
export type SubscriberListItemResponse = IPaginationResponse<ISubscriberListItem>;

// details
export type SubscriberDetailsResponse = IApiDetailsResponse<ISubscriberListItem>;
