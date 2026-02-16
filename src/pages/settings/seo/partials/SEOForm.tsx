import InputFileWithPreview from '@/components/formField/InputFile';
import InputText from '@/components/formField/InputText';
import ReactSelect from '@/components/formField/ReactSelect';
import React from 'react';

const SEOForm: React.FC = () => {
  return (
    <div className="gap-x-6 gap-y-7 grid grid-cols-2 px-1">
      <ReactSelect
        required
        label="SEO For"
        name="seo_for"
        placeholder="Enter related page/entity"
        options={[
          { label: 'Dashboard', value: 'Dashboard' },
          { label: 'About Us', value: 'about-us' },
          { label: 'Contact', value: 'contact' },
          { label: 'Menu', value: 'menu' },
        ]}
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
        options={[
          { label: 'index, follow', value: 'index, follow' },
          { label: 'noindex, follow', value: 'noindex, follow' },
          { label: 'index, nofollow', value: 'index, nofollow' },
          { label: 'noindex, nofollow', value: 'noindex, nofollow' },
          {
            label: 'max-image-preview:large, index, follow',
            value: 'max-image-preview:large, index, follow',
          },
          {
            label: 'max-image-preview:large, noindex, follow',
            value: 'max-image-preview:large, noindex, follow',
          },
          {
            label: 'max-image-preview:large, index, nofollow',
            value: 'max-image-preview:large, index, nofollow',
          },
          {
            label: 'max-image-preview:large, noindex, nofollow',
            value: 'max-image-preview:large, noindex, nofollow',
          },
        ]}
        placeholder="Select Robots Option"
      />
    </div>
  );
};

export default SEOForm;
