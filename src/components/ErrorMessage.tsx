const ErrorMessage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 px-4 min-h-[60vh] text-center">
      <h1 className="mb-4 font-bold text-red-600 text-xl">Something went wrong</h1>
      <p className="mb-6 text-gray-700 text-md">
        We’re sorry, but an unexpected error has occurred.
      </p>
    </div>
  );
};

export default ErrorMessage;
