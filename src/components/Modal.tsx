import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import LoadingScreen from './LoadingScreen';

interface IProps {
  isLoading?: boolean;
  isOpen: boolean;
  onOpenChange: () => void;
  name: string;
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ isOpen, name, onOpenChange, isLoading, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="border-b border-gray-100">
          <DialogTitle className="text-primary-500 font-bold mb-4">{name}</DialogTitle>
        </DialogHeader>
        {!isLoading ? children : <LoadingScreen />}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
