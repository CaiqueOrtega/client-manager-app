import { CustomInputProps } from './types';

const InputWithIcon = ({
  id,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
  bgColor = 'bg-gray-100',
  borderColor = 'border-gray-200',
  iconColor = 'text-gray-400',
  focusRing = 'focus:ring-teal-600',
  rounded = 'rounded-xl',
  paddingY = 'py-3',
  paddingX = 'pr-4 pl-10',
  inputClassName = '',
  disabled = false,
}: CustomInputProps) => (
  <div className="relative">
    <label htmlFor={id} className="sr-only">
      {placeholder}
    </label>
    <Icon
      className={`pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 transform ${iconColor}`}
      aria-hidden="true"
    />
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required
      placeholder={placeholder}
      className={`w-full ${disabled ? 'bg-gray-50' : ''} ${rounded} border ${borderColor} ${bgColor} ${paddingY} ${paddingX} focus:ring-2 focus:outline-none ${focusRing} ${inputClassName}`}
      disabled={disabled}
    />
  </div>
);

export default InputWithIcon;
