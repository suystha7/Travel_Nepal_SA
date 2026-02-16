import InputText from '@/components/formField/InputText';
import TextEditor from '@/components/TextEditor';
import React from 'react';

const FAQForm: React.FC = () => {
  return (
    <div className="gap-x-6 gap-y-7 grid grid-cols-1">
      <InputText required label="Question" name="question" placeholder="Enter Question" />
      <TextEditor label="Answer" name="answer" required />
    </div>
  );
};

export default FAQForm;
