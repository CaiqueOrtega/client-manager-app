import { User } from 'firebase/auth';

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: Error | null;
};
