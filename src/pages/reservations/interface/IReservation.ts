import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IReservationListItem {
  id: string;
  created_at: string;
  updated_at: string;
  description: string;
  type: string;
}
export type ReservationListItemResponse = IPaginationResponse<IReservationListItem>;

// details
export type ReservationDetailsResponse = IApiDetailsResponse<IReservationListItem>;
