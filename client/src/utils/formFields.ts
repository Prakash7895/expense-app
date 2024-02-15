import { InputSlots } from '@nextui-org/react';
import { Category, FormFields } from './types';

export const loginFormFields: FormFields[] = [
  {
    label: 'Email/Phone',
    name: 'emailOrPhone',
    type: 'text',
    className: 'my-3',
  },
  { label: 'Password', name: 'password', type: 'password' },
];

export const signupFormFields: (
  showCountryCode: boolean,
  setShowStartContent: (a: boolean) => void,
  startContent: JSX.Element
) => FormFields<InputSlots>[] = (
  showCountryCode,
  setShowStartContent,
  startContent
) => [
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
    onFieldChange(event) {
      setShowStartContent(/^\d+$/.test(event.target.value));
    },
    startContent: startContent,
    classNames: {
      label: `${showCountryCode ? 'left-40' : ''}`,
    },
  },
  { label: 'Password', name: 'password', type: 'password' },
  { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
];

export const forgotPassFormFields: (
  showCountryCode: boolean,
  setShowStartContent: (a: boolean) => void,
  startContent: JSX.Element
) => FormFields<InputSlots>[] = (
  showCountryCode,
  setShowStartContent,
  startContent
) => [
  {
    label: 'Email/Phone',
    name: 'emailOrPhone',
    type: 'text',
    onFieldChange(event) {
      setShowStartContent(/^\d+$/.test(event.target.value));
    },
    startContent: startContent,
    classNames: {
      label: `${showCountryCode ? 'left-40' : ''}`,
    },
  },
  {
    label: 'OTP',
    name: 'otp',
    type: 'text',
    subType: 'number',
    defaultValue: '',
  },
  { label: 'Password', name: 'password', type: 'password', defaultValue: '' },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
    defaultValue: '',
  },
];

export const addTransaction = (categoryList: Category[]) =>
  [
    { label: 'Amount', name: 'amount', type: 'text', subType: 'number' },
    {
      label: 'Type',
      name: 'type',
      type: 'select',
      options: [
        { value: 'credit', label: 'Credit' },
        { value: 'debit', label: 'Debit' },
      ],
      onFieldChange(_, resetField) {
        if (resetField) {
          resetField('categoryId');
        }
      },
    },
    {
      label: 'Category',
      name: 'categoryId',
      type: 'select',
      options: ({ type }) =>
        type
          ? categoryList
              .filter((el) => el.type === type)
              .map((el) => ({ label: el.name, value: el.id }))
          : [],
    },
    { label: 'Description', name: 'description', type: 'text' },
    { label: 'Renter', name: 'renter', type: 'text' },
  ] as FormFields[];

export const categoryFormFields: FormFields[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Type',
    name: 'type',
    type: 'select',
    options: [
      { value: 'credit', label: 'Credit' },
      { value: 'debit', label: 'Debit' },
    ],
  },
];

export const accountFormFields: FormFields[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
  },
];
