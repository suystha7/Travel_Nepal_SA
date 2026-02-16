'use client';
import React from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface IProps {
  fillColor: string;
}

// Define the type for your data points
interface ChartData {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

const data: ChartData[] = [
  {
    name: '',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const LineChart: React.FC<IProps> = ({ fillColor }) => {
  return (
    <div className="w-full h-full bg-white rounded-md flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          {/* CartesianGrid adds grid lines to the chart */}
          <CartesianGrid strokeDasharray="1 1" />
          <Tooltip />
          <Area type="natural" dataKey="uv" stroke="#8884d8" fill={fillColor} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
