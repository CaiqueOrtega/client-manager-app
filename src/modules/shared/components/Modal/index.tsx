'use client';

import { sizeClasses } from './types';
import { positionClasses } from './types';
import { ModalProps } from './types';

export const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  position = 'center',
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/60 p-10 ${positionClasses[position]}`}
      onClick={onClose}
    >
      <div
        className={`w-full rounded-4xl bg-white shadow-lg ${sizeClasses[size]} overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
