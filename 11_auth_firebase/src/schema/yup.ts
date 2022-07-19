import {object, string, ref, boolean} from 'yup';
import {jobs} from '../data';

export const credentialsSchema = object().shape({
  email: string()
    .required('Email is missing')
    .min(6, 'Email is Invalid')
    .max(40, 'Email is too long')
    .email('Email is Invalid'),
  password: string()
    .required('Password is missing')
    .min(6, 'Password is too small')
    .max(40, 'Password is too long'),
});

export const signUpSchema = object().shape({
  email: string()
    .required('Email is missing')
    .min(6, 'Email is Invalid')
    .max(40, 'Email is too long')
    .email('Email is Invalid'),
  password: string()
    .required('Password is missing')
    .min(6, 'Password is too small')
    .max(40, 'Password is too long'),
  conditionsCheck: boolean()
    .default(false)
    .oneOf([true], 'You must accept the terms and conditions'),
});

// export const signUpSchema = object().shape({
//   email: string()
//     .required('Email is missing')
//     .min(6, 'Email is Invalid')
//     .max(40, 'Email is too long')
//     .email('Email is Invalid'),
//   password: string()
//     .min(6, 'Password is too small')
//     .max(40, 'Password is too long'),
//   passwordConfirmation: string()
//     .max(40, 'Confirmation password is too long')
//     .oneOf([ref('password')], 'Confirmation password does not match'),
//   // check if same
// });

export const changePasswordSchema = object().shape({
  email: string()
    .required('Email is missing')
    .max(40, 'Email is too long')
    .email('Email is Invalid'),
  oldPassword: string()
    .min(6, 'Old password is too small')
    .max(40, 'Old password is too long'),
  newPassword: string()
    .min(6, 'New password is too small')
    .max(40, 'New password is too long'),
  newPasswordConfirmation: string()
    .max(40, 'Password is too long')
    .oneOf([ref('newPassword')], 'Passwords does not match'),
  // check if same
});

export const updateProfileSchema = object().shape({
  username: string()
    .trim()
    .required('Username is missing')
    .min(1, 'Username is too small')
    .max(40, 'Username is too long'),
});

export const userProfileSchema = object().shape({
  username: string()
    .required('Name is missing')
    .min(1, 'Name is too small')
    .max(40, 'Name is too long'),
  job: string()
    .required('Please select your path')
    .default(undefined)
    .oneOf(jobs, 'Please select your path'),
});

export const emailSchema = object().shape({
  email: string()
    .required('Email is missing')
    .max(40, 'Email is too long')
    .email('Email is Invalid'),
});
