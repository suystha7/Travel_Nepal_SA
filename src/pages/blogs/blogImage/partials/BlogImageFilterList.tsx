// import { FiFilter } from "react-icons/fi";
// import ExportButton from "@/components/reusable-component/ExportButton";
// import PrintButton from "@/components/reusable-component/PrintButton";
import SearchSection from '@/components/SearchSection';

interface BlogImageFilterListProps {
  setSearch: (value: string) => void;
  search?: string;
  onFilter?: () => void;
}

const BlogImageFilterList = ({
  setSearch,
  search,
  //   onFilter,
}: BlogImageFilterListProps) => {
  return (
    <div className="flex items-center justify-between">
      <SearchSection
        showAdjustmentIcon={false}
        styleClass="w-72"
        search={search}
        setSearch={setSearch}
      />

      {/* <div className="flex items-center gap-4">
        <button
          onClick={onFilter}
          className="flex items-center gap-1 px-2 py-1 rounded-md border border-primary-500 text-primary-500 hover:bg-primary-50"
        >
          <FiFilter size={18} />
          <span>Filter</span>
        </button>

        <ExportButton />

        <PrintButton />
      </div> */}
    </div>
  );
};

export default BlogImageFilterList;
