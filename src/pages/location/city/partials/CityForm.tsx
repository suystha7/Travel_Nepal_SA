import InputText from '@/components/formField/InputText';
import React from 'react';
import ReactSelect from '@/components/formField/ReactSelect';
import type { IOption } from '@/types/common';

interface CityFormProps {
  countryOptions: IOption[];
}

const CityForm: React.FC<CityFormProps> = ({ countryOptions }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 container-shadow px-2 rounded-md">
        <ReactSelect
          label="Country Name"
          name="country_id"
          options={countryOptions}
          placeholder="Select country"
          required
        />

        <InputText label="City Name" name="name" placeholder="Enter city" required />
      </div>
    </div>
  );
};

export default CityForm;
