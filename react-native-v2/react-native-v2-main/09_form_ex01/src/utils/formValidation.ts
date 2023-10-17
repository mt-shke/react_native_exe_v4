import validator from "validator";

export const validateLength = (value: string, min?: number, max?: number) => {
    return validator.isLength(value, { min: min ?? 6, max: max ?? 40 });
};

// Input validation
export const validateEmail = (value: string) => {
    return validator.isEmail(value) && validateLength(value);
};

export const validatePassword = (value: string) => {
    return validateLength(value);
};

export const validatePasswordConfirmation = (
    firstPassword: string,
    secondPassword: string
) => {
    const passwordsAreValids =
        validatePassword(firstPassword) && validatePassword(secondPassword);
    return passwordsAreValids && firstPassword === secondPassword;
};

export const validateName = (value: string) => {
    return validateLength(value, 1, 50);
};

export const validateCivility = (value: string) => {
    // To do compare typeof
    return ["Monsieur", "Madame", "Mademoiselle"].includes(value);
};

export const validateBirthDate = (val: string) => {
    // todo
    return val ? true : false;
};
