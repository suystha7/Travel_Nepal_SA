import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { FAQSchema, type faqFormField } from '../schema/FaqSchema';

interface IProps {
  closeModal: () => void;
}

export const useCreateFAQ = ({ closeModal }: IProps) => {
  const [createFAQ, { isError, isLoading, isSuccess }] = usePostDataMutation();
  const initialValues: faqFormField = {
    question: '',
    answer: '',
  };
  const formik = useFormik<faqFormField>({
    initialValues,
    validationSchema: FAQSchema,
    onSubmit: async values => {
      const response = (await createFAQ({
        url: Endpoints.faq.create,
        data: values,
        invalidateTag: [apiTags.faq.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        formik.resetForm();
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess };
};
