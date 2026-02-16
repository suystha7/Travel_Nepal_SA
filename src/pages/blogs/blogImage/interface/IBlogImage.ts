import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IBlogImageListItem {
  id: string;
  blog: { id: string; title: string };
  image: string;
  created_at: string;
  updated_at: string;
}

export type BlogImageListItemResponse = IPaginationResponse<IBlogImageListItem>;

// details
export type BlogImageDetailsResponse = IApiDetailsResponse<IBlogImageListItem>;
