import {object, string, ref, boolean, mixed, array, number} from 'yup';

export const credentialsSchema = object().shape({
  email: string().trim().required('Email requis').email('Email invalide'),
  password: string()
    .trim()
    .required('Mot de passe requis')
    .min(6, 'Mot de passe trop court')
    .max(100, 'Mot de passe trop long'),
});

export const signUpSchema = object().shape({
  email: string().trim().required('Email requis').email('Email invalide'),
  password: string()
    .trim()
    .required('Mot de passe requis')
    .min(6, 'Mot de passe trop court')
    .max(100, 'Mot de passe trop long'),
  conditionsCheck: boolean()
    .default(false)
    .oneOf([true], 'Vous devez accepter les conditions'),
});

export const changePasswordSchema = object().shape({
  email: string().trim().required('Email requis').email('Email invalide'),
  oldPassword: string().trim().required('Mot de passe requis'),
  newPassword: string().trim().min(6, '6 caractères minimum'),
  newPasswordConfirmation: string()
    .trim()
    .oneOf([ref('newPassword')], 'Les mots de passe ne correspondent pas'),
  // check if same
});

export const updateProfileSchema = object().shape({
  firstname: string()
    .trim()
    .required('Veuillez indiquer votre prénom')
    .max(40, 'Username is too long'),
  lastname: string()
    .trim()
    .required('Veuillez indiquer votre nom')
    .max(40, 'Username is too long'),
  street: string()
    .trim()
    .min(2, 'Le nom de rue est invalide')
    .max(60, 'Le nom de rue est trop long'),
  postalCode: number()
    .min(5, 'Code postal invalide')
    .max(10, 'Code postal invalide'),
  city: string()
    .trim()
    .min(1, 'Le nom de ville est invalide')
    .max(60, 'Le nom de ville est trop long'),
});

export const productSchema = object().shape({
  title: string()
    .trim()
    .required('Le titre est requis')
    .min(6, 'Ce titre est trop court')
    .max(40, 'Ce titre est trop long'),
  description: string()
    .trim()
    .required('La description est manquante')
    .min(20, 'La description doit comporter au moins 20 caractères')
    .max(400, 'La description est trop longue'),
  imgUrl: array().of(string()),
});

// postal code, city etc

// export const userProfileSchema = object().shape({
//   username: string()
//     .trim()
//     .required('Name requis')
//     .min(1, 'Name is too small')
//     .max(40, 'Name is too long'),
//   job: string()
//     .trim()
//     .required('Please select your path')
//     .default(undefined)
//     .oneOf(jobs, 'Please select your path'),
// });

export const emailSchema = object().shape({
  email: string().trim().required('Email requis').email('Email invalide'),
});

// export const imgUploadSchema = object().shape({
//   title: string()
//     .trim()
//     .required('Titre requis')
//     .max(40, 'Le titre est trop long'),
//   image: mixed().test('required', 'Image requis', value => {
//     return value && value.length;
//   }),
//   description: string().trim().max(400, 'Description is too long'),
// });
