import HeaderSection from '@/common/HeaderTabs';
import { locationHeaderItem } from './LocationHeaderTabs';
import { useSearchParams } from 'react-router-dom';
import Country from './country/Country';
import City from './city/City';

export default function LocationWrapper() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'country';
  
  return (
    <>
      <HeaderSection items={locationHeaderItem} />
      {tab === 'country' ? <Country /> : <City />}
    </>
  );
}
