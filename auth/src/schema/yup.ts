import {object, string, ref, boolean, mixed} from 'yup';
import {jobs} from '../data';

export const credentialsSchema = object().shape({
  email: string()
    .trim()
    .required('Email is missing')
    .min(6, 'Email is Invalid')
    .max(40, 'Email is too long')
    .email('Email is Invalid'),
  password: string()
    .trim()
    .required('Password is missing')
    .min(6, 'Password is too small')
    .max(40, 'Password is too long'),
});

export const signUpSchema = object().shape({
  email: string()
    .trim()
    .required('Email is missing')
    .min(6, 'Email is Invalid')
    .max(40, 'Email is too long')
    .email('Email is Invalid'),
  password: string()
    .trim()
    .required('Password is missing')
    .min(6, 'Password is too small')
    .max(40, 'Password is too long'),
  conditionsCheck: boolean()
    .default(false)
    .oneOf([true], 'You must accept the terms and conditions'),
});

// export const signUpSchema = object().shape({
//   email: string().trim()
//     .required('Email is missing')
//     .min(6, 'Email is Invalid')
//     .max(40, 'Email is too long')
//     .email('Email is Invalid'),
//   password: string().trim()
//     .min(6, 'Password is too small')
//     .max(40, 'Password is too long'),
//   passwordConfirmation: string().trim()
//     .max(40, 'Confirmation password is too long')
//     .oneOf([ref('password')], 'Confirmation password does not match'),
//   // check if same
// });

export const changePasswordSchema = object().shape({
  email: string()
    .trim()
    .required('Email is missing')
    .max(40, 'Email is too long')
    .email('Email is Invalid'),
  oldPassword: string()
    .trim()
    .min(6, 'Old password is too small')
    .max(40, 'Old password is too long'),
  newPassword: string()
    .trim()
    .min(6, 'New password is too small')
    .max(40, 'New password is too long'),
  newPasswordConfirmation: string()
    .trim()
    .max(40, 'Password is too long')
    .oneOf([ref('newPassword')], 'Passwords does not match'),
  // check if same
});

export const updateProfileSchema = object().shape({
  username: string()
    .trim()
    .trim()
    .required('Username is missing')
    .min(1, 'Username is too small')
    .max(40, 'Username is too long'),
});

export const userProfileSchema = object().shape({
  username: string()
    .trim()
    .required('Name is missing')
    .min(1, 'Name is too small')
    .max(40, 'Name is too long'),
  job: string()
    .trim()
    .required('Please select your path')
    .default(undefined)
    .oneOf(jobs, 'Please select your path'),
});

export const emailSchema = object().shape({
  email: string()
    .trim()
    .required('Email is missing')
    .max(40, 'Email is too long')
    .email('Email is Invalid'),
});

export const imgUploadSchema = object().shape({
  title: string()
    .trim()
    .required('Title is missing')
    .max(30, 'Title is too long'),
  image: mixed().test('required', 'Image is missing', value => {
    return value && value.length;
  }),
  description: string().trim().max(400, 'Description is too long'),
});
