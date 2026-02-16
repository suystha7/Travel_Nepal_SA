import SearchSection from '@/components/SearchSection';

interface SocialMediaListProps {
  setSearch: (value: string) => void;
  search?: string;
  onFilter?: () => void;
}

const SocialMediaList = ({ setSearch, search }: SocialMediaListProps) => {
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

export default SocialMediaList;
