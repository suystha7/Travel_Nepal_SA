import Header from './partials/Header';
import NotFound from '@/components/NotFound';

export default function Dashboard() {
  const hasData = false;

  if (!hasData) {
    return <NotFound />;
  }

  return (
    <>
      <Header />
    </>
  );
}
