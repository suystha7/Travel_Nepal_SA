import { useState, useEffect } from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { ChevronDown, ChevronUp, X, Plus } from 'lucide-react';
import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';
import { v4 as uuidv4 } from 'uuid';

interface Entry {
  id?: string;
  title: string;
  description: string;
}

interface ItineraryItem {
  id?: string;
  day: string | number;
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

const createEmptyEntry = (): Entry => ({
  id: uuidv4(),
  title: '',
  description: '',
});

const createEmptyDay = (index: number): ItineraryItem => ({
  id: uuidv4(),
  day: index + 1,
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

  const itinerary = values?.itinerary || [];

  useEffect(() => {
    const initialState: Record<string, boolean> = {};

    itinerary.forEach((day, dayIdx) => {
      SECTION_KEYS.forEach(section => {
        if (day?.[section]?.length) {
          const key = `${dayIdx}-${section}-0`;
          initialState[key] = true;
        }
      });
    });

    setOpenNested(prev => ({ ...initialState, ...prev }));
  }, [itinerary]);

  const toggleDay = (index: number) => {
    setOpenDays(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleNested = (dayIdx: number, section: string, entryIdx: number) => {
    const key = `${dayIdx}-${section}-${entryIdx}`;
    setOpenNested(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6 my-16">
      <FieldArray name="itinerary">
        {({ push, remove }) => (
          <>
            {itinerary.map((dayItem, dayIdx) => (
              <div
                key={dayItem.id || dayIdx}
                className="border rounded-lg bg-white overflow-hidden shadow-sm"
              >
                <div
                  className="flex justify-between items-center p-4 bg-gray-50 border-b cursor-pointer"
                  onClick={() => toggleDay(dayIdx)}
                >
                  <span className="font-bold text-lg text-gray-800">
                    Day {dayItem?.day}: {dayItem?.title || 'Untitled Day'}
                  </span>
                  <div className="flex items-center gap-4">
                    {openDays[dayIdx] ? <ChevronUp /> : <ChevronDown />}
                    {itinerary.length > 1 && (
                      <X
                        className="text-red-500 hover:scale-110 cursor-pointer"
                        onClick={e => {
                          e.stopPropagation();
                          remove(dayIdx);
                        }}
                      />
                    )}
                  </div>
                </div>

                {openDays[dayIdx] && (
                  <div className="p-4 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputText label="Day Number" name={`itinerary.${dayIdx}.day`} />
                      <InputText label="Day Title" name={`itinerary.${dayIdx}.title`} />
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                      {SECTION_KEYS.map(section => {
                        const entries = dayItem?.[section] || [];
                        return (
                          <div key={section} className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-primary-600 border-b pb-1">
                              {section}
                            </h4>

                            <FieldArray name={`itinerary.${dayIdx}.${section}`}>
                              {({ push: pushNested, remove: removeNested }) => (
                                <div className="space-y-3">
                                  {entries.map((entry, entryIdx) => {
                                    const nestedKey = `${dayIdx}-${section}-${entryIdx}`;
                                    return (
                                      <div key={entry.id || entryIdx} className="border rounded-md">
                                        <div
                                          className="flex justify-between p-3 bg-gray-50/50 cursor-pointer"
                                          onClick={() =>
                                            toggleNested(dayIdx, section, entryIdx)
                                          }
                                        >
                                          <span className="text-sm font-medium">
                                            {entry?.title || `New ${section}...`}
                                          </span>
                                          <div className="flex gap-2">
                                            {openNested[nestedKey] ? (
                                              <ChevronUp size={16} />
                                            ) : (
                                              <ChevronDown size={16} />
                                            )}
                                            <X
                                              size={16}
                                              className="text-red-400"
                                              onClick={e => {
                                                e.stopPropagation();
                                                removeNested(entryIdx);
                                              }}
                                            />
                                          </div>
                                        </div>

                                        {openNested[nestedKey] && (
                                          <div className="p-4 border-t space-y-4">
                                            <InputText
                                              label="Title"
                                              name={`itinerary.${dayIdx}.${section}.${entryIdx}.title`}
                                            />
                                            <TextEditor
                                              label="Description"
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
                                      const newIndex = entries.length;
                                      pushNested(createEmptyEntry());

                                      const key = `${dayIdx}-${section}-${newIndex}`;
                                      setOpenNested(prev => ({
                                        ...prev,
                                        [key]: true,
                                      }));
                                    }}
                                    className="text-sm font-bold text-primary-500 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Plus size={14} /> Add {section}
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        );
                      })}
                    </div>

                    <div>
                      <TextEditor
                        label="Overall Day Description"
                        name={`itinerary.${dayIdx}.description`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => push(createEmptyDay(itinerary.length))}
              className="w-full p-4 border-2 border-dashed rounded-lg text-gray-400 hover:text-primary-500 hover:border-primary-500 font-bold flex justify-center items-center gap-2"
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