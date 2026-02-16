import React, { useState } from 'react';
import { useCreatePackage } from '../hooks/useCreatePackage';
import Overview from '../components/Overview';
import InclusionExclusion from '../components/InclusionExclusion';
import MultiStepForm from '@/components/formField/MultiStepForm';
import Itinerary from '../components/Itinerary';
// import Attributes from '../components/Attributes';
import HighlightsNotice from '../components/HighlightsNotice';
import type { PackageValidationSchemaType } from '../schema/PackageSchema';
import { savePackageDraft } from '../hooks/packageDraft';
import Review from '../components/Review';

interface IProps {
  closeModal: () => void;
}

const CreatePackageModal: React.FC<IProps> = ({ closeModal }) => {
  const [step, setStep] = useState(0);

  const { formik, countryOptions, cityOptions, packageCategoryOptions, packageTypeOptions } =
    useCreatePackage({ closeModal, setStep });

  const handleStepChange = (nextStep: number) => {
    savePackageDraft({
      step: nextStep,
      values: formik.values,
    });

    setStep(nextStep);
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden h-[80vh]" style={{ scrollbarWidth: 'thin' }}>
      <MultiStepForm<PackageValidationSchemaType>
        formik={formik}
        currentStep={step}
        allowStepSkip
        onStepChange={handleStepChange}
        steps={[
          {
            content: (
              <Overview
                countryOptions={countryOptions}
                cityOptions={cityOptions}
                packageCategoryOptions={packageCategoryOptions}
                packageTypeOptions={packageTypeOptions}
              />
            ),
            id: 'overview',
            title: 'Basic Info',
          },
          { content: <HighlightsNotice />, id: 'highlights', title: 'Highlights/Notices' },
          {
            content: <InclusionExclusion />,
            id: 'inclusionExclusion',
            title: 'Inclusion/Exclusion',
          },
          { content: <Itinerary />, id: 'itinerary', title: 'Itinerary' },
          // { content: <Attributes />, id: 'attributes', title: 'Attributes' },
          {
            content: (
              <Review
                packageData={formik.values}
                countryOptions={countryOptions}
                cityOptions={cityOptions}
                packageTypeOptions={packageTypeOptions}
                packageCategoryOptions={packageCategoryOptions}
              />
            ),
            id: 'review',
            title: 'Review',
          },
        ]}
      />
    </div>
  );
};

export default CreatePackageModal;
