import { PATH } from '@/constants/paths';
import City from '@/pages/location/city/City';
import Country from '@/pages/location/country/Country';
import LocationWrapper from '@/pages/location/LocationWrapper';

export const locationRoutes = [
  {
    element: <LocationWrapper />,
    children: [
      {
        path: PATH.location.country,
        element: <Country />,
      },
      {
        path: PATH.location.city,
        element: <City />,
      },
    ],
  },
];
