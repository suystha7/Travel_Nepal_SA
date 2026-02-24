export const Endpoints = {
  auth: {
    login: '/user/login',
    profile: {
      list: '/user/profile/',
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
    blogImageSeo: {
      list: '/blog-image-seo',
      create: '/blog-image-seo',
      update: '/blog-image-seo/:id',
      details: '/blog-image-seo/:id',
      delete: '/blog-image-seo/:id',
    },
    blogSeo: {
      list: '/blog-seo',
      create: '/blog-seo',
      update: '/blog-seo/:id',
      details: '/blog-seo/:id',
      delete: '/blog-seo/:id',
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
    packageSeo:{
      list: '/package-seo',
      create: '/package-seo',
      update: '/package-seo/:id',
      details: '/package-seo/:id',
      delete: '/package-seo/:id',
    },
    packageImageSeo:{
      list: '/package-image-seo',
      create: '/package-image-seo',
      update: '/package-image-seo/:id',
      details: '/package-image-seo/:id',
      delete: '/package-image-seo/:id',
    }
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
      list: '/social-media',
      create: '/social-media',
      delete: '/social-media/:id',
      update: '/social-media/:id',
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

  reviews: {
    list: '/review',
    update: '/review/:id',
    details: '/review/:id',
  },

  testimonials: {
    list: '/testimonial',
    create: '/testimonial',
    details: '/testimonial/:id',
    delete: '/testimonial/:id',
    update: '/testimonial/:id',
  },

  subscribers: {
    list: '/subscriber',
    details: '/subscriber/:id',
  },
};
