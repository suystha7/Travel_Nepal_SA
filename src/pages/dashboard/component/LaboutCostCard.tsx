import { RefreshCwIcon, TrendingUp } from 'lucide-react';
import React from 'react';

const LaboutCostCard: React.FC = () => {
  return (
    <div className="py-[1.125rem] w-72 px-3 rounded-[8px] border-[0.5px] border-primary-50 bg-white shadow-[0px_0px_8px_2px_rgba(158,158,158,0.06)]">
      <div className="relative">
        <div className="flex items-center gap-2.5">
          <TrendingUp className="p-2.5" />
          <div className="flex flex-col gap-1">
            <p className="font-sans text-[#757575] text-[0.6875rem] font-normal tracking-[0.22px] leading-normal">
              Activation Customer / Total
            </p>
            <p className="typography-semi-bold-large text-primary-900">6469/27095</p>
          </div>
        </div>
        <RefreshCwIcon className="absolute top-0 right-0 -translate-y-full" />
      </div>
    </div>
  );
};

export default LaboutCostCard;
