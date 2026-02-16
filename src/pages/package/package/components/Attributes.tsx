import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';

interface Entry {
  day: string;
  title: string;
  description: string;
}

interface FormValues {
  activities: Entry[];
  accommodations: Entry[];
  meals: Entry[];
}

type SectionKey = keyof FormValues;

const emptyEntry = (): Entry => ({
  day: '',
  title: '',
  description: '',
});

const sectionKeys: SectionKey[] = ['activities', 'accommodations', 'meals'];

const sectionLabels: Record<SectionKey, string> = {
  activities: 'Activities',
  accommodations: 'Accommodations',
  meals: 'Meals',
};

const Attributes = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  const [open, setOpen] = useState<Record<SectionKey, boolean[]>>({
    activities: [],
    accommodations: [],
    meals: [],
  });

  useEffect(() => {
    const nextOpen = {} as Record<SectionKey, boolean[]>;
    sectionKeys.forEach(section => {
      nextOpen[section] = values[section].map(() => true);
    });
    setOpen(nextOpen);
  }, [values]);

  const toggleEntry = (section: SectionKey, index: number) => {
    setOpen(prev => {
      const updated = { ...prev };
      updated[section] = updated[section].map((_, i) => i === index);
      return updated;
    });
  };

  const addEntry = (section: SectionKey) => {
    const newEntries = [...values[section], emptyEntry()];
    setFieldValue(section, newEntries);

    setOpen(prev => ({
      ...prev,
      [section]: newEntries.map((_, i) => i === newEntries.length - 1),
    }));
  };

  const removeEntry = (section: SectionKey, index: number) => {
    if (values[section].length === 1) return;

    const newEntries = values[section].filter((_, i) => i !== index);
    setFieldValue(section, newEntries);

    setOpen(prev => {
      const updated = { ...prev };
      updated[section] = updated[section].filter((_, i) => i !== index);
      if (!updated[section].some(Boolean)) updated[section][0] = true;
      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-5 my-16">
      {sectionKeys.map(section => (
        <div key={section} className="border rounded-md bg-white overflow-hidden">
          <div className="p-4 font-medium bg-gray-50 border-b">{sectionLabels[section]}</div>

          <div className="p-4 flex flex-col gap-4">
            {values[section].map((entry, index) => (
              <div key={index} className="border rounded-md relative overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleEntry(section, index)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 border-b text-left"
                >
                  <div>{entry.title || `Day ${entry.day || index + 1}`}</div>
                  {open[section]?.[index] ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {open[section]?.[index] && (
                  <div className="p-4 flex flex-col gap-4 relative">
                    {index > 0 && (
                      <X
                        className="absolute -top-14 right-1 w-5 h-5 text-red-600 cursor-pointer"
                        onClick={() => removeEntry(section, index)}
                      />
                    )}

                    <InputText
                      label="Day"
                      name={`${section}.${index}.day`}
                      placeholder="1"
                      required
                    />

                    <InputText
                      label="Title"
                      name={`${section}.${index}.title`}
                      placeholder={`Enter ${sectionLabels[section]} title`}
                      required
                    />

                    <TextEditor
                      label="Description"
                      name={`${section}.${index}.description`}
                      minHeight="200px"
                      required
                    />
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => addEntry(section)}
              className="px-4 py-2 bg-primary-500 text-white rounded-md w-fit cursor-pointer"
            >
              + Add {sectionLabels[section]}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Attributes;
