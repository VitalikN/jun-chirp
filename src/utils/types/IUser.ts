export interface IUser {
  userName: string | null;
  email: string | null;
  id?: number | null;
  accessToken?: string | null;
  isConfirmed?: boolean;
  photo: string | null;
  token?: string | null;
}

export interface IAuthState {
  user: IUser;
}
