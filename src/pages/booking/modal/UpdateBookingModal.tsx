import { FormikProvider } from 'formik';
import React from 'react';
import { useUpdateBooking } from '../hooks/useUpdateBooking';
import { Loader } from 'lucide-react';
import BookingForm from '../partials/BookingForm';

interface IProps {
  updateId: string;
  closeModal: () => void;
}

const UpdateBookingModal: React.FC<IProps> = ({ closeModal, updateId }) => {
  const { formik, isLoading } = useUpdateBooking({ closeModal, updateId });

  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <BookingForm />

          <div className="my-4 flex items-center justify-end col-span-2 px-2">
            <button
              disabled={isLoading}
              type="button"
              onClick={e => {
                formik.handleSubmit();
                e.preventDefault();
              }}
              className="px-7 py-2.5 typography-semi-bold-small text-white bg-primary-500 rounded-md flex items-center gap-x-4 cursor-pointer"
            >
              Update
              {isLoading && <Loader className="animate-spin duration-500 transition-all" />}
            </button>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};

export default UpdateBookingModal;
