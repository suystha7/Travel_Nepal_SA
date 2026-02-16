import { FormikProvider } from 'formik';
import React from 'react';
import { useUpdatePackageCategory } from '../hooks/useUpdatePackageCategory';
import { Loader } from 'lucide-react';
import PackageCategoryForm from '../partials/PackageCategoryForm';

interface IProps {
  updateId: string;
  closeModal: () => void;
}

const UpdatePackageCategoryModal: React.FC<IProps> = ({ closeModal, updateId }) => {
  const { formik, isLoading, packageTypeOptions } = useUpdatePackageCategory({
    closeModal,
    updateId,
  });

  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <PackageCategoryForm packageTypeOptions={packageTypeOptions} />
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

export default UpdatePackageCategoryModal;
