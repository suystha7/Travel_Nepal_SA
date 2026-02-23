import { PATH } from '@/constants/paths';
import {
  BadgeInfo,
  Code2,
  // LayoutDashboard,
  List,
  MapPin,
  Package,
  Phone,
  Users,
  Users2, 
} from 'lucide-react';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlinePreview } from 'react-icons/md';

export const mainMenuGroups = [
  // {
  //   items: [
  //     {
  //       id: 'dashboard',
  //       icon: LayoutDashboard,   
  //       label: 'Dashboard',
  //       link: PATH.dashboard,
  //     },
  //   ],
  // },
  {
    title: 'Travel Management',
    items: [
      {
        id: 'locations',
        icon: MapPin,
        label: 'Location',
        link: PATH.location.country,
      },
      {
        id: 'packages',
        icon: Package,
        label: 'Packages',
        link: PATH.packages.packageType,
      },
      // {
      //   id: 'bookings',
      //   icon: NotebookText,
      //   label: 'Bookings',
      //   link: PATH.booking,
      // },
    ],
  },
  {
    title: 'Content Management',
    items: [
      {
        id: 'breadcrumb',
        icon: Code2,
        label: 'Breadcrumb',
        link: PATH.breadcrumb,
      },
      {
        id: 'about',
        icon: BadgeInfo,
        label: 'About',
        link: PATH.about.about,
      },
      {
        id: 'blog',
        icon: List,
        label: 'Blogs',
        link: PATH.blogs.blogCategory,
      },
      {
        id: 'faq',
        icon: HiOutlineQuestionMarkCircle,
        label: 'FAQs',
        link: PATH.faq,
      },
    ],
  },
  {
    title: 'Users & Communication',
    items: [
      {
        id: 'manage-user',
        icon: Users2,
        label: 'Users',
        link: PATH.user,
      },
      {
        id: 'testimonials',
        icon: MdOutlinePreview,
        label: 'Reviews',
        link: PATH.testimonials,
      },
      {
        id: 'contact-us',
        icon: Phone,
        label: 'Contact',
        link: PATH.contactUs,
      },
      {
        id: 'subscribers',
        icon: Users,
        label: 'Subscribers',
        link: PATH.subscribers,
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        id: 'settings',
        icon: IoSettingsOutline,
        label: 'Settings',
        link: PATH.settings.generalSettings,
      },
    ],
  },
];
