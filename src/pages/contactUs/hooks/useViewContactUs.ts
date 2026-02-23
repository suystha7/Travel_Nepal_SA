import { useFormik } from 'formik';
import { useGetContactUsDetails } from './useGetContactUsDetails';
import type { IContactUsListItem } from '../interface/IContactUs';

interface IProps {
  viewId: string;
}

export const useViewContactUs = ({ viewId }: IProps) => {
  const { data } = useGetContactUsDetails({ id: viewId });

  const initialValues: IContactUsListItem = {
    name: data?.data?.name || '',
    message: data?.data?.message || '',
    email: data?.data?.email || '',
    service: data?.data?.service || '',
    phone: data?.data?.phone || '',
  };

  const formik = useFormik<IContactUsListItem>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('message', values.message);
      formData.append('email', values.email);
      formData.append('service', values.service);
      formData.append('phone', values.phone);
      },
  });
  return { formik };
};
