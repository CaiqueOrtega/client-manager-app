import { User } from 'firebase/auth';

export type AuthState = {
  user?: User;
  loading: boolean;
  error: Error | null;
};
