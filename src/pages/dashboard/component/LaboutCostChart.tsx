import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import React from 'react';

const LaboutCostChart: React.FC = () => {
  const data = [
    {
      name: 'JAN',
      uv: 4000,
      amt: 2400,
    },
    {
      name: 'FEB',
      uv: 3000,
      amt: 2210,
    },
    {
      name: 'MAR',
      uv: 2000,
      amt: 2290,
    },
    {
      name: 'APR',
      uv: 2780,
      amt: 2000,
    },
    {
      name: 'MAY',
      uv: 1890,
      amt: 2181,
    },
    {
      name: 'JUN',
      uv: 2390,
      amt: 2500,
    },
    {
      name: 'JUL',
      uv: 3490,
      amt: 2100,
    },
  ];
  return (
    <div className="h-max py-3 px-[1.375rem] rounded-[8px] border border-primary-50 shadow-[0px_0px_8px_2px_rgba(158,158,158,0.06)]">
      <p className="typography-bold-small text-[#1E1E1E]">Labour Cost</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#9F75FF" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <p className="font-inter text-[0.625rem] font-normal leading-3 my-1.5 text-[#4B4B4B]">
        Net Labor Cost: AED 34M
      </p>
    </div>
  );
};

export default LaboutCostChart;
