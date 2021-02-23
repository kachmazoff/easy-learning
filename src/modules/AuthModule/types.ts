export interface ILoginFormData {
  username: string;
  password: string;
  remember?: boolean;
}

export interface IRegistrationFormData {
  username: string;
  password: string;
  email: string;
  confirm: string;
  agreement: boolean;
}
