import React from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { CustomSelectInputProps } from './types';

const SelectInputWithIcon = ({
  name,
  value,
  options,
  onChange,
  icon: Icon,
  iconColor = 'text-gray-500',
  disabled = false,
}: CustomSelectInputProps) => {
  return (
    <div className="relative text-sm">
      <Icon
        className={`pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 transform ${iconColor}`}
        aria-hidden="true"
      />

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 py-3 pr-10 pl-10 text-gray-500 focus:ring-2 focus:ring-teal-600 focus:outline-none disabled:bg-gray-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <FaChevronDown
        className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-500"
        size={10}
      />
    </div>
  );
};

export default SelectInputWithIcon;
