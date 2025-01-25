export interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface ISignInFormData {
  email: string;
  password: string;
}

export interface IUpdateProfile {
  name?: string;
  profilePic: string;
}

export interface IUser  {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
}
