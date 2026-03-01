import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (value: number) => void;
};

const ROW_OPTIONS = [5, 10, 15, 20, 25, 30, 50, 100];

const CustomPagination = ({
  currentPage,
  totalItems,
  pageCount,
  perPage,
  onPageChange,
  onPerPageChange,
}: PaginationProps) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(pageCount, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePage = (page: number) => {
    if (page < 1 || page > pageCount) return;
    onPageChange(page);
  };

  const startItem = totalItems > 0 ? (currentPage - 1) * perPage + 1 : 0;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="w-full">
      <div className="flex md:flex-row flex-col justify-between items-center gap-4">
        <div className="text-gray-700 text-sm">
          Showing {startItem} - {endItem} of {totalItems}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows:</span>
            <select
              value={perPage}
              onChange={e => onPerPageChange(Number(e.target.value))}
              className="border border-gray-100 rounded px-2 py-1 text-sm cursor-pointer"
            >
              {ROW_OPTIONS.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50 p-2 rounded-md disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {generatePageNumbers().map(num => (
            <button
              key={num}
              onClick={() => handlePage(num)}
              className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                currentPage === num
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:bg-primary-400/80 hover:text-white'
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === pageCount}
            className="disabled:opacity-50 p-2 rounded-md disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
