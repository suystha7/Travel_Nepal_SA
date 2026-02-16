import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IPackageCategoryListItem {
  id: string;
  name: string;
  image: string;
  package_type: { id: string; name: string };
}

export type PackageCategoryListItemResponse = IPaginationResponse<IPackageCategoryListItem>;

// details
export type PackageCategoryDetailsResponse = IApiDetailsResponse<IPackageCategoryListItem>;
