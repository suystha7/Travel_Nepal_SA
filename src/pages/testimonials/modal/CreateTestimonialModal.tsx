import { FormikProvider } from 'formik';
import { Loader } from 'lucide-react';
import { useCreateTestimonial } from '../hooks/useCreateTestimonials';
import TestimonialForm from '../partials/TestimonialForm';

interface IProps {
  closeModal: () => void;
}

const CreateTestimonialModal: React.FC<IProps> = ({ closeModal }) => {
  const { formik, isLoading } = useCreateTestimonial({ closeModal });
  return (
    <FormikProvider value={formik}>
      <form>
        <div className="max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <TestimonialForm />
          <div className="my-4 flex items-center justify-end col-span-2 px-2">
            <button
              disabled={isLoading}
              type="submit"
              onClick={e => {
                formik.handleSubmit();
                e.preventDefault();
              }}
              className="px-7 py-2.5 typography-semi-bold-small text-white bg-primary-500 rounded-md flex items-center gap-x-4 cursor-pointer"
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

export default CreateTestimonialModal;
