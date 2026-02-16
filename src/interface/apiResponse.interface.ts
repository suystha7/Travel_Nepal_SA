export interface IPaginationResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  data: Data<T>;
}

export interface Data<T> {
  records: T[];
  totalRecords: number;
  perPage: number;
  totalPages: number;
  currentPage: number;
  pagingCounter: number;
  hasPrevious: boolean;
  hasNext: boolean;
  prev: number | null;
  next: number | null;
  recordShown: number;
}

export interface IApiDetailsResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  data: T;
}
