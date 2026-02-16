import React from 'react';
import InputText from '@/components/formField/InputText';
import ReactSelect from '@/components/formField/ReactSelect';
import InputFileWithPreview from '@/components/formField/InputFile';

const CountryForm: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 bg-white rounded-md px-2">
      <ReactSelect
        required
        label="Continent"
        name="continent"
        options={[
          { label: 'Asia', value: 'asia' },
          { label: 'Europe', value: 'europe' },
          { label: 'Africa', value: 'africa' },
          { label: 'North America', value: 'north_america' },
          { label: 'South America', value: 'south_america' },
          { label: 'Oceania', value: 'oceania' },
          { label: 'Antarctica', value: 'antarctica' },
        ]}
        placeholder="Select continent"
      />
      <InputText label="Country Name" name="name" placeholder="Enter country name" required />

      <InputFileWithPreview label="Country Logo" name="image" required />
      <ReactSelect
        required
        label="Destination Type"
        name="destination_type"
        options={[
          { label: 'Domestic', value: 'Domestic' },
          { label: 'International', value: 'International' },
        ]}
        placeholder="Select destination type"
      />
    </div>
  );
};

export default CountryForm;
