import SearchSection from '@/components/SearchSection';

interface SocialMediaFilterListProps {
  setSearch: (value: string) => void;
  search?: string;
  onFilter?: () => void;
}

const SocialMediaFilterList = ({ setSearch, search }: SocialMediaFilterListProps) => {
  return (
    <div className="flex items-center justify-between">
      <SearchSection
        showAdjustmentIcon={false}
        styleClass="w-72"
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default SocialMediaFilterList;
