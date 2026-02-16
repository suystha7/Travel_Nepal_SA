import React from 'react';
import LaboutCostCard from '../component/LaboutCostCard';
import LaboutCostChart from '../component/LaboutCostChart';
import RecentCostumer from './RecentCostumer';

const LaboutCost: React.FC = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {/* Left Side */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 place-items-center">
          <LaboutCostCard />
          <LaboutCostCard />
          <LaboutCostCard />
          <LaboutCostCard />
        </div>
        <div className="mt-6">
          <RecentCostumer />
        </div>
      </div>
      {/* Right Side */}
      <LaboutCostChart />
    </div>
  );
};

export default LaboutCost;
