import { Form, useFormikContext } from 'formik';
import InputText from '@/components/formField/InputText';
import type { IProfileListItem } from '../interface/IProfile';
import InputFileWithPreview from '@/components/formField/InputFile';

const ProfileForm = () => {
  const { handleSubmit } = useFormikContext<IProfileListItem>();

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-white container-shadow mt-4 rounded-md px-6 py-5"
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-7">
        <InputText name="role" label='Role' disabled className='capitalize'/>
        <InputText label="Full Name" name="full_name" placeholder="Enter full name" required />
        <InputText label="Email" name="email" placeholder="Enter email" required/>
        <InputText label="Phone No" name="phone_no" placeholder="Enter phone no" />
        <InputFileWithPreview name="avatar" label="Avatar" />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
        >
          Update
        </button>
      </div>
    </Form>
  );
};

export default ProfileForm;
