import { PATH } from '@/constants/paths';
import {
  BadgeInfo,
  Code2,
  List,
  MapPin,
  NotebookText,
  Package,
  Phone,
  Users,
  Users2,
} from 'lucide-react';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlinePreview } from 'react-icons/md';

export const mainMenuItems = [
  {
    id: 'locations',
    icon: MapPin,
    label: 'Location',
    active: false,
    link: PATH.location.country,
  },
  {
    id: 'about',
    icon: BadgeInfo,
    label: 'About',
    active: false,
    link: PATH.about.about,
  },
  {
    id: 'manage-user',
    icon: Users2,
    label: 'Users',
    active: false,
    link: PATH.user,
  },
  {
    id: 'breadcrumb',
    icon: Code2,
    label: 'Breadcrumb',
    active: false,
    link: PATH.breadcrumb,
  },
  {
    id: 'packages',
    icon: Package,
    label: 'Packages',
    active: false,
    link: PATH.packages.packageType,
  },

  {
    id: 'blog',
    icon: List,
    label: 'Blog',
    active: false,
    link: PATH.blogs.blogCategory,
  },

  {
    id: 'reservation',
    icon: NotebookText,
    label: 'Reservation',
    active: false,
    link: PATH.reservation,
  },
  {
    id: 'faq',
    icon: HiOutlineQuestionMarkCircle,
    label: 'FAQs',
    active: false,
    link: PATH.faq,
  },
  {
    id: 'testimonials',
    icon: MdOutlinePreview,
    label: 'Review',
    active: false,
    link: PATH.testimonials,
  },
  {
    id: 'contact-us',
    icon: Phone,
    label: 'Contact',
    active: false,
    link: PATH.contactUs,
  },
  {
    id: 'subscribers',
    icon: Users,
    label: 'Subscribers',
    active: false,
    link: PATH.subscribers,
  },
  {
    id: 'settings',
    icon: IoSettingsOutline,
    label: 'Settings',
    active: false,
    link: PATH.settings.generalSettings,
  },
];
