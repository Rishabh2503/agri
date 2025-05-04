// src/utils/localStorage.js
export const getStoredAuth = () => {
    const auth = localStorage.getItem('krishimart_auth');
    return auth ? JSON.parse(auth) : null;
};

export const setStoredAuth = (authData) => {
    localStorage.setItem('krishimart_auth', JSON.stringify(authData));
};

export const removeStoredAuth = () => {
    localStorage.removeItem('krishimart_auth');
};