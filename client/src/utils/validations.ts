import * as yup from 'yup';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const numberOnlyRegex = /^\d+$/;

const numberRegex = /\d/;

const lowercaseRegex = /[a-z]/;

const uppercaseRegex = /[A-Z]/;

const specialRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const loginSchema = yup.object({
  emailOrPhone: yup
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
    ),
  password: yup
    .string()
    .required('Password is required.')
    .test(
      'password-check',
      ({ value }) => {
        if (value) {
          if (!numberRegex.test(value)) {
            return 'Number is missing.';
          } else if (!lowercaseRegex.test(value)) {
            return 'Lowercase letter is missing.';
          } else if (!uppercaseRegex.test(value)) {
            return 'Uppercase letter is missing.';
          } else if (!specialRegex.test(value)) {
            return 'Special character is missing.';
          } else if (value.split(' ').length > 1) {
            return 'Space is not allowed.';
          } else if (value.length < 8) {
            return 'Password should be at least 8 characters long.';
          }
        }
        return false;
      },
      (value) => {
        if (value) {
          if (
            numberRegex.test(value) ||
            lowercaseRegex.test(value) ||
            uppercaseRegex.test(value) ||
            specialRegex.test(value) ||
            value.split(' ').length
          ) {
            return false;
          }
        }
        return true;
      }
    ),
});
