import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IChangePasswordListItem {
  id: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ChangePasswordListItemResponse = IPaginationResponse<IChangePasswordListItem>;

// details
export type ChangePasswordDetailsResponse = IApiDetailsResponse<IChangePasswordListItem>;
