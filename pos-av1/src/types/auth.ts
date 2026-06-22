export type LoginFormData = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  accessToken?: string;
  refreshToken?: string;
};