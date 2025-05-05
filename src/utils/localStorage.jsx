// src/utils/localStorage.js
export const getStoredAuth = () => {
  const auth = localStorage.getItem('krishimart_auth');
  return auth ? JSON.parse(auth) : null;
};

export const setStoredAuth = (auth) => {
  localStorage.setItem('auth', JSON.stringify(auth));
};

export const removeStoredAuth = () => {
  localStorage.removeItem('krishimart_auth');
};
