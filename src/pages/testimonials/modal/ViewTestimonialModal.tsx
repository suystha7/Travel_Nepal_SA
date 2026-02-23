import { FormikProvider } from 'formik';
import React from 'react';
import { useViewTestimonial } from '../hooks/useViewTestimonial';
import TestimonialForm from '../partials/TestimonialForm';

interface IProps {
  viewId: string;
  closeModal: () => void;
}

const ViewTestimonialModal: React.FC<IProps> = ({ viewId }) => {
  const { formik } = useViewTestimonial({ viewId });
  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <TestimonialForm />
        </div>
      </form>
    </FormikProvider>
  );
};

export default ViewTestimonialModal;
