import { FormikProvider } from 'formik';
import React from 'react';
import { useViewContactUs } from '../hooks/useViewContactUs';
import ContactUsForm from '../partials/ContactUsForm';
interface IProps {
  viewId: string;
  closeModal: () => void;
}

const ViewContactModal: React.FC<IProps> = ({ viewId }) => {
  const { formik } = useViewContactUs({ viewId });
  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <ContactUsForm/>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ViewContactModal;
