import { set } from 'lodash';

type FieldError = {
  path: string;
  msg: string;
};

type ErrorResponse = {
  data?: {
    errors?: FieldError[];
    message?: string;
  };
};

export type ApiResponse = {
  error?: ErrorResponse;
  data?: {
    status: string;
    message: string;
  };
};

type SetErrorCallback = (errors: Record<string, string>) => void;

const handleErrors = (response: ApiResponse, setErrorCallback: SetErrorCallback): void => {
  if (response.error?.data) {
    if (Array.isArray(response.error.data.errors)) {
      const errorObject: Record<string, string> = {};
      response.error.data.errors.forEach(({ path, msg }) => {
        // errorObject[path] = msg;
        set(errorObject, path, msg);
      });
      setErrorCallback(errorObject);
    } else if (response.error.data.message) {
      setErrorCallback({ general: response.error.data.message });
    }
  }
};

export default handleErrors;
