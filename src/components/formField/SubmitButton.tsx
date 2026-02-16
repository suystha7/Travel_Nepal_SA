import { cn } from '@/lib/utils';
import React from 'react';

interface IProps {
  className?: string;
  type?: 'submit' | 'button';
  text?: string;
}

const SubmitButton: React.FC<IProps> = ({ className, type, text }) => {
  return (
    <button
      type={type || 'submit'}
      className={cn(
        'px-12 py-2.5 typography-semi-bold-small rounded bg-primary-500 text-white',
        className
      )}
    >
      {text || 'Submit'}
    </button>
  );
};

export default SubmitButton;
