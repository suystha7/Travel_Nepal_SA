import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IStaticSEOListItem {
  id: string;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  meta_Keywords: string[];
  og_title: string;
  og_description: string;
  og_image: string;
  og_url: string;
  canonical_url: string;
  robots: string;
  structured_data: string;
  custom_header: string;
  seo_for: string;
}
export type StaticSEOListItemResponse = IPaginationResponse<IStaticSEOListItem>;

// details
export type StaticSEODetailsResponse = IApiDetailsResponse<IStaticSEOListItem>;
