import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IProfileListItem {
  id: string;
  full_name: string;
  email: string;
  phone_no: string;
  avatar: string;
  is_active: boolean;
  role: string;
  is_superadmin: boolean
  is_admin: boolean
}

export type ProfileListItemResponse = IPaginationResponse<IProfileListItem>;

// details
export type ProfileDetailsResponse = IApiDetailsResponse<IProfileListItem>;
