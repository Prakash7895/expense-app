import * as yup from 'yup';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const numberOnlyRegex = /^\d+$/;

const numberRegex = /\d/;

const lowercaseRegex = /[a-z]/;

const uppercaseRegex = /[A-Z]/;

const specialRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const passwordSchema = yup
  .string()
  .required('Password is required.')
  .test(
    'password-check',
    ({ value }) => {
      if (value) {
        if (value.split(' ').length > 1) {
          return 'Space is not allowed.';
        } else if (!numberRegex.test(value)) {
          return 'Number is missing.';
        } else if (!lowercaseRegex.test(value)) {
          return 'Lowercase letter is missing.';
        } else if (!uppercaseRegex.test(value)) {
          return 'Uppercase letter is missing.';
        } else if (!specialRegex.test(value)) {
          return 'Special character is missing.';
        } else if (value.length < 8) {
          return 'Password should be at least 8 characters long.';
        }
      }
      return false;
    },
    (value) => {
      if (value) {
        if (
          numberRegex.test(value) &&
          lowercaseRegex.test(value) &&
          uppercaseRegex.test(value) &&
          specialRegex.test(value) &&
          value.split(' ').length === 1
        ) {
          return true;
        }
      }
      return false;
    }
  );

const emailOrPhoneSchema = yup
  .string()
  .required('Email/Phone is required.')
  .test(
    'email-phone-test',
    ({ value }) => {
      if (value) {
        if (numberOnlyRegex.test(value) && value.length !== 10) {
          return 'Enter valid phone number.';
        }
        if (!emailRegex.test(value)) {
          return 'Enter valid email address.';
        }
      }
      return false;
    },
    (val) => {
      if (val) {
        if (numberOnlyRegex.test(val) && val.length === 10) {
          return true;
        }
        return emailRegex.test(val);
      }
      return false;
    }
  );

export const loginSchema = yup.object({
  emailOrPhone: emailOrPhoneSchema,
  password: passwordSchema,
});

export const signupSchema = yup.object({
  firstName: yup
    .string()
    .required('First Name is required.')
    .test('alpha-check', 'Name should contain only alphabet', (value) => {
      return /^[a-zA-Z ]*$/.test(value);
    }),
  lastName: yup
    .string()
    .required('Last Name is required.')
    .test('alpha-check', 'Name should contain only alphabet', (value) => {
      return /^[a-zA-Z ]*$/.test(value);
    }),
  emailOrPhone: emailOrPhoneSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required('Confirm Password is required.')
    .test(
      'confirmPasswordCheck',
      'Password and Confirm Password do not match.',
      (val, context) => {
        if (val && val !== context.parent.password) {
          return false;
        }
        return true;
      }
    ),
});

export const forgotPassSchema = (gotOtp: boolean, setPassword: boolean) =>
  yup.object({
    emailOrPhone: emailOrPhoneSchema,
    ...(gotOtp
      ? {
          otp: yup
            .string()
            .required('OTP is required.')
            .matches(/^[0-9]+$/, 'Must be only digits.')
            .min(6, 'Must be exactly 6 digits.')
            .max(6, 'Must be exactly 6 digits.'),
        }
      : {}),

    ...(gotOtp && setPassword
      ? {
          password: passwordSchema,
          confirmPassword: yup
            .string()
            .required('Confirm Password is required.')
            .test(
              'confirmPasswordCheck',
              'Password and Confirm Password do not match.',
              (val, context) => {
                if (val && val !== context.parent.password) {
                  return false;
                }
                return true;
              }
            ),
        }
      : {}),
  });

export const addTransactionSchema = yup.object({
  amount: yup.string().required('Amount is required.'),
  type: yup.string().required('Type is required.'),
  categoryId: yup.string().required('Category is required.'),
});

export const addCategorySchema = yup.object({
  name: yup.string().required('Name is required.'),
  type: yup.string().required('Type is required.'),
});

export const addAccountSchema = yup.object({
  name: yup.string().required('Name is required.'),
});

export const inviteSchema = yup.object({
  emailOrPhone: yup.array().of(emailOrPhoneSchema),
});

export const nameSchema = yup.object({
  firstName: yup
    .string()
    .required('First Name is required.')
    .test('alpha-check', 'Name should contain only alphabet', (value) => {
      return /^[a-zA-Z ]*$/.test(value);
    }),
  lastName: yup
    .string()
    .required('Last Name is required.')
    .test('alpha-check', 'Name should contain only alphabet', (value) => {
      return /^[a-zA-Z ]*$/.test(value);
    }),
});

export const passSchema = yup.object({
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required('Confirm Password is required.')
    .test(
      'confirmPasswordCheck',
      'Password and Confirm Password do not match.',
      (val, context) => {
        if (val && val !== context.parent.password) {
          return false;
        }
        return true;
      }
    ),
});

export const currencySchema = yup.object({
  currency: yup.string().required('Currency is required.'),
});
