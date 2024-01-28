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
