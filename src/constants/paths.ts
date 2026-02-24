export const PATH = {
  login: '/login',
  dashboard: '/',
  user: '/user',
  location: {
    location: '/location',
    country: '/location/country',
    city: '/location/city',
  },
  accountSettings: {
    changePassword: '/account-settings/change-password',
    resetPassword: '/account-settings/reset-password',
    profile: '/account-settings',
  },
  seo: '/seo',
  breadcrumb: '/breadcrumb',
  auth: '/auth',
  faq: '/faq',
  packages: {
    packages: '/packages',
    packageType: '/packages/packages-type',
    packageCategory: '/packages/packages-category',
    packageGallery: '/packages/packages-gallery',
    packageVideo: '/packages/packages-video',
    packageSeo: '/packages/packages-seo',
    packageImageSeo: '/packages/packages-image-seo',

  },
  booking: '/booking',
  blogs: {
    blog: '/blogs',
    blogCategory: '/blogs/blog-category',
    blogImage: '/blogs/blog-image',
    blogImageSeo: '/blogs/blog-image-seo',
    blogSeo: '/blogs/blog-seo',
  },
  contactUs: '/contact-us',
  reviews: '/review',
  testimonials: '/testimonial',
  subscribers: '/subscribers',
  about: {
    about: '/about',
    stats: '/about/stats',
    whoWeAre: '/about/who-we-are',
    team: '/about/team',
    missionVision: "/about/mission-vision",
    whyUs: "/about/why-us"
  },
  reservation: '/reservation',
  settings: {
    settings: '/settings',
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
