import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { demoUsers, type DemoRole, getUserByName } from "./mock-community";

export const AUTH_TOKEN_KEY = "auth_token";
export const AUTH_USER_NAME_KEY = "auth_user_name";
export const AUTH_USER_ROLE_KEY = "auth_user_role";
export const AUTH_USER_EMAIL_KEY = "auth_user_email";

export const COOKIE_OPTIONS = {
  path: "/",
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24 * 7,
};

export type AuthSession = {
  name: string;
  email: string;
  role: DemoRole;
};

export type LoginValues = {
  email: string;
  password: string;
  role: DemoRole;
};

export type SignupValues = LoginValues & {
  name: string;
  confirmPassword: string;
};

export type ValidationErrors<T extends string> = Partial<Record<T, string>>;

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isStrongPassword(password: string) {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password)
  );
}

export function validateLoginForm(values: LoginValues) {
  const errors: ValidationErrors<keyof LoginValues> = {};

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required.";
  } else if (!isStrongPassword(values.password)) {
    errors.password =
      "Password must be at least 8 characters with upper, lower, and number.";
  }

  if (!values.role) {
    errors.role = "Select a role to continue.";
  }

  return errors;
}

export function validateSignupForm(values: SignupValues) {
  const errors: ValidationErrors<keyof SignupValues> = {
    ...validateLoginForm(values),
  };

  if (!values.name.trim()) {
    errors.name = "Full name is required.";
  } else if (values.name.trim().length < 3) {
    errors.name = "Name should be at least 3 characters.";
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export function startDemoSession(session: AuthSession) {
  setCookie(AUTH_TOKEN_KEY, "mock_token_123", COOKIE_OPTIONS);
  setCookie(AUTH_USER_NAME_KEY, session.name, COOKIE_OPTIONS);
  setCookie(AUTH_USER_EMAIL_KEY, session.email, COOKIE_OPTIONS);
  setCookie(AUTH_USER_ROLE_KEY, session.role, COOKIE_OPTIONS);
}

export function clearDemoSession() {
  deleteCookie(AUTH_TOKEN_KEY, { path: "/" });
  deleteCookie(AUTH_USER_NAME_KEY, { path: "/" });
  deleteCookie(AUTH_USER_EMAIL_KEY, { path: "/" });
  deleteCookie(AUTH_USER_ROLE_KEY, { path: "/" });
}

export function readDemoSession(): AuthSession {
  const storedName = readCookieValue(AUTH_USER_NAME_KEY) ?? demoUsers[0].name;
  const matchedUser = getUserByName(storedName);

  return {
    name: storedName,
    email: readCookieValue(AUTH_USER_EMAIL_KEY) ?? matchedUser.email,
    role:
      (readCookieValue(AUTH_USER_ROLE_KEY) as DemoRole | undefined) ??
      matchedUser.role,
  };
}

function readCookieValue(key: string) {
  if (typeof window === "undefined") {
    return undefined;
  }

  return getCookie(key)?.toString();
}
