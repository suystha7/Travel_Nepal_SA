import React from 'react';
// import InputFileWithPreview from '@/components/formField/InputFile';
import InputSwitch from '@/components/formField/InputSwitch';
import InputText from '@/components/formField/InputText';
import ReactSelect from '@/components/formField/ReactSelect';
import TextEditor from '@/components/TextEditor';
import type { IOption } from '@/components/formField/SearchSelect';
import InputDate from '@/components/formField/InputDate';
import InputSelectMulti from '@/components/formField/ReactSelectMultiple';
import InputFileWithPreview from '@/components/formField/InputFile';

interface OverviewProps {
  countryOptions: IOption[];
  cityOptions: IOption[];
  packageCategoryOptions: IOption[];
  packageTypeOptions: IOption[];
}

const Overview: React.FC<OverviewProps> = ({
  countryOptions,
  cityOptions,
  packageCategoryOptions,
  packageTypeOptions,
}) => {
  return (
    <div className="flex flex-col gap-3 border p-4 rounded-md my-16">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 bg-white">
        <ReactSelect
          required
          label="Country"
          name="country_id"
          options={countryOptions}
          placeholder="Select country name"
        />
        <InputSelectMulti
          required
          label="City"
          name="city_id"
          options={cityOptions}
          placeholder="Select city name"
        />
        <ReactSelect
          required
          label="Package Type"
          name="package_type_id"
          options={packageTypeOptions}
          placeholder="Select package type"
        />
        <ReactSelect
          required
          label="Package Category"
          name="category_id"
          options={packageCategoryOptions}
          placeholder="Select package category"
        />
        <InputSelectMulti
          name="availability_month"
          label="Choose Availability Months"
          placeholder="Select months"
          options={[
            { label: 'January', value: 'jan' },
            { label: 'February', value: 'feb' },
            { label: 'March', value: 'mar' },
            { label: 'April', value: 'apr' },
            { label: 'May', value: 'may' },
            { label: 'June', value: 'jun' },
            { label: 'July', value: 'jul' },
            { label: 'August', value: 'aug' },
            { label: 'September', value: 'sep' },
            { label: 'October', value: 'oct' },
            { label: 'November', value: 'nov' },
            { label: 'December', value: 'dec' },
          ]}
          required
        />

        <InputText required label="Title" name="name" placeholder="Enter title..." />
        <InputFileWithPreview label="Thumbnail Image" name="image" accept="image/*" required />

        <InputText
          required
          label="Destination"
          name="destination"
          placeholder="Enter destination..."
        />
        <InputText
          required
          label="Duration"
          name="duration"
          placeholder="Enter duration..."
          type="number"
        />
        <InputText
          required
          label="Start Point"
          name="start_point"
          placeholder="Enter start point..."
        />
        <InputText required label="End point" name="end_point" placeholder="Enter end point..." />
        <InputText
          required
          label="Group Size"
          name="group_size"
          placeholder="Enter group size..."
        />
        <InputText
          required
          label="Max Altitude"
          name="max_altitude"
          placeholder="Enter max altitude..."
        />
        <InputDate required label="Start Date" name="start_date" placeholder="Select start date" />
        <InputDate required label="End Date" name="end_date" placeholder="Select end date" />
        <InputText
          required
          label="Previous Price"
          name="previous_price"
          placeholder="Enter previous price..."
        />
        <InputText
          required
          label="Discount Price"
          name="current_price"
          placeholder="Enter current price..."
        />
        <div className="flex gap-5 mt-12">
          <InputSwitch name="is_top_tour" label="Is Top Tours ?" />
          <InputSwitch name="is_top_deals" label="Is Top Deals ?" />
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-4">
        <TextEditor label="Description" name="description" required />
        <TextEditor label="Cancellation Policy" name="cancellation_policy" required />
        <TextEditor label="Payment Policy" name="payment_policy" required />
        <TextEditor label="Terms & Conditions" name="terms_conditions" required />
      </div>
    </div>
  );
};

export default Overview;
