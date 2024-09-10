// app/utils/validations.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateUsername = (username) => {
  return username.length >= 3;
};

export const validateNotEmpty = (field) => {
  return field.trim().length > 0;
};

export const validatePasswordHasSpecialChar = (password) => {
  const re = /[!@#$%^&*(),.?":{}|<>]/;
  return re.test(password);
};

export const validatePasswordHasNumber = (password) => {
  const re = /\d/;
  return re.test(password);
};
