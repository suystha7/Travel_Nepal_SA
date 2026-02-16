import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { CountryDetailsResponse } from '../interface/ICountry';

interface IProps {
  id: string;
}

export const useGetCountryDetails = ({ id }: IProps) => {
  const { data, isLoading, isError, isSuccess } = useGetDataQuery<{
    data: CountryDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.location.country.details.replace('id', id),
  });

  return { data, isLoading, isError, isSuccess };
};
