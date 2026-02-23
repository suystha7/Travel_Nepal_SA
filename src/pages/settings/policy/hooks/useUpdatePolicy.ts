import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { useGetPolicyDetails } from './useGetPolicyDetails';
import { PolicySchema, type policyFormField } from '../schema/PolicySchema';
import { Endpoints } from '@/api/endpoints';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

export const useUpdatePolicy = ({ closeModal, updateId }: IProps) => {
  const [updatePolicy, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();
  const { data, isLoading } = useGetPolicyDetails({
    id: updateId,
  });

  const initialValues: policyFormField = {
    policy_type: data?.data?.policy_type || '',
    title: data?.data?.title || '',
    description: data?.data?.description || '',
  };

  const formik = useFormik<policyFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: PolicySchema,

    onSubmit: async values => {
      const response = (await updatePolicy({
        url: Endpoints.settings.policy.update.replace(':id', updateId),
        data: values,
        invalidateTag: [apiTags.settings.policy.list, apiTags.settings.policy.details],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        closeModal();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading };
};
