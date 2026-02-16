import { Plus } from 'lucide-react';
import useDisclosure from '@/utils/useDisclosure';

const TableHeader = () => {
  const createModal = useDisclosure();

  return (
    <div>
      <div className="flex items-center justify-between h-12 gap-4">
        <input
          type="text"
          placeholder="Search..."
          // value={localSearch}
          // onChange={e => setLocalSearch(e.target.value)}
          className="w-64 px-3 py-2 h-8 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-400"
        />
        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-2 border border-primary-500 rounded-md cursor-pointer"
        >
          <Plus className="w-4 h-4 text-primary-500" />
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
