import React, { useState } from 'react';
import Overview from '../components/Overview';
import InclusionExclusion from '../components/InclusionExclusion';
import MultiStepForm from '@/components/formField/MultiStepForm';
import Itinerary from '../components/Itinerary';
// import Attributes from '../components/Attributes';
import HighlightsNotice from '../components/HighlightsNotice';
import type { PackageValidationSchemaType } from '../schema/PackageSchema';
import { useUpdatePackage } from '../hooks/useUpdatePackage';
import Review from '../components/Review';

interface IProps {
  closeModal: () => void;
  updateId: string;
}

const UpdatePackageModal: React.FC<IProps> = ({ closeModal, updateId }) => {
  const [step, setStep] = useState(0);

  const {
    formik,
    countryOptions,
    cityOptions,
    packageCategoryOptions,
    packageTypeOptions,
    isLoading,
  } = useUpdatePackage({
    closeModal,
    updateId,
  });

  console.log(formik.values,"Fromik Values");
  return (
    <div className="overflow-y-auto overflow-x-hidden h-[80vh]" style={{ scrollbarWidth: 'thin' }}>
      <MultiStepForm<PackageValidationSchemaType>
        formik={formik}
        isSubmitting={isLoading || formik.isSubmitting}
        currentStep={step}
        allowStepSkip={true}
        onStepChange={nextStep => setStep(nextStep)}
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
          { content: <Itinerary />, id: 'itinerary', title: 'Itinerary' },
          {
            content: <InclusionExclusion />,
            id: 'inclusionExclusion',
            title: 'Inclusion/Exclusion',
          },
          { content: <HighlightsNotice />, id: 'highlights', title: 'Highlights/Notices' },
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

export default UpdatePackageModal;
