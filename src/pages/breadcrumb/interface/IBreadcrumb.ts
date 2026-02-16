import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IBreadcrumbListItem {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  subtitle: string;
  type: string;
  image: string;
  video: string;
}
export type BreadcrumbListItemResponse = IPaginationResponse<IBreadcrumbListItem>;

// details
export type BreadcrumbDetailsResponse = IApiDetailsResponse<IBreadcrumbListItem>;
