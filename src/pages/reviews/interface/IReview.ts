import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

export interface IReviewItem {
  id?: string;
  created_at?: string;
  updated_at?: string;
  user?: { id: string; full_name: string; email: string };
  package?: { id: string; name: string };
  name: string;
  comment: string;
  rating: string;
  approve: boolean;
}

export type ReviewListItemResponse = IPaginationResponse<IReviewItem>;
export type ReviewDetailsResponse = IApiDetailsResponse<IReviewItem>;
