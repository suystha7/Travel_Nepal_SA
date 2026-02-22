import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import InputFileWithPreview from '@/components/formField/InputFile';
import ReactSelect from '@/components/formField/ReactSelect';
import type { IOption } from '@/types/common';

interface GalleryFormProps {
  packageOptions: IOption[];
  itineraryOptions: IOption[];
}

interface FormValues {
  type: 'Package' | 'Itinerary';
  package_id: string | undefined;
  itinerary_id: string | undefined;
  image: string;
}

const PackageGalleryForm: React.FC<GalleryFormProps> = ({ packageOptions }) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const selectedType = values.type;

  useEffect(() => {
    if (selectedType === 'Package') {
      setFieldValue('itinerary_id', undefined);
    }

    if (selectedType === 'Itinerary') {
      setFieldValue('package_id', undefined);
    }
  }, [selectedType, setFieldValue]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-x-6 gap-y-2 bg-white container-shadow rounded-md px-2">
        {selectedType === 'Package' && (
          <>
            <ReactSelect
              required
              label="Package Name"
              name="package_id"
              options={packageOptions}
              placeholder="Select package"
            />

            <InputFileWithPreview label="Images" name="image" required multiple />
          </>
        )}
      </div>
    </div>
  );
};

export default PackageGalleryForm;
