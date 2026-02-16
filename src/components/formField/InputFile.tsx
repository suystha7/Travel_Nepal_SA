import { useField, useFormikContext } from 'formik';
import { X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

interface InputFileProps {
  label: string;
  name: string;
  styles?: string;
  inputstyles?: string;
  accept?: string;
  previewFieldSuffix?: string;
  required?: boolean;
  multiple?: boolean;
}

const InputFileWithPreview: React.FC<InputFileProps> = ({
  label,
  styles,
  inputstyles,
  accept = 'image/*,video/*',
  name,
  previewFieldSuffix = 'Preview',
  required,
  multiple = false,
}) => {
  const [field, meta] = useField(name);
  const previewFieldName = `${name}${previewFieldSuffix}`;
  const [previewField, , previewHelpers] = useField(previewFieldName);
  const { setFieldValue } = useFormikContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    if (multiple) {
      const existingFiles = Array.isArray(field.value) ? field.value : [];
      const updatedFiles = [...existingFiles, ...fileArray];
      setFieldValue(name, updatedFiles);

      const existingPreviews = Array.isArray(previewField.value) ? previewField.value : [];
      const newObjectUrls = fileArray.map((file) => URL.createObjectURL(file));
      previewHelpers.setValue([...existingPreviews, ...newObjectUrls]);
    } else {
      if (previewField.value) {
        if (Array.isArray(previewField.value)) {
          previewField.value.forEach((url: string) => {
            if (url.startsWith('blob:')) URL.revokeObjectURL(url);
          });
        } else if (typeof previewField.value === 'string' && previewField.value.startsWith('blob:')) {
          URL.revokeObjectURL(previewField.value);
        }
      }

      setFieldValue(name, fileArray[0]);
      previewHelpers.setValue(URL.createObjectURL(fileArray[0]));
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const removePreview = (index: number) => {
    if (multiple) {
      const updatedFiles = [...(field.value || [])];
      const updatedPreviews = [...(previewField.value || [])];

      if (updatedPreviews[index]?.startsWith('blob:')) {
        URL.revokeObjectURL(updatedPreviews[index]);
      }

      updatedFiles.splice(index, 1);
      updatedPreviews.splice(index, 1);

      setFieldValue(name, updatedFiles);
      previewHelpers.setValue(updatedPreviews);
    } else {
      if (previewField.value?.startsWith('blob:')) {
        URL.revokeObjectURL(previewField.value);
      }
      setFieldValue(name, null);
      previewHelpers.setValue(null);
    }
  };

  useEffect(() => {
    if (field.value && !previewField.value) {
      if (Array.isArray(field.value)) {
        const objectUrls = field.value.map((file: File | string) =>
          typeof file === 'string' ? file : URL.createObjectURL(file)
        );
        previewHelpers.setValue(objectUrls);
      } else {
        const url = typeof field.value === 'string' ? field.value : URL.createObjectURL(field.value);
        previewHelpers.setValue(url);
      }
    }
  }, [field.value, previewField.value, previewHelpers]);

  useEffect(() => {
    return () => {
      if (previewField.value) {
        const previews = Array.isArray(previewField.value) ? previewField.value : [previewField.value];
        previews.forEach((url: string) => {
          if (typeof url === 'string' && url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
          }
        });
      }
    };
  }, []);

  const renderPreview = () => {
    if (!previewField.value) return null;

    const previews = Array.isArray(previewField.value) ? previewField.value : [previewField.value];
    const files = Array.isArray(field.value) ? field.value : [field.value];

    return (
      <div className="mt-2 flex flex-wrap gap-4">
        {previews.map((url, idx) => {
          const fileSource = files[idx];
          const isVideo =
            (typeof fileSource === 'string' && /\.(mp4|webm|ogg)$/i.test(fileSource)) ||
            (fileSource instanceof File && fileSource.type.startsWith('video/'));

          return (
            <div key={`${url}-${idx}`} className="relative">
              {isVideo ? (
                <video src={url} className="border rounded-md w-64 h-40 object-cover" />
              ) : (
                <img
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  className="border rounded-md w-32 h-32 object-cover"
                />
              )}
              <button
                type="button"
                onClick={() => removePreview(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className={`${styles} flex flex-col gap-4`}>
        <label className="flex items-center gap-1" htmlFor={name}>
          <span className="text-gray-900 font-medium text-sm">{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
        <input
          ref={inputRef}
          id={name}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className={`p-2 file:px-4 file:py-0.5 file:text-gray-600 file:font-sans file:border-none file:bg-gray-100 border bg-white rounded-md ${inputstyles}`}
        />
        {renderPreview()}
      </div>
      {meta.touched && meta.error && <p className="mt-2 text-red-500 text-sm">{meta.error}</p>}
    </div>
  );
};

export default InputFileWithPreview;