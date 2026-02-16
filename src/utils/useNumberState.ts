import { useCallback, useState } from 'react';

interface UseNumberState {
  value: number;
  setValue: (value: number) => void;
  clearValue: () => void;
  setValueState: React.Dispatch<React.SetStateAction<number>>;
}

const useNumberState = (initialValue: number | (() => number) = 0): UseNumberState => {
  const [value, setValueState] = useState(initialValue);

  const setValue = useCallback((val: number) => setValueState(val), []);
  const clearValue = useCallback(() => setValueState(0), []);

  return { value, setValue, clearValue, setValueState };
};

export default useNumberState;
