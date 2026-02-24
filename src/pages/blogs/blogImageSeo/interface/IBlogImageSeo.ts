import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IBlogImageSeoListItem {
  id: string;
  blog: { id: string; title: string };
  image: string;
  title: string;
  caption: string;
  alt: string;  
  created_at: string;
  updated_at: string;
}

export type BlogImageSeoListItemResponse = IPaginationResponse<IBlogImageSeoListItem>;

// details
export type BlogImageSeoDetailsResponse = IApiDetailsResponse<IBlogImageSeoListItem>;
