import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IPackageImageSeoListItem {
  id: string;
  package: { id: string; name: string };
  image: string;
  title: string;
  caption: string;
  alt: string;  
  created_at: string;
  updated_at: string;
}

export type PackageImageSeoListItemResponse = IPaginationResponse<IPackageImageSeoListItem>;

// details
export type PackageImageSeoDetailsResponse = IApiDetailsResponse<IPackageImageSeoListItem>;
