export const TOKEN_KEY = "auth_token";

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${TOKEN_KEY}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};

export const isAuthenticated = () => {
  return !!getToken();
};
