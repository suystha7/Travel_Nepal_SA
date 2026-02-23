import { useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import type { BlogImageDetailsResponse } from '../interface/IBlogImage';
import { apiTags } from '@/constants/tag';

interface IProps {
  id: string;
}

export const useGetBlogImageDetails = ({ id }: IProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useGetDataQuery<{
    data: BlogImageDetailsResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    url: Endpoints.blogs.blogImage.details.replace(':id', id),
    tag: apiTags.blogs.blogImage.details
  });

  return { data, isLoading, isError, isSuccess };
};
