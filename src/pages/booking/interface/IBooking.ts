import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface IBookingListItem {
  id: string;
  title: string;
  description: string;
  image: string;
  customer: string;
  customer_id: string;
  service: string;
  service_id: string;
  is_urgent: boolean;
  booking_count: string;
  view_count: string;
  booking_slug: string;
  created_at: string;
  updated_at: string;
}

export type BookingListItemResponse = IPaginationResponse<IBookingListItem>;

// details
export type BookingDetailsResponse = IApiDetailsResponse<IBookingListItem>;
