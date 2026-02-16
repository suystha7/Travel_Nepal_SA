import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';

interface Entry {
  title: string;
  description: string;
}

interface FormValues {
  highlights: Entry[];
  notices: Entry[];
}

const emptyEntry = (): Entry => ({ title: '', description: '' });

const sectionKeys: (keyof FormValues)[] = ['highlights', 'notices'];
const sectionLabels: Record<keyof FormValues, string> = {
  highlights: 'Highlights',
  notices: 'Notices',
};

const HighlightsNotice = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const [open, setOpen] = useState<Record<keyof FormValues, boolean[]>>({
    highlights: [],
    notices: [],
  });

  // Sync open state with current form values
  useEffect(() => {
    const nextOpen = {} as Record<keyof FormValues, boolean[]>;
    sectionKeys.forEach(section => {
      nextOpen[section] = values[section].map(() => true);
    });
    setOpen(nextOpen);
  }, [values]);

  const toggleEntry = (section: keyof FormValues, index: number) => {
    setOpen(prev => {
      const updated = { ...prev };
      updated[section] = updated[section].map((_, i) => i === index);
      return updated;
    });
  };

  const addEntry = (section: keyof FormValues) => {
    const newEntries = [...values[section], emptyEntry()];
    setFieldValue(section, newEntries);

    setOpen(prev => ({
      ...prev,
      [section]: newEntries.map((_, i) => i === newEntries.length - 1),
    }));
  };

  const removeEntry = (section: keyof FormValues, index: number) => {
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
                  className="w-full flex justify-between items-center p-4 bg-gray-50 border-b cursor-pointer text-left"
                >
                  <div>{entry.title || `${sectionLabels[section]} ${index + 1}`}</div>
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
                      label="Title"
                      name={`${section}.${index}.title`}
                      placeholder={`Enter ${sectionLabels[section]} title`}
                      required
                    />
                    <TextEditor
                      label={sectionLabels[section]}
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

export default HighlightsNotice;
