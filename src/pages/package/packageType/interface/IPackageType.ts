import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IPackageTypeListItem {
  id: string;
  name: string;
  image: string;
}

export type PackageTypeListItemResponse = IPaginationResponse<IPackageTypeListItem>;

// details
export type PackageTypeDetailsResponse = IApiDetailsResponse<IPackageTypeListItem>;
