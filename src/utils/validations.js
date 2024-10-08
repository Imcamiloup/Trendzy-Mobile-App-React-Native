// src/utils/validations.js

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePasswordHasSpecialChar = (password) => {
  const re = /[!@#$%^&*(),.?":{}|<>]/;
  return re.test(password);
};

export const validatePasswordHasNumber = (password) => {
  const re = /\d/;
  return re.test(password);
};

export const validatePasswordHasUpperCase = (password) => {
  const re = /[A-Z]/;
  return re.test(password);
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateRegisterForm = (email, password, confirmPassword) => {
  if (!validateEmail(email)) {
    return "Correo electrónico no válido";
  }
  if (!validatePassword(password)) {
    return "La contraseña debe tener al menos 6 caracteres";
  }
  if (!validatePasswordHasSpecialChar(password)) {
    return "La contraseña debe contener al menos un carácter especial";
  }
  if (!validatePasswordHasNumber(password)) {
    return "La contraseña debe contener al menos un número";
  }
  if (!validateConfirmPassword(password, confirmPassword)) {
    return "Las contraseñas no coinciden";
  }
  if (!validateNotEmpty(password)) {
    return "La contraseña no puede estar vacía";
  }
  if (!validatePasswordHasUpperCase(password)) {
    return "La contraseña debe contener al menos una letra mayúscula";
  }

  return "";
};

export const validateLoginForm = (email, password) => {
  if (!validateEmail(email)) {
    return "Correo electrónico no válido";
  }
  if (!validatePassword(password)) {
    return "La contraseña debe tener al menos 6 caracteres";
  }
  if (!validatePasswordHasSpecialChar(password)) {
    return "La contraseña debe contener al menos un carácter especial";
  }
  if (!validatePasswordHasNumber(password)) {
    return "La contraseña debe contener al menos un número";
  }
  if (!validateNotEmpty(password)) {
    return "La contraseña no puede estar vacía";
  }
  if (!validatePasswordHasUpperCase(password)) {
    return "La contraseña debe contener al menos una letra mayúscula";
  }
};

export const validateUsername = (username) => {
  return username.length >= 3;
};

export const validateNotEmpty = (field) => {
  return field.trim().length > 0;
};
