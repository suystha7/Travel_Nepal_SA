import { useFormik } from 'formik';
import { useGetReviewDetails } from './useGetReviewDetails';
import type { IReviewItem } from '../interface/IReview';

interface IProps {
  viewId: string;
}

export const useViewReview = ({ viewId }: IProps) => {
  const { data, isLoading } = useGetReviewDetails({ id: viewId });

  const initialValues: IReviewItem = {
    user: data?.data?.user || { id: '', full_name: '', email: '' },
    package: data?.data?.package || { id: '', name: '' },
    name: data?.data?.name || '',
    comment: data?.data?.comment || '',
    rating: data?.data?.rating || '0',
    approve: data?.data?.approve ?? false,
  };

  const formik = useFormik<IReviewItem>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('user_id', values.user?.id || '');
      formData.append('package_id', values.package?.id || '');
      formData.append('name', values.name);
      formData.append('comment', values.comment);
      formData.append('rating', values.rating.toString());
      formData.append('approve', values.approve ? 'true' : 'false');
    },
  });

  return { formik, isLoading };
};