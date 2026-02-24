import type { IApiDetailsResponse, IPaginationResponse } from '@/interface/apiResponse.interface';

// list
export interface ITestimonialItem {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  message: string;
  rating: string;
  image: string;
}
export type TestimonialListItemResponse = IPaginationResponse<ITestimonialItem>;

// details
export type TestimonialDetailsResponse = IApiDetailsResponse<ITestimonialItem>;
