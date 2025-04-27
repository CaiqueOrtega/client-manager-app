export interface UserMenuProps {
  photoURL?: string | null;
  fontSize?: FontSize;
  size?: number;
}

export type FontSize = 'small' | 'medium' | 'large';

export const DEFAULT_SIZE = 36;
export const DEFAULT_FONT_SIZE: FontSize = 'small';

export const fontSizeClasses: Record<FontSize, string> = {
  small: 'text-sm',
  medium: 'text-lg',
  large: 'text-xl',
};
