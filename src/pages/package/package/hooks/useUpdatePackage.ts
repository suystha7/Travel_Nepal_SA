import { useFormik } from 'formik';
import { useUpdateDataMutation, useGetDataQuery } from '@/api/api';
import { Endpoints } from '@/api/endpoints';
import handleErrors from '@/api/api.error';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { apiTags } from '@/constants/tag';
import { useGetPackageDetails } from './useGetPackageDetails';
import { PackageValidationSchema, type PackageValidationSchemaType } from '../schema/PackageSchema';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

interface ISimpleListItem {
  id?: string;
  title?: string;
  description?: string;
}

interface IRecordItem {
  id: string;
  name: string;
}

interface ICity {
  id: string;
  name: string;
}

interface IItineraryItem {
  id: string;
  day: number | string;
  title: string;
  description: string;
  accommodations?: ISimpleListItem[];
  meals?: ISimpleListItem[];
  activities?: ISimpleListItem[];
}

const mapSimpleList = (list: ISimpleListItem[] | undefined | null) =>
  Array.isArray(list)
    ? list.map(item => ({
        id: item?.id || undefined,
        title: item?.title || '',
        description: item?.description || '',
      }))
    : [];

export const useUpdatePackage = ({ closeModal, updateId }: IProps) => {
  const [updatePackage, mutationState] = useUpdateDataMutation();
  const { data: packageData, isLoading: isPackageLoading } = useGetPackageDetails({ id: updateId });

  const initialValues = useMemo(
    () => ({
      package_type_id: packageData?.data?.package_type?.id || '',
      category_id: packageData?.data?.category?.id || '',
      country_id: packageData?.data?.country?.id || '',
      city_id: packageData?.data?.city?.map((c: ICity) => c.id) || [],
      name: packageData?.data?.name || '',
      description: packageData?.data?.description || '',
      destination: packageData?.data?.destination || '',
      duration: Number(packageData?.data?.duration) || 0,
      start_point: packageData?.data?.start_point || '',
      end_point: packageData?.data?.end_point || '',
      group_size: packageData?.data?.group_size || '',
      max_altitude: packageData?.data?.max_altitude || '',
      previous_price: packageData?.data?.previous_price || '',
      current_price: packageData?.data?.current_price || '',
      start_date: packageData?.data?.start_date || '',
      end_date: packageData?.data?.end_date || '',
      cancellation_policy: packageData?.data?.cancellation_policy || '',
      payment_policy: packageData?.data?.payment_policy || '',
      terms_conditions: packageData?.data?.terms_conditions || '',
      is_top_tour: Boolean(packageData?.data?.is_top_tour),
      is_top_deals: Boolean(packageData?.data?.is_top_deals),
      image: packageData?.data?.image || undefined,

      inclusions: mapSimpleList(packageData?.data?.inclusions),
      exclusions: mapSimpleList(packageData?.data?.exclusions),
      notices: mapSimpleList(packageData?.data?.notices),
      highlights: mapSimpleList(packageData?.data?.highlights),

      itinerary:
        packageData?.data?.itinerary?.map((item: IItineraryItem) => ({
          id: item.id,
          day: Number(item.day),
          title: item.title || '',
          description: item.description || '',
          accommodations: mapSimpleList(item.accommodations),
          meals: mapSimpleList(item.meals),
          activities: mapSimpleList(item.activities),
        })) || [],
    }),
    [packageData]
  );

  const formik = useFormik<PackageValidationSchemaType>({
    initialValues,
    validationSchema: PackageValidationSchema,
    enableReinitialize: true,
    onSubmit: async values => {
      try {
        const formData = new FormData();

        const fields: Record<string, string> = {
          country_id: values.country_id,
          package_type_id: values.package_type_id,
          category_id: values.category_id,
          name: values.name,
          description: values.description,
          destination: values.destination,
          duration: String(values.duration),
          group_size: values.group_size,
          max_altitude: values.max_altitude,
          previous_price: values.previous_price,
          current_price: values.current_price,
          start_date: values.start_date,
          end_date: values.end_date,
          start_point: values.start_point,
          end_point: values.end_point,
          cancellation_policy: values.cancellation_policy,
          payment_policy: values.payment_policy,
          terms_conditions: values.terms_conditions,
          is_top_tour: values.is_top_tour ? '1' : '0',
          is_top_deals: values.is_top_deals ? '1' : '0',
        };

        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value);
        });

        formData.append('highlights', JSON.stringify(values.highlights));
        formData.append('notices', JSON.stringify(values.notices));
        formData.append('inclusions', JSON.stringify(values.inclusions));
        formData.append('exclusions', JSON.stringify(values.exclusions));
        formData.append('itinerary', JSON.stringify(values.itinerary));

        if (values.image && typeof values.image !== 'string') {
          formData.append('image', values.image as File);
        }

        const response = await updatePackage({
          url: Endpoints.packages.package.update.replace('id', updateId),
          data: formData,
          invalidateTag: [apiTags.packages.package.list],
        }).unwrap();

        showSuccessMessage(response.message || 'Package updated successfully');
        closeModal();
      } catch (error: unknown) {
        handleErrors(error, formik.setErrors);
        showErrorMessage(
          (error as { data?: { message?: string } })?.data?.message ||
            'Something went wrong while updating the package.'
        );
      }
    },
  });

  const { data: countryResponse } = useGetDataQuery({
    url: Endpoints.location.country.list,
    params: { p: 1, page_size: 100 },
  });

  const countryOptions =
    countryResponse?.data?.records?.map((item: IRecordItem) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const { data: cityResponse } = useGetDataQuery(
    formik.values.country_id
      ? {
          url: Endpoints.location.city.list,
          params: { country: formik.values.country_id, page: 1, perPage: 100 },
        }
      : skipToken
  );

  const cityOptions =
    cityResponse?.data?.records?.map((item: IRecordItem) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const { data: packageTypeResponse } = useGetDataQuery({
    url: Endpoints.packages.packageType.list,
    params: { p: 1, page_size: 100 },
  });

  const packageTypeOptions =
    packageTypeResponse?.data?.records?.map((item: IRecordItem) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const { data: packageCategoryResponse } = useGetDataQuery(
    formik.values.package_type_id
      ? {
          url: Endpoints.packages.packageCategory.list,
          params: {
            package_type: formik.values.package_type_id,
            page: 1,
            perPage: 100,
          },
        }
      : skipToken
  );

  const packageCategoryOptions =
    packageCategoryResponse?.data?.records?.map((item: IRecordItem) => ({
      label: item.name,
      value: item.id,
    })) || [];

  return {
    formik,
    isLoading: mutationState.isLoading,
    isSuccess: mutationState.isSuccess,
    isError: mutationState.isError,
    isPackageLoading,
    countryOptions,
    cityOptions,
    packageTypeOptions,
    packageCategoryOptions,
  };
};
