import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';
import { Form, useFormikContext } from 'formik';
import React from 'react';

const StatsForm: React.FC<{ isUpdate: boolean }> = ({ isUpdate }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-white container-shadow mt-4 rounded-md px-6 py-5"
    >
      <div className="grid grid-cols-5 gap-x-6 gap-y-7 ">
        <InputText required label="Title" name="title" placeholder="Enter title.." />
        <InputText
          required
          label="Year Experience"
          name="year_experience"
          placeholder="Enter year experience.."
        />
        <InputText
          required
          label="Happy Travellers"
          name="happy_travellers"
          placeholder="Enter happy travellers.."
        />
        <InputText
          required
          label="Travel History"
          name="travel_history"
          placeholder="Enter travel history.."
        />
        <InputText
          required
          label="Total Packages"
          name="total_packages"
          placeholder="Enter total packages.."
        />
      </div>
      <TextEditor name="description" label="Description" required />

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
        >
          {isUpdate ? 'Update' : 'Add'}
        </button>
      </div>
    </Form>
  );
};

export default StatsForm;
