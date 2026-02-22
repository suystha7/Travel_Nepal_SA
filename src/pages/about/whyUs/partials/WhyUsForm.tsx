import React from 'react';
import { Form, useFormikContext, FieldArray } from 'formik';
import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';
import { FaTrash, FaPlus } from 'react-icons/fa';

interface ListItem {
  title: string;
  ordering: number;
  description: string;
}

interface WhyUsFormValues {
  heading: string;
  sub_heading: string;
  listItems: ListItem[];
}

const WhyUsForm: React.FC<{ isUpdate: boolean }> = ({ isUpdate }) => {
  const { handleSubmit, values } = useFormikContext<WhyUsFormValues>();

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-white container-shadow mt-4 rounded-md px-6 py-5 overflow-auto"
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-7">
        <InputText label="Heading" name="heading" placeholder="Why Choose Us?" required />
      </div>

      <TextEditor label="Sub Heading" name="sub_heading" required />

      <FieldArray name="listItems">
        {({ push, remove }) => (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-gray-700">Ordering & Highlights</h3>
              <button
                type="button"
                onClick={() =>
                  push({
                    title: '',
                    ordering: (values.listItems?.length || 0) + 1,
                    description: '',
                  })
                }
                className="flex items-center gap-2 text-xs bg-primary-600 text-white px-3 py-2 rounded hover:bg-primary-700 transition-all shadow-sm cursor-pointer"
              >
                <FaPlus size={10} /> Add New Order Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.listItems?.map((_, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-100 rounded-lg bg-gray-50 flex flex-col gap-3 relative hover:border-primary-300 transition-colors"
                >
                  <div className="flex justify-between items-center border-b pb-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-200 text-[10px] font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="text-sm font-semibold text-gray-500 tracking-wider">
                        {values.listItems[index]?.title || `Highlight #${index + 1}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-all"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-8">
                      <InputText
                        label="Title"
                        name={`listItems.${index}.title`}
                        placeholder="e.g., Expert Guides"
                        required
                      />
                    </div>
                    <div className="col-span-4">
                      <InputText
                        label="Order"
                        name={`listItems.${index}.ordering`}
                        type="number"
                        required
                      />
                    </div>
                  </div>

                  <InputText
                    label="Description"
                    name={`listItems.${index}.description`}
                    placeholder="Short summary for this order..."
                    required
                  />
                </div>
              ))}
            </div>

            {(!values.listItems || values.listItems.length === 0) && (
              <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 text-sm">
                No items added. Use the button above to start your list.
              </div>
            )}
          </div>
        )}
      </FieldArray>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-10 py-2.5 rounded-md bg-primary-600 hover:bg-primary-700 text-white font-bold shadow-md active:scale-95 transition-all cursor-pointer"
        >
          {isUpdate ? 'Update Changes' : 'Save Section'}
        </button>
      </div>
    </Form>
  );
};

export default WhyUsForm;
