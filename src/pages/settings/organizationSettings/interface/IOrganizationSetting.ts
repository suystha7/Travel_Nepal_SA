import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

export interface IOrganizationSettingsListItem {
  id: string;
  created_at: string;
  updated_at: string;
  logo: string;
  name: string;
  address: string;
  disclaimer: string;
  email: string;
  phone: string;
  google_map: string;
}

export type OrganizationSettingsListItemResponse =
  IPaginationResponse<IOrganizationSettingsListItem>;

export type OrganizationSettingsDetailsResponse =
  IApiDetailsResponse<IOrganizationSettingsListItem>;
