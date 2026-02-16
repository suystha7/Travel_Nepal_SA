import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { FAQSchema, type faqFormField } from '../schema/FaqSchema';
import { useGetFAQDetails } from './useGetFAQDetails';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdateFAQ = ({ closeModal, updateId }: IProps) => {
  const [updateFAQ, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();
  const { data, isLoading, refetchFAQDetails } = useGetFAQDetails({
    id: updateId,
  });
  const initialValues: faqFormField = {
    question: data?.data?.question || '',
    answer: data?.data?.answer || '',
  };
  const formik = useFormik<faqFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: FAQSchema,
    onSubmit: async values => {
      const response = (await updateFAQ({
        url: Endpoints.faq.update.replace('id', updateId),
        data: values,
        invalidateTag: [apiTags.faq.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        formik.resetForm();
        refetchFAQDetails();
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading };
};
