import React from 'react';
import PolicyTable from './partials/PolicyTable';

const Policy: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <PolicyTable />
    </div>
  );
};

export default Policy;
