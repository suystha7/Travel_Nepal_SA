import { FaSpinner } from 'react-icons/fa6';

const Loading = () => {
  return (
    <div role="status" className="flex items-center justify-center w-full h-[40vh]">
      <FaSpinner className="animate-spin h-8 w-8 text-secondary-300" aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
