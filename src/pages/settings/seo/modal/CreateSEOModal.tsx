import { FormikProvider } from 'formik';
import { Loader } from 'lucide-react';
import SEOForm from '../partials/SEOForm';
import { useCreateSEO } from '../hooks/useCreateSEO';

interface IProps {
  closeModal: () => void;
}

const CreateSEOModal: React.FC<IProps> = ({ closeModal }) => {
  const { formik, isLoading } = useCreateSEO({ closeModal });
  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <SEOForm />
          <div className="flex justify-end items-center col-span-2 my-4">
            <button
              disabled={isLoading}
              type="button"
              onClick={e => {
                formik.handleSubmit();
                e.preventDefault();
              }}
              className="flex items-center gap-x-4 bg-primary-500 px-7 py-2.5 rounded-md text-white cursor-pointer typography-semi-bold-small"
            >
              Create
              {isLoading && <Loader />}
            </button>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};

export default CreateSEOModal;
