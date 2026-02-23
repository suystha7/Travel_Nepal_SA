import { useUpdatePutDataMutation } from '@/api/api';
import { useFormik } from 'formik';
import { apiTags } from '@/constants/tag';
import type { ApiResponse } from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import handleErrors from '@/api/api.error';
import { useGetOrganizationSettingsDetails } from './useGetOrganizationSettingsDetails';
import {
  OrganizationSettingsSchema,
  type organizationSettingsFormField,
} from '../schema/OrganizationSettingsSchema';
import { Endpoints } from '@/api/endpoints';

export const useUpdateOrganizationSettings = (updateId: string) => {
  const [updateOrganizationSettings, { isError, isLoading: isGetDetailsLoading, isSuccess }] =
    useUpdatePutDataMutation();

  const { data, isLoading } = useGetOrganizationSettingsDetails({ id: updateId });

  const initialValues: organizationSettingsFormField = {
    name: data?.data?.name || '',
    logo: data?.data?.logo || '',
    phone: data?.data?.phone || '',
    email: data?.data?.email || '',
    address: data?.data?.address || '',
    disclaimer: data?.data?.disclaimer || '',
    google_map: data?.data?.google_map || '',
  };
  const formik = useFormik<organizationSettingsFormField>({
    initialValues,
    enableReinitialize: true,
    validationSchema: OrganizationSettingsSchema,

    onSubmit: async values => {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('phone', values.phone);
      formData.append('email', values.email);
      formData.append('address', values.address);
      formData.append('disclaimer', values.disclaimer);
      formData.append('google_map', values.google_map);

      if (values.logo instanceof File) {
        formData.append('logo', values.logo);
      }
      const response = (await updateOrganizationSettings({
        url: Endpoints.settings.organizationSettings.update.replace(':id', updateId),
        data: formData,
        invalidateTag: [
          apiTags.settings.organizationSettings.list,
          apiTags.settings.organizationSettings.details,
        ],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess, isGetDetailsLoading };
};
