import React from 'react';
import { useCreateCountry } from '../hooks/useCreateCountry';
import { FormikProvider } from 'formik';
import { Loader } from 'lucide-react';
import CountryForm from '../partials/CountryForm';

interface IProps {
  closeModal: () => void;
}

const CreateCountryModal: React.FC<IProps> = ({ closeModal }) => {
  const { formik, isLoading } = useCreateCountry({
    closeModal,
  });
  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <CountryForm />
          <div className="my-4 flex items-center justify-end col-span-2 px-2">
            <button
              disabled={isLoading}
              type="submit"
              onClick={e => {
                e.preventDefault();
                formik.handleSubmit();
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

export default CreateCountryModal;
