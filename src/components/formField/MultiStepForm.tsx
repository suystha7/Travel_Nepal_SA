import {
  FormikProvider,
  type FormikValues,
  type FormikContextType,
  type FormikTouched,
} from 'formik';

interface Step {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface MultiStepFormProps<T extends FormikValues> {
  formik: FormikContextType<T>;
  steps: Step[];
  currentStep: number;
  onStepChange: (stepIndex: number) => void;
  submitText?: string;
  nextText?: string;
  prevText?: string;
  btnDisabled?: boolean;
  showStepIndicator?: boolean;
  allowStepSkip?: boolean;
  isSubmitting?: boolean;
}

export default function MultiStepForm<T extends FormikValues>({
  formik,
  steps,
  currentStep,
  onStepChange,
  submitText = 'Submit',
  nextText = 'Next',
  prevText = 'Previous',
  btnDisabled = false,
  showStepIndicator = true,
  allowStepSkip = false,
  isSubmitting = false,
}: MultiStepFormProps<T>) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const hasErrors = (obj: unknown): boolean => {
    if (obj === null || obj === undefined) return false;
    if (typeof obj === 'string') return Boolean(obj);
    if (typeof obj === 'number' || typeof obj === 'boolean') return false;
    if (Array.isArray(obj)) return obj.some(item => hasErrors(item));
    if (typeof obj === 'object')
      return Object.values(obj as Record<string, unknown>).some(v => hasErrors(v));
    return false;
  };

  const handleNext = async () => {
    onStepChange(currentStep + 1);
  };

  const handlePrevious = () => {
    if (!isFirstStep) onStepChange(currentStep - 1);
  };

  const handleStepClick = (stepIndex: number) => {
    if (allowStepSkip) onStepChange(stepIndex);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      const errors = await formik.validateForm();
      const makeTouched = <V,>(v: V): FormikTouched<V> => {
        if (v === null || v === undefined) return true as unknown as FormikTouched<V>;
        if (Array.isArray(v)) {
          return v.map(item => makeTouched(item)) as unknown as FormikTouched<V>;
        }
        if (typeof v === 'object') {
          const obj: Record<string, unknown> = {};
          Object.keys(v as Record<string, unknown>).forEach(k => {
            obj[k] = makeTouched((v as Record<string, unknown>)[k]);
          });
          return obj as FormikTouched<V>;
        }
        return true as unknown as FormikTouched<V>;
      };

      formik.setTouched(makeTouched(formik.values));

      if (hasErrors(errors)) {
        formik.setErrors(errors);
      } else {
        formik.handleSubmit();
      }
    } else {
      await handleNext();
    }
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="space-y-6 p-2 rounded">
        {showStepIndicator && (
          <div className="fixed mt-16 top-0 left-0 w-full z-50 bg-white p-4 border-b">
            <div className="flex justify-around w-full">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex items-center cursor-pointer"
                  onClick={() => allowStepSkip && handleStepClick(index)}
                >
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium transition-colors duration-200
              ${index <= currentStep ? 'bg-primary-400 text-white' : 'bg-gray-200 text-white'}`}
                  >
                    {index + 1}
                  </div>

                  <p
                    className={`ml-2 text-base font-medium truncate ${
                      index <= currentStep ? 'text-primary-400' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="min-h-[300px]">{steps[currentStep]?.content}</div>

        <div className="flex justify-end items-center mt-16 gap-2 fixed bottom-0 left-0 w-full z-50 bg-white p-4 border-t">
          {!isFirstStep && (
            <button
              type="button"
              className="w-[110px] bg-secondary-500 text-white py-2 rounded-md cursor-pointer"
              onClick={handlePrevious}
            >
              {prevText}
            </button>
          )}
          <button
            type="submit"
            className="w-[110px] bg-primary-500 text-white py-2 rounded-md cursor-pointer"
            disabled={btnDisabled || isSubmitting}
          >
            {isLastStep ? (isSubmitting ? 'Saving...' : submitText) : nextText}
          </button>
        </div>
      </form>
    </FormikProvider>
  );
}
