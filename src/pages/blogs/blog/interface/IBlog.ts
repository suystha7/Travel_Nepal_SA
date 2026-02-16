import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IBlogListItem {
  id: string;
  title: string;
  description: string;
  image: string;
  author: { id: string; name: string };
  category: { id: string; name: string };
  is_popular: boolean;
  created_at: string;
  updated_at: string;
}
export type BlogListItemResponse = IPaginationResponse<IBlogListItem>;

// details
export type BlogDetailsResponse = IApiDetailsResponse<IBlogListItem>;
