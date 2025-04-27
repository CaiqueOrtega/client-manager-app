export interface SwitchProps {
  isChecked: boolean;
  onChange: (value: boolean) => void;
  icon?: React.ReactNode;
  activeColor?: string;
  inactiveColor?: string;
}
