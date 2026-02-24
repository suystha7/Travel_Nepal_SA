import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IPackageSeoListItem {
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
  package: { name: string; id: string };
  image_url: string;
  image_title: string;
  image_caption: string;
  image_alt: string;
}
export type PackageSeoListItemResponse = IPaginationResponse<IPackageSeoListItem>;

export type PackageSeoDetailsResponse = IApiDetailsResponse<IPackageSeoListItem>;
