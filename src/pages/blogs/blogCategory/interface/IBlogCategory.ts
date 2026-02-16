import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IBlogCategoryListItem {
  id: string;
  name: string;
  category_id: string;
  is_popular: boolean;
  created_at: string;
  updated_at: string;
}
export type BlogCategoryListItemResponse = IPaginationResponse<IBlogCategoryListItem>;

// details
export type BlogCategoryDetailsResponse = IApiDetailsResponse<IBlogCategoryListItem>;
