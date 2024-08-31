import { Role } from "./Role";

export interface IUser {
  userName: string | null;
  email: string | null;
  id?: number | null;
  accessToken?: string | null;
  isConfirmed?: boolean;
  photo: string | null;
  token?: string | null;
  role?: Role | null;
}

export interface IAuthState {
  user: IUser;
}
