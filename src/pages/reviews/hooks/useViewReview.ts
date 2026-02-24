import { useFormik } from 'formik';
import { useGetReviewDetails } from './useGetReviewDetails';
import type { IReviewItem } from '../interface/IReview';

interface IProps {
  viewId: string;
}

export const useViewReview = ({ viewId }: IProps) => {
  const { data, isLoading } = useGetReviewDetails({ id: viewId });

  const initialValues: IReviewItem = {
    user_id: (data?.data?.user_id as any)?.full_name || '',
    package_id: (data?.data?.package_id as any)?.name || '',
    name: data?.data?.name || '',
    comment: data?.data?.comment || '',
    rating: data?.data?.rating || '0',
    image: (data?.data?.user_id as any)?.image || '',
  };

  const formik = useFormik<IReviewItem>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('user_id', typeof values.user_id === 'string' ? values.user_id : '');
      formData.append('package_id', typeof values.package_id === 'string' ? values.package_id : '');
      formData.append('name', values.name);
      formData.append('comment', values.comment);
      formData.append('rating', values.rating.toString());

      if (values.image instanceof File) {
        formData.append('image', values.image);
      }
    },
  });

  return { formik, isLoading };
};
