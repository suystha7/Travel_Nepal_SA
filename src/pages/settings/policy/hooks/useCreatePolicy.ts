import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import { PolicySchema, type policyFormField } from '../schema/PolicySchema';

interface IProps {
  closeModal: () => void;
}

export const useCreatePolicy = ({ closeModal }: IProps) => {
  const [createPolicy, { isError, isLoading, isSuccess }] = usePostDataMutation();
  const initialValues: policyFormField = {
    policy_type: '',
    title: '',
    description: '',
  };

  const formik = useFormik<policyFormField>({
    initialValues,
    validationSchema: PolicySchema,
    onSubmit: async values => {
      const response = (await createPolicy({
        url: Endpoints.settings.policy.create,
        data: values,
        invalidateTag: [apiTags.settings.policy.list],
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
