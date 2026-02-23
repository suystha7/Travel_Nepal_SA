import React from 'react';
import { useCreatePackageGallery } from '../hooks/useCreatePackageGallery';
import { FormikProvider } from 'formik';
import { Loader } from 'lucide-react';
import PackageForm from '../partials/PackageGalleryForm';

interface IProps {
  closeModal: () => void;
}

const CreatePackageGalleryModal: React.FC<IProps> = ({ closeModal }) => {
  const { formik, isLoading, packageOptions } = useCreatePackageGallery({
    closeModal,
  });

  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <PackageForm packageOptions={packageOptions} />
          <div className="my-4 flex items-center justify-end col-span-2 px-2">
            <button
              disabled={isLoading}
              type="submit"
              onClick={e => {
                formik.handleSubmit();
                e.preventDefault();
              }}
              className="px-7 py-2.5 typography-semi-bold-small text-white bg-primary-500 rounded flex items-center gap-x-4 cursor-pointer"
            >
              Create
              {isLoading && <Loader className="animate-spin duration-500 transition-all" />}
            </button>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CreatePackageGalleryModal;
