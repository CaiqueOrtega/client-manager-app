import { User } from 'firebase/auth';

export interface AuthProviderType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}
