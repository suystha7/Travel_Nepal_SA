import InputFileWithPreview from '@/components/formField/InputFile';
import InputText from '@/components/formField/InputText';
import ReactSelect from '@/components/formField/ReactSelect';
import React from 'react';

const seoForOptions = [
  { label: 'Home', value: 'home' },
  { label: 'About Us', value: 'about-us' },
  { label: 'Contact Us', value: 'contact-us' },
  { label: 'Blog', value: 'blog' },
  { label: 'Reservation', value: 'reservation' },
  { label: 'Package', value: 'package' },
  { label: 'National Tour', value: 'national-tour' },
  { label: 'International Tour', value: 'international-tour' }, 
  { label: 'Privacy Policy', value: 'privacy-policy' },
  { label: 'Terms and Conditions', value: 'terms-and-conditions' },
];

const robotsOptions = [
  { label: 'index, follow', value: 'index, follow' },
  { label: 'noindex, follow', value: 'noindex, follow' },
  { label: 'index, nofollow', value: 'index, nofollow' },
  { label: 'noindex, nofollow', value: 'noindex, nofollow' },
  { label: 'max-image-preview:large', value: 'max-image-preview:large' },
  {
    label: 'index, follow, max-image-preview:large',
    value: 'index, follow, max-image-preview:large',
  },
  {
    label: 'noindex, follow, max-image-preview:large',
    value: 'noindex, follow, max-image-preview:large',
  },
  {
    label: 'index, nofollow, max-image-preview:large',
    value: 'index, nofollow, max-image-preview:large',
  },
  {
    label: 'noindex, nofollow, max-image-preview:large',
    value: 'noindex, nofollow, max-image-preview:large',
  },
];

const SEOForm: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-7 px-1">
      <ReactSelect
        required
        label="SEO For"
        name="seo_for"
        placeholder="Select page/entity"
        options={seoForOptions}
      />

      <InputText required label="Meta Title" name="meta_title" placeholder="Enter Meta Title" />
      <InputText
        required
        label="Meta Description"
        name="meta_description"
        placeholder="Enter Meta Description"
      />
      <InputText required label="OG Title" name="og_title" placeholder="Enter Open Graph Title" />
      <InputText
        required
        label="OG Description"
        name="og_description"
        placeholder="Enter Open Graph Description"
      />
      <InputFileWithPreview label="OG Image" name="og_image" />
      <InputText required label="OG URL" name="og_url" placeholder="Enter Open Graph URL" />
      <InputText
        required
        label="Canonical URL"
        name="canonical_url"
        placeholder="Enter Canonical URL"
      />

      <ReactSelect
        label="Robots"
        name="robots"
        options={robotsOptions}
        placeholder="Select Robots Option"
      />
    </div>
  );
};

export default SEOForm;
