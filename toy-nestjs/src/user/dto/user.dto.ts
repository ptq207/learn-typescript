export interface IUserData {
  username: string;
  email: string;
  registeredAt?: string;
  avatar?: string;
  dob?: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ICreateUserRequest {
  username: string;
  email: string;
  password: string;
  avatar: string;
  dob: Date;
}

export interface IUpdateUserRequest {
  username: string;
  email: string;
  dob: Date;
  avatar: string;
}

export interface IChangePasswordRequest {
  username: string;
  password: string;
  newPassword: string;
}
