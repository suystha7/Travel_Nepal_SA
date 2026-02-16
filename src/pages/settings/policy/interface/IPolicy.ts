import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

export interface IPolicyListItem {
  id: string;
  created_at: string;
  updated_at: string;
  policy_type: string;
  title: string;
  description: string;
}

export type PolicyListItemResponse = IPaginationResponse<IPolicyListItem>;

export type PolicyDetailsResponse = IApiDetailsResponse<IPolicyListItem>;
