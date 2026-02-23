import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IPackageGalleryListItem {
  id: string;
  images: { url: string};
  package: { id: string; name: string };
  created_at: string;
  updated_at: string;
}

export type PackageGalleryListItemResponse = IPaginationResponse<IPackageGalleryListItem>;

// details
export type PackageGalleryDetailsResponse = IApiDetailsResponse<IPackageGalleryListItem>;
