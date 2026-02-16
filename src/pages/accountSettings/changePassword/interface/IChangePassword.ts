import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IProfileListItem {
  id: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ProfileListItemResponse = IPaginationResponse<IProfileListItem>;

// details
export type ProfileDetailsResponse = IApiDetailsResponse<IProfileListItem>;
