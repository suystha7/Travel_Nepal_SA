import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { apiTags } from '@/constants/tag';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import {
  OrganizationSettingsSchema,
  type organizationSettingsFormField,
} from '../schema/OrganizationSettingsSchema';

export const useCreateOrganizationSettings = () => {
  const [createOrganizationSettings, { isError, isLoading, isSuccess }] = usePostDataMutation();

  const initialValues: organizationSettingsFormField = {
    name: '',
    logo: '',
    phone: '',
    email: '',
    address: '',
    google_map: '',
    disclaimer: '',
  };

  const formik = useFormik<organizationSettingsFormField>({
    initialValues,
    validationSchema: OrganizationSettingsSchema,

    onSubmit: async values => {
      const formData = new FormData();
      formData.append('name', values.name || '');
      formData.append('phone', values.phone ?? '');
      formData.append('email', values.email ?? '');
      formData.append('address', values.address ?? '');
      formData.append('disclaimer', values.disclaimer ?? '');
      formData.append('google_map', values.google_map ?? '');
      if (values.logo instanceof File) {
        formData.append('logo', values.logo, values.logo.name);
      }

      const response = (await createOrganizationSettings({
        url: Endpoints.settings.organizationSettings.create,
        data: formData,
        invalidateTag: [apiTags.settings.organizationSettings.list],
      })) as ApiResponse;

      if (response?.data?.message) {
        showSuccessMessage(response?.data?.message);
        formik.resetForm();
      }
      if (response?.error?.data?.message) showErrorMessage(response?.error?.data?.message);
      if (response?.error?.data?.errors) handleErrors(response, formik.setErrors);
    },
  });
  return { formik, isError, isLoading, isSuccess };
};
