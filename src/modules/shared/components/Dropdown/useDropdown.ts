import { useState, useEffect, useRef } from 'react';
import { DropdownItem } from './types';

export function useDropdownController(items: DropdownItem[]) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setHighlight(-1);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      const last = items.length - 1;
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        e.preventDefault();
        if (e.key === 'Escape') return setOpen(false);
        if (e.key === 'ArrowDown') return setHighlight((h) => (h < last ? h + 1 : 0));
        if (e.key === 'ArrowUp') return setHighlight((h) => (h > 0 ? h - 1 : last));
        if (e.key === 'Enter') {
          if (highlight >= 0) {
            items[highlight].onClick?.();
            if (!items[highlight].keepOpenOnClick) setOpen(false);
          } else setOpen(false);
        }
      }
    };

    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [open, items, highlight]);

  const toggleOpen = () => setOpen((o) => !o);

  return {
    open,
    highlight,
    setHighlight,
    toggleOpen,
    ref,
  };
}
