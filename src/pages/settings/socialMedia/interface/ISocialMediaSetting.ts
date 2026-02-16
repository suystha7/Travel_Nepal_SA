import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

export interface ISocialMediaSettingsListItem {
  id: string;
  platform: string;
  url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export type SocialMediaSettingsListItemResponse = IPaginationResponse<ISocialMediaSettingsListItem>;

export type SocialMediaSettingsDetailsResponse = IApiDetailsResponse<ISocialMediaSettingsListItem>;
