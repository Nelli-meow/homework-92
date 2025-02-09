export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  image: string | null;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
  role: string;
  image?: string | null;
  displayName: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  error: {
    [key: string]: {
      message: string;
      name: string;
    },
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
