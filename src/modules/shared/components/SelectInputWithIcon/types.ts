import { IconType } from 'react-icons';

interface Option {
  label: string;
  value: number | string;
}

export interface SelectInputProps {
  name: string;
  value: string | number;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type CustomSelectInputProps = SelectInputProps & {
  icon: IconType;
  iconColor?: string;
  disabled?: boolean;
};
