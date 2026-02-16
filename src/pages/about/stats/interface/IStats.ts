import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IStatsListItem {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  year_experience: string;
  happy_travellers: string;
  travel_history: string;
  total_packages: string;
}
export type StatsListItemResponse = IPaginationResponse<IStatsListItem>;

// details
export type StatsDetailsResponse = IApiDetailsResponse<IStatsListItem>;
