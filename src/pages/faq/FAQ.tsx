import React from 'react';
import Header from './partials/Header';
import FAQTable from './partials/FAQTable';

const FAQ: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Header />
      <FAQTable />
    </div>
  );
};

export default FAQ;
