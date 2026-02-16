import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface ITeamListItem {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
}
export type TeamListItemResponse = IPaginationResponse<ITeamListItem>;
// details
export type TeamDetailsResponse = IApiDetailsResponse<ITeamListItem>;
