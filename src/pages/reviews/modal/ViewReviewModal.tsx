import { FormikProvider } from 'formik';
import React from 'react';
import { useViewReview } from '../hooks/useViewReview';
import ReviewForm from '../partials/ReviewForm';

interface IProps {
  viewId: string;
  closeModal: () => void;
}

const ViewReviewModal: React.FC<IProps> = ({ viewId }) => {
  const { formik } = useViewReview({ viewId });
  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <ReviewForm />
        </div>
      </form>
    </FormikProvider>
  );
};

export default ViewReviewModal;
