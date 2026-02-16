import type { IOption } from '@/types/common';
import type { PackageValidationSchemaType } from '../schema/PackageSchema';

interface IProps {
  packageData: PackageValidationSchemaType;
  countryOptions?: IOption[];
  cityOptions?: IOption[];
  packageTypeOptions?: IOption[];
  packageCategoryOptions?: IOption[];
}

const Review = ({
  packageData,
  countryOptions = [],
  cityOptions = [],
  packageTypeOptions = [],
  packageCategoryOptions = [],
}: IProps) => {
  if (!packageData) return <p>Loading...</p>;

  const getLabel = (options: IOption[], value?: string) =>
    options.find(opt => opt.value === value)?.label || value || '-';

  const getMultiLabels = (options: IOption[], values?: string[]) =>
    values?.map(v => options.find(opt => opt.value === v)?.label || v).join(', ');

  const renderDataAsList = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const text = Array.from(tempDiv.querySelectorAll('p'))
      .map(p => p.innerHTML)
      .join('<br>');

    const items = text
      .split('<br>')
      .map(i => i.trim())
      .filter(Boolean);

    return (
      <ul className="list-disc ml-5">
        {items.map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-8 bg-white my-12">
      <section className="border rounded-md p-4">
        <h3 className="font-semibold text-xl mb-4 text-primary-400">Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-base">
          {/* COLUMN 1 */}
          <div className="space-y-2 mb-1">
            <p>
              <strong>Package Name:</strong> {packageData.name}
            </p>
            <p>
              <strong>Package Type:</strong>{' '}
              {getLabel(packageTypeOptions, packageData.package_type_id)}
            </p>
            <p>
              <strong>Category:</strong> {getLabel(packageCategoryOptions, packageData.category_id)}
            </p>
            <p>
              <strong>Country:</strong> {getLabel(countryOptions, packageData.country_id)}
            </p>
            <p>
              <strong>Cities:</strong> {getMultiLabels(cityOptions, packageData.city_id)}
            </p>
            <p>
              <strong>Destination:</strong> {packageData.destination}
            </p>
            <p>
              <strong>Duration:</strong> {packageData.duration}
            </p>
            <p>
              <strong>Start Point:</strong> {packageData.start_point}
            </p>
            <p>
              <strong>End Point:</strong> {packageData.end_point}
            </p>
          </div>

          <div className="space-y-2 mb-1">
            <p>
              <strong>Previous Price:</strong> {packageData.previous_price}
            </p>
            <p>
              <strong>Current Price:</strong> {packageData.current_price}
            </p>
            <p>
              <strong>Top Tour:</strong> {packageData.is_top_tour ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Top Deals:</strong> {packageData.is_top_deals ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Group Size:</strong> {packageData.group_size}
            </p>
            <p>
              <strong>Max Altitude:</strong> {packageData.max_altitude}
            </p>
            <p className="capitalize">
              <strong>Months:</strong>{' '}
              {packageData.availability_month
                ?.map(m => (m && typeof m === 'string' ? m : (m as any)?.name))
                .join(', ')}
            </p>
            <p>
              <strong>Start Date:</strong> {packageData.start_date}
            </p>
            <p>
              <strong>End Date:</strong> {packageData.end_date}
            </p>
          </div>
        </div>

        <div className="mt-4">
          {packageData.image ? (
            <img
              src={String(packageData?.image) || undefined}
              alt="Package"
              className="max-h-80 max-w-full rounded-md"
            />
          ) : (
            <p>No image uploaded</p>
          )}
        </div>
      </section>

      <section className="border rounded-md p-4">
        <h3 className="font-semibold text-xl mb-4 text-primary-400">Package Details</h3>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-1">Description:</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: packageData.description }}
            />
          </div>

          <div>
            <h3 className="font-semibold mb-1">Cancellation Policy:</h3>
            {renderDataAsList(packageData.cancellation_policy)}
          </div>

          <div>
            <h3 className="font-semibold mb-1">Payment Policy:</h3>
            {renderDataAsList(packageData.payment_policy)}
          </div>

          <div>
            <h3 className="font-semibold mb-1">Terms & Conditions:</h3>
            {renderDataAsList(packageData.terms_conditions)}
          </div>

          <div>
            <h3 className="font-semibold mb-1">Highlights:</h3>
            <ul className="list-disc ml-5 space-y-1">
              {packageData.highlights?.map(item => (
                <li
                  key={item.title}
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Notices:</h3>
            <ul className="list-disc ml-5 space-y-1">
              {packageData.notices?.map(item => (
                <li
                  key={item.title}
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Inclusions:</h3>
            <ul className="list-disc ml-5 space-y-1">
              {packageData.inclusions?.map(item => (
                <li
                  key={item.title}
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Exclusions:</h3>
            <ul className="list-disc ml-5 space-y-1">
              {packageData.exclusions?.map(item => (
                <li
                  key={item.title}
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Itinerary:</h3>
            <ul className="list-disc ml-5 space-y-1">
              {packageData.itinerary?.map(item => (
                <li
                  key={item.title}
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Review;
