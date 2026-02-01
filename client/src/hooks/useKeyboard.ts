import { useEffect } from 'react';

interface UseKeyboardProps {
  onDigit: (digit: string) => void;
  onOperator: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onBackspace: () => void;
  onDecimal: () => void;
}

export const useKeyboard = ({
  onDigit,
  onOperator,
  onEquals,
  onClear,
  onBackspace,
  onDecimal
}: UseKeyboardProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (key >= '0' && key <= '9') {
        event.preventDefault();
        onDigit(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        event.preventDefault();
        onOperator(key);
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        onEquals();
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        event.preventDefault();
        onClear();
      } else if (key === 'Backspace') {
        event.preventDefault();
        onBackspace();
      } else if (key === '.' || key === ',') {
        event.preventDefault();
        onDecimal();
      } else if (key === '%') {
        event.preventDefault();
        onOperator('%');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDigit, onOperator, onEquals, onClear, onBackspace, onDecimal]);
};
