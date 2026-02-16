import BookingTable from './partials/BookingTable';
import Header from './partials/Header';
import NotFound from '@/components/NotFound';

export default function Booking() {
  const hasData = false;

  if (!hasData) {
    return <NotFound />;
  }

  return (
    <>
      <Header />
      <BookingTable />
    </>
  );
}
