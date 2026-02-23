import { FormikProvider } from 'formik';
import React from 'react';
import { Loader } from 'lucide-react';
import PolicyForm from '../partials/PolicyForm';
import { useUpdatePolicy } from '../hooks/useUpdatePolicy';

interface IProps {
  updateId: string;
  closeModal: () => void;
}

const UpdatePolicyModal: React.FC<IProps> = ({ closeModal, updateId }) => {
  const { formik, isLoading } = useUpdatePolicy({ closeModal, updateId });
  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <PolicyForm />
          <div className="flex justify-end items-center col-span-2 mt-4">
            <button
              disabled={isLoading}
              type="button"
              onClick={e => {
                formik.handleSubmit();
                e.preventDefault();
              }}
              className="flex items-center gap-x-4 bg-primary-500 px-7 py-2.5 rounded-md text-white cursor-pointer typography-semi-bold-small"
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

export default UpdatePolicyModal;
