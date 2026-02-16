import TextEditor from '@/components/TextEditor';
import React from 'react';
import { Form } from 'formik';
import ReactSelect from '@/components/formField/ReactSelect';
const ReservationForm: React.FC = () => {
  return (
    <Form className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-white container-shadow rounded-md px-2">
        <ReactSelect
          required
          label="Reservation Type"
          name="type"
          placeholder="Select type"
          options={[
            {
              label: 'Air Ticket',
              value: 'air_ticket',
            },
            {
              label: 'Car Booking',
              value: 'car_booking',
            },
            {
              label: 'Hotel Booking',
              value: 'hotel_booking',
            },
            {
              label: 'Holiday Booking',
              value: 'holiday_booking',
            },
          ]}
        />
      </div>

      <div className="px-2">
        <TextEditor label="Description" name="description" required />
      </div>
    </Form>
  );
};

export default ReservationForm;
