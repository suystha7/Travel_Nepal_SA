import React from 'react';
import HeadingDiagram from './HeadingDiagram';
import LaboutCost from './LaboutCost';

const DashboardContent: React.FC = () => {
  return (
    <>
      <div className="mt-4 px-6 py-5 rounded-[8px] bg-white">
        <HeadingDiagram />
        <LaboutCost />
      </div>
    </>
  );
};

export default DashboardContent;
