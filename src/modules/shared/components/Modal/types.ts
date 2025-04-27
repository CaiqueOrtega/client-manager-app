export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'center' | 'left' | 'right' | 'bottom' | 'top';
};

export const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export const positionClasses: Record<'center' | 'left' | 'right' | 'bottom' | 'top', string> = {
  center: 'flex items-center justify-center',
  left: 'flex items-center justify-start',
  right: 'flex items-center justify-end',
  bottom: 'flex items-end justify-center',
  top: 'flex items-start justify-center',
};
