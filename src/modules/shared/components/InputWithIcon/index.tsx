import { CustomInputProps } from './types';

const InputWithIcon = ({
  id,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
  bgColor = 'bg-gray-50',
  borderColor = 'border-gray-200',
  iconColor = 'text-gray-400',
  focusRing = 'focus:ring-teal-600',
  rounded = 'rounded-xl',
  paddingY = 'py-3',
  paddingX = 'pl-10 pr-4',
  inputClassName = '',
  disabled = false,
  errorMessage = '',
}: CustomInputProps) => {
  const hasError = errorMessage !== '';

  return (
    <div className="w-full">
      <div className="relative">
        <Icon
          className={`pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 transform ${
            hasError ? 'text-red-400' : iconColor
          }`}
          aria-hidden="true"
        />
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className={`w-full ${disabled ? 'bg-gray-50' : ''} ${rounded} border ${
            hasError ? 'border-red-300' : borderColor
          } ${bgColor} ${paddingY} ${paddingX} focus:ring-2 focus:outline-none ${
            hasError ? 'focus:ring-red-400' : focusRing
          } ${inputClassName}`}
          disabled={disabled}
        />
      </div>
      {hasError && <p className="mt-1 text-sm text-red-400">{errorMessage}</p>}
    </div>
  );
};

export default InputWithIcon;
