import React from 'react';
import Table from '@/components/Table';
import type { ColumnDef } from '@tanstack/react-table';
import type { IRecentCustomer } from '../interface/IRecendCustomer';
import { recentCustomers } from '../data/table';
import { DeleteIcon, ListOrderedIcon, RefreshCwIcon } from 'lucide-react';

const RecentCostumer: React.FC = () => {
  const column: ColumnDef<IRecentCustomer>[] = [
    {
      id: 'S.N.',
      size: 50,
      header: () => (
        <div className="flex items-center justify-center">
          <ListOrderedIcon />
        </div>
      ),
      cell: ({ row }) => <div className="flex items-center justify-center">{row.index + 1}</div>,
    },
    {
      header: 'UserID',
      accessorKey: 'userId',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'D.O.J',
      accessorKey: 'doj',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ cell }) => <span>{cell.row.original.status}</span>,
    },
  ];

  return (
    <div className="w-full px-6 py-3 rounded-[8px] bg-white border border-primary-50 shadow-[0px_0px_8px_2px_rgba(158,158,158,0.04)]">
      <div className="flex items-center justify-between">
        <p className="typography-semi-bold-small text-primary-900">Recent Customer</p>
        <div className="flex items-center gap-2">
          <RefreshCwIcon />
          <DeleteIcon />
        </div>
      </div>
      <div className="mt-3">
        <Table columns={column} data={recentCustomers} />
      </div>
    </div>
  );
};

export default RecentCostumer;
