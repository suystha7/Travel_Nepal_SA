import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IUserListItem {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  password: string;
  phone_no: string;
  avatar: string;
  is_active: boolean;
  is_superuser: boolean;
  is_admin: boolean;
  is_staff: boolean;
}
export type UserListItemResponse = IPaginationResponse<IUserListItem>;

// details
export type UserDetailsResponse = IApiDetailsResponse<IUserListItem>;
