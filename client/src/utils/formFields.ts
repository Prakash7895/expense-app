import { FormFields } from './types';

export const loginFormFields: FormFields[] = [
  {
    label: 'Email/Phone',
    name: 'emailOrPhone',
    type: 'text',
    className: 'my-3',
  },
  { label: 'Password', name: 'password', type: 'password' },
];

export const signupFormFields: FormFields[] = [
  {
    label: 'First Name',
    name: 'firstName',
    type: 'text',
  },
  {
    label: 'LastName',
    name: 'lastName',
    type: 'text',
  },
  {
    label: 'Email/Phone',
    name: 'emailOrPhone',
    type: 'text',
  },
  { label: 'Password', name: 'password', type: 'password' },
  { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
];

export const forgotPassFormFields: FormFields[] = [
  {
    label: 'Email/Phone',
    name: 'emailOrPhone',
    type: 'text',
    className: 'my-3',
  },
  { label: 'OTP', name: 'otp', type: 'text', subType: 'number' },
];
