export const PATH = {
  login: '/login',
  dashboard: '/',
  user: '/user',
  location: {
    country: '/location/country',
    city: '/location/city',
  },
  accountSettings: {
    changePassword: '/account-settings/change-password',
    resetPassword: '/account-settings/reset-password',
    profile: '/account-settings/profile',
  },
  seo: '/seo',
  breadcrumb: '/breadcrumb',
  auth: '/auth',
  faq: '/faq',
  packages: {
    packageOverview: '/packages/packages-overview',
    packageType: '/packages/packages-type',
    packageCategory: '/packages/packages-category',
    packageGallery: '/packages/packages-gallery',
    packageVideo: '/packages/packages-video',
  },
  booking: '/booking',
  blogs: {
    blogCategory: '/blogs/blog-category',
    blog: '/blogs/blog',
    blogImage: '/blogs/blog-image',
  },
  contactUs: '/contact-us',
  testimonials: '/review',
  subscribers: '/subscribers',
  about: {
    about: '/about/about-us',
    stats: '/about/stats',
    whoWeAre: '/about/who-we-are',
    team: '/about/team',
    missionVision: "/about/mission-vision",
    whyUs: "/about/why-us"
  },
  reservation: '/reservation',
  settings: {
    generalSettings: '/settings/general-settings',
    policy: '/settings/policy',
    socialMedia: '/settings/social-media',
    seo: '/settings/seo',
  },
};

export const COOKIE_CONFIG = {
  accessToken: 'access',
  refreshToken: 'refresh',
  user_id: 'user_id',
  accessTokenExpiryDuration: 86400,
  refreshTokenExpiryDuration: 7 * 86400,
};
