import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';
import React from 'react';
import InputFileWithPreview from '@/components/formField/InputFile';

const BookingForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-white container-shadow rounded-md px-2">
        <InputText required label="Title" name="title" placeholder="Enter title..." />
        <InputText required label="Slug" name="booking_slug" placeholder="Enter booking slug..." />
        <InputText required label="Customer" name="customer" placeholder="Enter customer name..." />
        <InputText required label="Service" name="service" placeholder="Enter service name..." />
        <InputText
          required
          label="Booking Count"
          name="booking_count"
          placeholder="Enter booking count..."
          type="number"
        />
        <InputText
          required
          label="View Count"
          name="view_count"
          placeholder="Enter view count..."
          type="number"
        />
        <InputText required label="Urgent" name="is_urgent" placeholder="Is urgent?" />
        <InputFileWithPreview label="Image" name="image" />
      </div>

      <div className="px-2">
        <TextEditor label="Description" name="description" required />
      </div>
    </div>
  );
};

export default BookingForm;
