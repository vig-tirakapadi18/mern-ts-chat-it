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
  profilePic: any;
}

export interface  {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
}
