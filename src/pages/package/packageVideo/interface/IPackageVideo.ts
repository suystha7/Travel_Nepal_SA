import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IPackageVideoListItem {
  id: string;
  video_url: string;
  video: string;
  package: { id: string; name: string };
  package_id: string;
  created_at: string;
  updated_at: string;
}

export type PackageVideoListItemResponse = IPaginationResponse<IPackageVideoListItem>;

// details
export type PackageVideoDetailsResponse = IApiDetailsResponse<IPackageVideoListItem>;
