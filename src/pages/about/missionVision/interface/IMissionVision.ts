import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IMissionVisionListItem {
  id: string;
  created_at: string;
  updated_at: string;
  heading: string;
  sub_text: string;
  mission: string;
  vision: string;
}
export type MissionVisionListItemResponse = IPaginationResponse<IMissionVisionListItem>;

// details
export type MissionVisionDetailsResponse = IApiDetailsResponse<IMissionVisionListItem>;
