import React from 'react';
import LineChart from '../component/LineChart';

const HeadingDiagram: React.FC = () => {
  return (
    <div className="py-3 flex flex-col md:flex-row items-center justify-between">
      {/* Left Side */}
      <div>
        <p className="text-secondary-500 text-[1.25rem] font-semibold font-sans">
          Hi
          <span className="font-sans text-primary-500 text-[1.25rem] font-semibold">
            {' '}
            User Name,
          </span>
          Welcome Back
        </p>
        <p className="mt-1 typography-regular-extra-small text-secondary-500">Admin Panel</p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col md:flex-row items-center gap-5">
        {/* Amount Distributed */}
        <div className="flex items-center gap-1.5">
          <div className="">
            <p className="font-sans text-[0.6875rem] font-normal tracking-[0.22px]">
              Amount Distributed
            </p>
            <p className="typography-semi-bold-h4 text-[#555]">Rs.1345645.78</p>
          </div>
          {/* Chart */}
          <div className="h-16 w-36">
            <LineChart fillColor="#FF895A" />
          </div>
        </div>

        {/* Total Business */}
        <div className="flex items-center gap-1.5">
          <div className="">
            <p className="font-sans text-[0.6875rem] font-normal tracking-[0.22px]">
              Amount Distributed
            </p>
            <p className="typography-semi-bold-h4 text-[#555]">Rs.1345645.78</p>
          </div>
          {/* Chart */}
          <div className="h-16 w-36">
            <LineChart fillColor="#9F75FF" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadingDiagram;
