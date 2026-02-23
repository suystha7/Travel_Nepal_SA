import { useFormik } from 'formik';
import { TestimonialSchema, type testimonialFormField } from '../schema/TestimonialSchema';
import { useGetTestimonialDetails } from './useGetTestimonialDetails';

interface IProps {
  viewId: string;
}

export const useViewTestimonial = ({ viewId }: IProps) => {
  const { data, isLoading } = useGetTestimonialDetails({ id: viewId });

  const initialValues: testimonialFormField = {
    name: data?.data?.name || '',
    message: data?.data?.message || '',
    rating: data?.data?.rating || '0',
    image: null,
  };

  const formik = useFormik<testimonialFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: TestimonialSchema,
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('message', values.message);
      formData.append('rating', values.rating.toString());

      if (values?.image && values?.image instanceof File) {
        formData.append('image', values?.image);
      }
    },
  });
  return { formik, isLoading };
};
