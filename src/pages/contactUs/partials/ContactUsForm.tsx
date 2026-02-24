import React from 'react';
import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';

const ContactUsForm: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 bg-white container-shadow rounded-md px-2">
        <InputText  
          label="Name" 
          name="name" 
          placeholder="Enter name..." 
          readOnly 
        />

        <InputText  
          label="Email" 
          name="email" 
          placeholder="Enter email..." 
          readOnly 
        />

        <InputText  
          label="Phone" 
          name="phone" 
          placeholder="Enter phone number..." 
          readOnly 
        />

        <InputText  
          label="Service" 
          name="service" 
          placeholder="Service requested..." 
          readOnly 
        />
      </div>

      <div className="px-2">
        <TextEditor 
          label="Message" 
          name="message"  
          readonly 
        />
      </div>
    </div>
  );
};

export default ContactUsForm;