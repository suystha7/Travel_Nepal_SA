import type { IOption } from '@/types/common';
import type { PackageValidationSchemaType } from '../schema/PackageSchema';
import { Check, X } from 'lucide-react';

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
  if (!packageData)
    return <div className="p-10 text-center font-medium">Loading package preview...</div>;

  const getLabel = (options: IOption[], value?: string) =>
    options.find(opt => opt.value === value)?.label || value || '-';

  const getMultiLabels = (options: IOption[], values?: string[]) => {
    if (!values || values.length === 0) return '-';
    return values.map(v => options.find(opt => opt.value === v)?.label || v).join(', ');
  };

  const renderHTML = (html?: string) => (
    <div
      className="prose prose-sm max-w-none text-gray-600"
      dangerouslySetInnerHTML={{ __html: html || '-' }}
    />
  );

  const DataSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border border-gray-100 rounded-xl p-6 bg-white">
      <h3 className="text-lg font-bold text-primary-500 mb-6 border-b pb-2">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 my-14">
      <DataSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <InfoItem label="Package Name" value={packageData.name} />
            <InfoItem
              label="Package Type"
              value={getLabel(packageTypeOptions, packageData.package_type_id)}
            />
            <InfoItem
              label="Category"
              value={getLabel(packageCategoryOptions, packageData.category_id)}
            />
            <InfoItem label="Country" value={getLabel(countryOptions, packageData.country_id)} />
            <InfoItem label="Cities" value={getMultiLabels(cityOptions, packageData.city_id)} />
          </div>
          <div className="space-y-4">
            <InfoItem label="Duration" value={packageData.duration} />
            <InfoItem label="Destination" value={packageData.destination} />
            <InfoItem label="Start Point" value={packageData.start_point} />
            <InfoItem label="End Point" value={packageData.end_point} />
            <InfoItem label="Group Size" value={packageData.group_size} />
          </div>
          <div className="space-y-4">
            <InfoItem
              label="Current Price"
              value={packageData.current_price}
              className="text-primary-600 font-bold"
            />
            <InfoItem
              label="Previous Price"
              value={packageData.previous_price}
              className="line-through text-gray-400"
            />
            <InfoItem label="Max Altitude" value={packageData.max_altitude} />
            <InfoItem
              label="Top Tour"
              value={
                packageData.is_top_tour ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-red-500" />
                )
              }
            />
            <InfoItem
              label="Top Deals"
              value={
                packageData.is_top_deals ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-red-500" />
                )
              }
            />
          </div>
        </div>
      </DataSection>

      <DataSection title="Package Description & Details">
        <div className="space-y-8">
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Description</h4>
            {renderHTML(packageData.description)}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ListDisplay title="Highlights" items={packageData.highlights} />
            <ListDisplay title="Inclusions" items={packageData.inclusions} />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ListDisplay title="Exclusions" items={packageData.exclusions} />
            <ListDisplay title="Notices/Important Info" items={packageData.notices} />
          </div>
        </div>
      </DataSection>

      <DataSection title="Itinerary Schedule">
        <div className="space-y-4">
          {packageData.itinerary?.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-primary-500 text-white rounded-lg flex flex-col items-center justify-center shadow-sm">
                <span className="text-xs uppercase font-bold">Day</span>
                <span className="text-xl font-black">{item.day || index + 1}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg mb-1">
                  {item.title || 'Untitled Activity'}
                </h4>
                {renderHTML(item.description)}
              </div>
            </div>
          ))}
        </div>
      </DataSection>

      <DataSection title="Policies & Legal">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Cancellation Policy</h4>
            {renderHTML(packageData.cancellation_policy)}
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Payment Policy</h4>
            {renderHTML(packageData.payment_policy)}
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Terms & Conditions</h4>
            {renderHTML(packageData.terms_conditions)}
          </div>
        </div>
      </DataSection>
    </div>
  );
};

const InfoItem = ({
  label,
  value,
  className = '',
}: {
  label: string;
  value?: any;
  className?: string;
}) => (
  <div>
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className={`text-sm text-gray-700 ${className}`}>{value || '-'}</p>
  </div>
);

const ListDisplay = ({ title, items }: { title: string; items?: any[] }) => (
  <div>
    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
      {title}
    </h4>
    <ul className="space-y-3">
      {items?.map((item, idx) => (
        <li key={idx} className="bg-gray-50/50 p-3 rounded-md border border-gray-100">
          {item.title && <p className="font-bold text-sm text-gray-800 mb-1">{item.title}</p>}
          <div
            className="prose prose-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: item.description || '' }}
          />
        </li>
      ))}
      {(!items || items.length === 0) && (
        <p className="text-gray-400 text-sm italic">No items listed</p>
      )}
    </ul>
  </div>
);

export default Review;
