import { FormikProvider } from 'formik';
import React from 'react';
import { useUpdatePackageType } from '../hooks/useUpdatePackageType';
import { Loader } from 'lucide-react';
import PackageTypeForm from '../partials/PackageTypeForm';

interface IProps {
  updateId: string;
  closeModal: () => void;
}

const UpdatePackageTypeModal: React.FC<IProps> = ({ closeModal, updateId }) => {
  const { formik, isLoading } = useUpdatePackageType({ closeModal, updateId });

  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <PackageTypeForm />
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
              {isLoading && <Loader />}
            </button>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};

export default UpdatePackageTypeModal;
