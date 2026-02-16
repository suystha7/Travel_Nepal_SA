import { PATH } from '@/constants/paths';
import Booking from '@/pages/booking/Booking';
import Breadcrumb from '@/pages/breadcrumb/Breadcrumb';
import ContactUs from '@/pages/contactUs/ContactUs';
import Dashboard from '@/pages/dashboard/Dashboard';
import FAQ from '@/pages/faq/FAQ';
import Reservation from '@/pages/reservations/Reservation';
import Subscriber from '@/pages/subscribers/Subscriber';
import Testimonial from '@/pages/testimonials/Testimonial';
import User from '@/pages/user/User';

export const dashboardRoutes = [
  {
    path: PATH.dashboard,
    element: <Dashboard />,
  },
  {
    path: PATH.user,
    element: <User />,
  },
  {
    path: PATH.breadcrumb,
    element: <Breadcrumb />,
  },
  {
    path: PATH.booking,
    element: <Booking />,
  },
  {
    path: PATH.faq,
    element: <FAQ />,
  },
  {
    path: PATH.testimonials,
    element: <Testimonial />,
  },
  {
    path: PATH.contactUs,
    element: <ContactUs />,
  },
  {
    path: PATH.reservation,
    element: <Reservation />,
  },
  {
    path: PATH.subscribers,
    element: <Subscriber />,
  },
];
