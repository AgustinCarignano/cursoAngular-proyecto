import {
  PublicUser,
  User,
} from 'src/app/dashboard/pages/users/models/user.model';

export interface AuthResponse {
  accessToken: string;
  user: PublicUser;
}

export interface LoginRequest {
  email: string | null;
  password: string | null;
}

export interface RegisterRequest {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
}
