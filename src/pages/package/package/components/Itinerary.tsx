import { useState } from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { ChevronDown, ChevronUp, X, Plus } from 'lucide-react';
import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';

interface Entry {
  title: string;
  description: string;
}

interface ItineraryItem {
  day: string;
  title: string;
  description: string;
  activities: Entry[];
  accommodations: Entry[];
  meals: Entry[];
}

interface FormValues {
  itinerary: ItineraryItem[];
}

const SECTION_KEYS = ['activities', 'accommodations', 'meals'] as const;

const createEmptyEntry = (): Entry => ({ title: '', description: '' });

const createEmptyDay = (): ItineraryItem => ({
  day: '',
  title: '',
  description: '',
  activities: [createEmptyEntry()],
  accommodations: [createEmptyEntry()],
  meals: [createEmptyEntry()],
});

const Itinerary = () => {
  const { values } = useFormikContext<FormValues>();
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({ 0: true });
  const [openNested, setOpenNested] = useState<Record<string, boolean>>({});

  const toggleDay = (index: number) => {
    setOpenDays(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleNested = (dayIdx: number, section: string, entryIdx: number) => {
    const key = `${dayIdx}-${section}-${entryIdx}`;
    setOpenNested(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col gap-6 my-16">
      <FieldArray name="itinerary">
        {({ push, remove }) => (
          <>
            {values.itinerary?.map((dayItem, dayIdx) => (
              <div key={dayIdx} className="border rounded-lg bg-white overflow-hidden">
                <div
                  className="flex justify-between items-center p-4 bg-gray-50 border-b cursor-pointer select-none"
                  onClick={() => toggleDay(dayIdx)}
                >
                  <span className="font-bold text-lg text-gray-800">
                    Day {dayItem.day || dayIdx + 1}: {dayItem.title || ''}
                  </span>
                  <div className="flex items-center gap-4">
                    {openDays[dayIdx] ? <ChevronUp /> : <ChevronDown />}
                    {values.itinerary.length > 1 && (
                      <X
                        className="text-red-500 hover:scale-110 transition-transform cursor-pointer"
                        onClick={e => {
                          e.stopPropagation();
                          remove(dayIdx);
                        }}
                      />
                    )}
                  </div>
                </div>

                {openDays[dayIdx] && (
                  <div className="p-6 space-y-8 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputText
                        label="Day"
                        name={`itinerary.${dayIdx}.day`}
                        placeholder="1"
                      />
                      <InputText
                        label="Title"
                        required
                        name={`itinerary.${dayIdx}.title`}
                        placeholder="Arrival & Check-in"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                      {SECTION_KEYS.map(section => (
                        <div key={section} className="space-y-4">
                          <div className="flex items-center justify-between border-b pb-1">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary-600">
                              {section}
                            </h4>
                          </div>

                          <FieldArray name={`itinerary.${dayIdx}.${section}`}>
                            {({ push: pushNested, remove: removeNested }) => (
                              <div className="space-y-3">
                                {dayItem[section]?.map((entry, entryIdx) => {
                                  const nestedKey = `${dayIdx}-${section}-${entryIdx}`;
                                  const isNestedOpen = !!openNested[nestedKey];

                                  return (
                                    <div
                                      key={entryIdx}
                                      className="border rounded-md bg-white overflow-hidden shadow-sm"
                                    >
                                      <div
                                        className="flex justify-between items-center p-3 bg-gray-50/50 cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => toggleNested(dayIdx, section, entryIdx)}
                                      >
                                        <span className="text-sm font-medium text-gray-700">
                                          {entry.title || `Edit ${section.slice(0, -1)}...`}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          {isNestedOpen ? (
                                            <ChevronUp size={16} />
                                          ) : (
                                            <ChevronDown size={16} />
                                          )}
                                          {dayItem[section].length > 1 && (
                                            <X
                                              size={16}
                                              className="text-red-400 hover:text-red-600 cursor-pointer"
                                              onClick={e => {
                                                e.stopPropagation();
                                                removeNested(entryIdx);
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>

                                      {isNestedOpen && (
                                        <div className="p-4 border-t space-y-4 bg-white animate-in zoom-in-95 duration-150">
                                          <InputText
                                            label="Item Title"
                                            name={`itinerary.${dayIdx}.${section}.${entryIdx}.title`}
                                            placeholder="e.g. Breakfast at Hotel"
                                          />
                                          <TextEditor
                                            label="Details"
                                            name={`itinerary.${dayIdx}.${section}.${entryIdx}.description`}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}

                                <button
                                  type="button"
                                  onClick={() => {
                                    pushNested(createEmptyEntry());
                                    setOpenNested(prev => ({
                                      ...prev,
                                      [`${dayIdx}-${section}-${dayItem[section].length}`]: true,
                                    }));
                                  }}
                                  className="flex items-center gap-1 text-sm font-bold cursor-pointer text-primary-500 hover:text-primary-700 transition-colors"
                                >
                                  <Plus size={14} /> Add {section}
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <TextEditor
                        label="Description"
                        name={`itinerary.${dayIdx}.description`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                push(createEmptyDay());
                setOpenDays(prev => ({ ...prev, [values.itinerary?.length || 0]: true }));
              }}
              className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed cursor-pointer border-gray-300 rounded-lg text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-all font-bold hover:bg-primary-50/20"
            >
              <Plus /> Add Itinerary Day
            </button>
          </>
        )}
      </FieldArray>
    </div>
  );
};

export default Itinerary;