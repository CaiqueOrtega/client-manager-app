'use client';

import { CardProps } from './types';

const Card = ({
  title,
  value,
  icon,
  backgroundColor,
  loading,
}: CardProps & { loading: boolean }) => {
  if (loading) {
    return <CardLoading />;
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white px-6 py-12 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-base text-gray-500">{title}</h1>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div
          className={`flex items-center justify-center ${backgroundColor} h-15 w-15 rounded-3xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

const CardLoading = () => {
  return (
    <div className="flex animate-pulse flex-col gap-6 rounded-2xl bg-white px-6 py-12 shadow-sm">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-6 w-32 rounded bg-gray-300" />
        </div>
        <div className="flex h-15 w-15 items-center justify-center rounded-3xl bg-gray-200">
          <div className="h-6 w-6 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default Card;
