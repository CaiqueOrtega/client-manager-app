import { IconType } from 'react-icons';

export type InputWithIconProps = {
  id: string;
  type: string;
  placeholder: string;
  icon: IconType;
};

export type CustomInputProps = InputWithIconProps & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bgColor?: string;
  borderColor?: string;
  iconColor?: string;
  focusRing?: string;
  rounded?: string;
  paddingY?: string;
  paddingX?: string;
  inputClassName?: string;
  disabled?: boolean;
};
