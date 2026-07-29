export interface UserData {
  username: string;
  email: string;
  bio: string | null;
  image: string | null;
  token: string;
}

export interface UserSessionData {
  username: string;
  image: string;
  isLoggedIn: boolean;
  token: string;
}

export interface UpdateUser {
  username: string;
  email: string;
  bio?: string;
  image: string;
  password?: string;
}
