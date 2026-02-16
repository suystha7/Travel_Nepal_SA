import { useEffect } from 'react';
import { useFormik } from 'formik';
import { usePostDataMutation, useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { apiTags } from '@/constants/tag';
import { skipToken } from '@reduxjs/toolkit/query';

import { PackageValidationSchema } from '../schema/PackageSchema';
import { initialPackageValues } from './initialPackageValues';
import { mapPackagePayload } from './mapPayload';
import { clearPackageDraft, loadPackageDraft } from './packageDraft';
import type { ICityListItem } from '@/pages/location/city/interface/ICity';
import type { IPackageTypeListItem } from '../../packageType/interface/IPackageType';
import type { IPackageCategoryListItem } from '../../packageCategory/interface/IPackageCategory';
import type { IOption } from '@/components/formField/SearchSelect';
import type { ICountryListItem } from '@/pages/location/country/interface/ICountry';

interface Props {
  closeModal: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const useCreatePackage = ({ closeModal, setStep }: Props) => {
  const [createPackage, { isLoading, isSuccess, isError }] = usePostDataMutation();

  const formik = useFormik({
    initialValues: initialPackageValues,
    validationSchema: PackageValidationSchema,
    onSubmit: async values => {
      try {
        await createPackage({
          url: Endpoints.packages.package.create,
          data: mapPackagePayload(values),
          invalidateTag: [apiTags.packages.package.list],
        });

        showSuccessMessage('Package created successfully');
        clearPackageDraft();
        formik.resetForm();
        closeModal();
      } catch (err) {
        console.error(err);
        showErrorMessage('Something went wrong while creating the package.');
      }
    },
  });

  useEffect(() => {
    const draft = loadPackageDraft();
    if (draft) {
      formik.setValues(draft.values);
      setStep(draft.step);
    }
  }, []);

  const { data: countryResponse } = useGetDataQuery({
    url: Endpoints.location.country.list,
    params: { p: 1, page_size: 100 },
  });

  const countryOptions =
    countryResponse?.data?.records?.map((c: ICountryListItem) => ({
      label: c.name,
      value: c.id,
    })) || [];
  const selectedCountryId = formik.values.country_id;

  const { data: cityResponse } = useGetDataQuery(
    selectedCountryId
      ? {
          url: Endpoints.location.city.list,
          params: { country: selectedCountryId, page: 1, perPage: 100 },
        }
      : skipToken
  );
  const cityOptions: IOption[] =
    cityResponse?.data?.records?.map((c: ICityListItem) => ({ label: c.name, value: c.id })) || [];

  const { data: packageTypeResponse } = useGetDataQuery({
    url: Endpoints.packages.packageType.list,
    params: { p: 1, page_size: 100 },
  });
  const packageTypeOptions: IOption[] =
    packageTypeResponse?.data?.records?.map((p: IPackageTypeListItem) => ({
      label: p.name,
      value: p.id,
    })) || [];

  const selectedPackageTypeId = formik.values.package_type_id;
  const { data: packageCategoryResponse } = useGetDataQuery(
    selectedPackageTypeId
      ? {
          url: Endpoints.packages.packageCategory.list,
          params: { package_type: selectedPackageTypeId, page: 1, perPage: 100 },
        }
      : skipToken
  );
  const packageCategoryOptions: IOption[] =
    packageCategoryResponse?.data?.records?.map((p: IPackageCategoryListItem) => ({
      label: p.name,
      value: p.id,
    })) || [];

  return {
    formik,
    isLoading,
    isSuccess,
    isError,
    countryOptions,
    cityOptions,
    packageTypeOptions,
    packageCategoryOptions,
  };
};
