import { IconType } from 'react-icons';

export type InputWithIconProps = {
  id: string;
  type: string;
  placeholder: string;
  icon: IconType;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type CustomInputProps = InputWithIconProps & {
  bgColor?: string;
  borderColor?: string;
  iconColor?: string;
  focusRing?: string;
  rounded?: string;
  paddingY?: string;
  paddingX?: string;
  inputClassName?: string;
  disabled?: boolean;
  mask?: string;
  errorMessage?: string;
};
