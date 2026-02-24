import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

export interface IReviewItem {
  id?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string | { full_name: string; image: string, email: string };
  package_id?: string | { name: string };
  name: string;
  comment: string;
  rating: string;
  image?: string | File;
}

export type ReviewListItemResponse = IPaginationResponse<IReviewItem>;
export type ReviewDetailsResponse = IApiDetailsResponse<IReviewItem>;