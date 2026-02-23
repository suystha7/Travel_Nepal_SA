export const Endpoints = {
  auth: {
    login: '/user/login',
    profile: {
      list: '/user/profile/:id',
      details: '/user/profile/:id',
      update: '/user/profile-update',
    },
    resetPassword: '/user/reset-password',
    changePassword: '/user/change-password',
  },

  location: {
    country: {
      list: '/country',
      create: '/country',
      update: '/country/:id',
      details: '/country/:id',
      delete: '/country/:id',
    },

    city: {
      list: '/city',
      create: '/city',
      update: '/city/:id',
      details: '/city/:id',
      delete: '/city/:id',
    },
  },

  aboutUs: {
    about: {
      list: '/about-us',
      create: '/about-us',
      update: '/about-us/:id',
      details: '/about-us/:id',
      delete: '/about-us/:id',
    },
    stats: {
      list: '/stats',
      create: '/stats',
      update: '/stats/:id',
      details: '/stats/:id',
      delete: '/stats/:id',
    },
    whoWeAre: {
      list: '/who-we-are',
      create: '/who-we-are',
      update: '/who-we-are/:id',
      details: '/who-we-are/:id',
      delete: '/who-we-are/:id',
    },
    missionVision: {
      list: '/mission-vision',
      create: '/mission-vision',
      update: '/mission-vision/:id',
      details: '/mission-vision/:id',
      delete: '/mission-vision/:id',
    },
    whyUs: {
      list: '/why-us',
      create: '/why-us',
      update: '/why-us/:id',
      details: '/why-us/:id',
      delete: '/why-us/:id',
    },
    team: {
      list: '/team',
      create: '/team',
      update: '/team/:id',
      details: '/team/:id',
      delete: '/team/:id',
    },
  },

  breadcrumb: {
    list: '/breadcrumb',
    create: '/breadcrumb',
    update: '/breadcrumb/:id',
    details: '/breadcrumb/:id',
    delete: '/breadcrumb/:id',
  },

  user: {
    list: '/user/',
    create: '/user/register',
    update: '/user/update/:id',
    details: '/user/profile/:id',
    delete: '/user/:id',
  },

  blogs: {
    blogCategory: {
      list: '/blog-category',
      create: '/blog-category',
      update: '/blog-category/:id',
      details: '/blog-category/:id',
      delete: '/blog-category/:id',
    },
    blog: {
      list: '/blog',
      create: '/blog',
      update: '/blog/:id',
      details: '/blog/:id',
      delete: '/blog/:id',
    },
    blogImage: {
      list: '/blog-image',
      create: '/blog-image',
      update: '/blog-image/:id',
      details: '/blog-image/:id',
      delete: '/blog-image/:id',
    },
  },

  packages: {
    package: {
      list: '/package',
      create: '/package',
      update: '/package/:id',
      details: '/package/:id',
      delete: '/package/:id',
    },
    packageType: {
      list: '/package-type',
      create: '/package-type',
      update: '/package-type/:id',
      details: '/package-type/:id',
      delete: '/package-type/:id',
    },
    packageCategory: {
      list: '/package-category',
      create: '/package-category',
      update: '/package-category/:id',
      details: '/package-category/:id',
      delete: '/package-category/:id',
    },
    packageInclusion: {
      list: '/package-inclusion',
      create: '/package-inclusion',
      update: '/package-inclusion/:id',
      details: '/package-inclusion/:id',
      delete: '/package-inclusion/:id',
    },
    packageExclusion: {
      list: '/package-exclusion',
      create: '/package-exclusion',
      update: '/package-exclusion/:id',
      details: '/package-exclusion/:id',
      delete: '/package-exclusion/:id',
    },
    packageNotice: {
      list: '/package-notice',
      create: '/package-notice',
      update: '/package-notice/:id',
      details: '/package-notice/:id',
      delete: '/package-notice/:id',
    },
    packageHighlight: {
      list: '/package-highlight',
      create: '/package-highlight',
      update: '/package-highlight/:id',
      details: '/package-highlight/:id',
      delete: '/package-highlight/:id',
    },
    packageItinerary: {
      list: '/package-itinerary',
      create: '/package-itinerary',
      update: '/package-itinerary/:id',
      details: '/package-itinerary/:id',
      delete: '/package-itinerary/:id',
    },
    packageAccommodation: {
      list: '/package-accommodation',
      create: '/package-accommodation',
      update: '/package-accommodation/:id',
      details: '/package-accommodation/:id',
      delete: '/package-accommodation/:id',
    },
    packageMeals: {
      list: '/package-meals',
      create: '/package-meals',
      update: '/package-meals/:id',
      details: '/package-meals/:id',
      delete: '/package-meals/:id',
    },
    packageGallery: {
      list: '/image-gallery',
      create: '/image-gallery',
      update: '/image-gallery/:id',
      details: '/image-gallery/:id',
      delete: '/image-gallery/:id',
    },
    packageVideo: {
      list: '/package-video',
      create: '/package-video',
      update: '/package-video/:id',
      details: '/package-video/:id',
      delete: '/package-video/:id',
    },
    packageActivities: {
      list: '/package-activities',
      create: '/package-activities',
      update: '/package-activities/:id',
      details: '/package-activities/:id',
      delete: '/package-activities/:id',
    },
  },

  booking: {
    list: '/booking',
    create: '/booking',
    update: '/booking/:id',
    details: '/booking/:id',
    delete: '/booking/:id',
  },

  settings: {
    organizationSettings: {
      list: '/organization',
      create: '/organization',
      update: '/organization/:id',
      delete: '/organization/:id',
      details: '/organization/:id',
    },
    socialMedia: {
      // socialMedia: '/social-media',
      list: '/social-media',
      delete: '/social-media/:id',
      update: '/social-media/:id',
      create: '/social-media',
      details: '/social-media/:id',
    },
    policy: {
      list: '/policy',
      create: '/policy',
      update: '/policy/:id',
      details: '/policy/:id',
      delete: '/policy/:id',
    },
    seo: {
      list: '/static-seo',
      update: '/static-seo/:id',
      details: '/static-seo/:id',
      delete: '/static-seo/:id',
      create: '/static-seo',
    },
  },

  faq: {
    list: '/faq',
    create: '/faq',
    update: '/faq/:id',
    details: '/faq/:id',
    delete: '/faq/:id',
  },

  contactUs: {
    list: '/contact',
    details: '/contact/:id',
  },

  reservation: {
    list: '/reservation',
    create: '/reservation',
    update: '/reservation/:id',
    details: '/reservation/:id',
    delete: '/reservation/:id',
  },

  testimonial: {
    list: '/testimonial',
    create: '/testimonial',
    update: '/testimonial/:id',
    details: '/testimonial/:id',
    delete: '/testimonial/:id',
  },

  subscribers: {
    list: '/subscriber',
    details: '/subscriber/id',
  },
};
