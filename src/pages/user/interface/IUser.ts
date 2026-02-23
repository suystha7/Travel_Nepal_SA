import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IUserListItem {
  id: string;
  full_name: string;
  email: string;
  avatar: string;
  phone_no: string;
  role: string;
  is_active: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}
export type UserListItemResponse = IPaginationResponse<IUserListItem>;

// details
export type UserDetailsResponse = IApiDetailsResponse<IUserListItem>;
