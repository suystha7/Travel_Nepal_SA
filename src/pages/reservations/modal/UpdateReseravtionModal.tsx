import { FormikProvider } from 'formik';
import React from 'react';
import { useUpdateReservation } from '../hooks/useUpdateReservation';
import { Loader } from 'lucide-react';
import ReservationForm from '../partials/ReservationForm';

interface IProps {
  updateId: string;
  closeModal: () => void;
}

const UpdateReservationModal: React.FC<IProps> = ({ closeModal, updateId }) => {
  const { formik, isLoading } = useUpdateReservation({
    closeModal,
    updateId,
  });
  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <ReservationForm />
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

export default UpdateReservationModal;
