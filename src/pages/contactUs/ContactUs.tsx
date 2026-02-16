import React from 'react';
import Header from './partials/Header';
import ContactUsTable from './partials/ContactUsTable';

const ContactUs: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Header />
      <ContactUsTable />
    </div>
  );
};

export default ContactUs;
