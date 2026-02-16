/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ApiErrorResponse {
  error?: {
    status?: number;
    data?: any;
    errors?: Record<string, any>;
    message?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Options for the error handling function
 */
export interface ErrorHandlingOptions {
  /** Whether to log errors to console */
  logErrors?: boolean;
  /** Map API field names to form field names */
  fieldMapping?: Record<string, string>;
}

/**
 * Parse API error response and set corresponding field errors
 * @param response - The API response object
 * @param setFieldError - Formik's setFieldError function
 * @param options - Optional configuration
 * @returns Whether any field errors were set
 */
export const handleFormErrors = (
  response: ApiErrorResponse,
  setFieldError: (field: string, message: string) => void,
  options: ErrorHandlingOptions = {}
): boolean => {
  const { logErrors = false, fieldMapping = {} } = options;

  if (!response || !response.error) {
    return false;
  }

  if (logErrors) {
    console.warn('Processing API error response:', response.error);
  }

  // Possible locations where error data might be found
  const errorSources = [
    response.error.data?.error,
    response.error.data?.errors,
    response.error.data,
    response.error.errors,
    response.error,
  ];

  // Find the first valid error object
  const errorData = errorSources.find(source => source && typeof source === 'object');

  if (!errorData) {
    return false;
  }

  let hasSetErrors = false;

  // Process each field error
  Object.entries(errorData).forEach(([field, error]) => {
    // Map API field names to form field names if needed
    const formField = fieldMapping[field] || field;

    if (Array.isArray(error) && error.length > 0) {
      setFieldError(formField, error[0]);
      hasSetErrors = true;
      if (logErrors) console.warn(`Field error for ${formField}:`, error[0]);
    } else if (typeof error === 'string') {
      setFieldError(formField, error);
      hasSetErrors = true;
      if (logErrors) console.warn(`Field error for ${formField}:`, error);
    } else if (typeof error === 'object' && error !== null) {
      // Handle nested error objects
      const errorMessage = (error as { message?: string }).message || Object.values(error)[0];
      if (errorMessage && typeof errorMessage === 'string') {
        setFieldError(formField, errorMessage);
        hasSetErrors = true;
        if (logErrors) console.warn(`Field error for ${formField}:`, errorMessage);
      }
    }
  });

  return hasSetErrors;
};
