'use client';

import { FiTrendingUp } from 'react-icons/fi';
import { CardProps } from './types';

const Card = ({ title, value, percentage, icon, backgroundColor }: CardProps) => {
  const isNegative = parseFloat(percentage.replace('%', '').replace(',', '.')) < 0;

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white px-6 py-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <h1 className="text-base text-gray-500">{title}</h1>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div
          className={`flex items-center justify-center ${backgroundColor} h-15 w-15 rounded-3xl`}
        >
          {icon}
        </div>
      </div>
      <div
        className={`flex items-center text-xs ${isNegative ? 'text-red-500' : 'text-green-500'}`}
      >
        <FiTrendingUp className={`mr-1 ${isNegative && 'rotate-180'}`} />
        <span>{percentage}</span>
      </div>
    </div>
  );
};

export default Card;
