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

const getUrl = (file: any) => {
  if (!file) return null;
  if (typeof file === 'string') return file;
  if (file?.image) return file.image;
  if (file instanceof File) return URL.createObjectURL(file);
  return null;
};

const isVideoFile = (file: any) => {
  const url = typeof file === 'string' ? file : file?.image;
  if (url && /\.(mp4|webm|ogg)$/i.test(url)) return true;
  if (file instanceof File && file.type.startsWith('video/')) return true;
  return false;
};

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

      const newUrls = fileArray.map(file => URL.createObjectURL(file));
      const existingPreviews = Array.isArray(previewField.value) ? previewField.value : [];
      previewHelpers.setValue([...existingPreviews, ...newUrls]);
    } else {
      const file = fileArray[0];
      const url = URL.createObjectURL(file);

      setFieldValue(name, file);
      previewHelpers.setValue(url);
    }

    if (inputRef.current) inputRef.current.value = '';
  };

  const removePreview = (index: number) => {
    if (multiple) {
      const files = [...(field.value || [])];
      const previews = [...(previewField.value || [])];

      const url = previews[index];
      if (url?.startsWith('blob:')) URL.revokeObjectURL(url);

      files.splice(index, 1);
      previews.splice(index, 1);

      setFieldValue(name, files);
      previewHelpers.setValue(previews);
    } else {
      const url = previewField.value;
      if (url?.startsWith('blob:')) URL.revokeObjectURL(url);

      setFieldValue(name, null);
      previewHelpers.setValue(null);
    }
  };

  // Auto-generate preview from API data
  useEffect(() => {
    if (!field.value) return;
    if (previewField.value) return;

    const values = Array.isArray(field.value) ? field.value : [field.value];

    const urls = values.map(item => getUrl(item)).filter(Boolean);

    if (multiple) {
      previewHelpers.setValue(urls);
    } else {
      previewHelpers.setValue(urls[0]);
    }
  }, [field.value]);

  useEffect(() => {
    return () => {
      const previews = Array.isArray(previewField.value)
        ? previewField.value
        : [previewField.value];

      previews?.forEach((url: string) => {
        if (url?.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const previews = Array.isArray(previewField.value)
    ? previewField.value
    : previewField.value
      ? [previewField.value]
      : [];

  const files = Array.isArray(field.value) ? field.value : field.value ? [field.value] : [];

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
          className={`p-2 border bg-white rounded-md file:px-4 file:py-1 file:bg-gray-100 file:border-none ${inputstyles}`}
        />

        {previews.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-4">
            {previews.map((url, idx) => {
              const file = files[idx];
              const isVideo = isVideoFile(file);

              return (
                <div key={`${url}-${idx}`} className="relative">
                  {isVideo ? (
                    <video
                      src={url}
                      className="border rounded-md w-64 h-40 object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={url}
                      alt="preview"
                      className="border rounded-md w-32 h-32 object-cover"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => removePreview(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {meta.touched && meta.error && <p className="mt-2 text-red-500 text-sm">{meta.error}</p>}
    </div>
  );
};

export default InputFileWithPreview;
