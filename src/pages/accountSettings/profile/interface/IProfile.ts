import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IProfileListItem {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  avatar: string;
  is_active: boolean;
  is_superuser: boolean;
  is_admin: boolean;
  is_staff: boolean;
}

export type ProfileListItemResponse = IPaginationResponse<IProfileListItem>;

// details
export type ProfileDetailsResponse = IApiDetailsResponse<IProfileListItem>;
