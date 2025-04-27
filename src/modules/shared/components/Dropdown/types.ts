import { ReactNode } from 'react';

export interface DropdownItem {
  id: string;
  content?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  customClass?: string;
  keepOpenOnClick?: boolean;
}

export interface DropdownProps {
  label: ReactNode;
  items: DropdownItem[];
  separators?: number[];
  dropdownWidth?: string;
}
