import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IPackageGalleryListItem {
  id: string;
  type: string;
  image: string;
  package: { id: string; name: string };
  itinerary: { id: string; title: string };
  package_id: string;
  itinerary_id: string;
  created_at: string;
  updated_at: string;
}

export type PackageGalleryListItemResponse = IPaginationResponse<IPackageGalleryListItem>;

// details
export type PackageGalleryDetailsResponse = IApiDetailsResponse<IPackageGalleryListItem>;
