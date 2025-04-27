import { User } from 'firebase/auth';

export interface UserMenuProps {
  user: User | null;
  photoURL?: string | null;
  fontSize?: FontSize;
  size?: number;
  handleLogout: () => void;
}

export type FontSize = 'small' | 'medium' | 'large';

export const DEFAULT_SIZE = 36;
export const DEFAULT_FONT_SIZE: FontSize = 'medium';

export const fontSizeClasses: Record<FontSize, string> = {
  small: 'text-sm',
  medium: 'text-lg',
  large: 'text-xl',
};
