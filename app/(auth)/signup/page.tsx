"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";

import Header from "../../components/header/header";
import {
  startDemoSession,
  validateSignupForm,
  type SignupValues,
  type ValidationErrors,
} from "../../utils/auth-session";
import { type DemoRole } from "../../utils/mock-community";

const initialValues: SignupValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "Both",
};

export default function SignupPage() {
  const router = useRouter();
  const [values, setValues] = useState<SignupValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<keyof SignupValues>>(
    {},
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = <T extends keyof SignupValues>(
    field: T,
    value: SignupValues[T],
  ) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateSignupForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    window.setTimeout(() => {
      startDemoSession({
        name: values.name.trim(),
        email: values.email.trim(),
        role: values.role,
      });
      router.push("/dashboard");
      router.refresh();
    }, 700);
  };

  return (
    <div className="site-shell">
      <Header />

      <main className="container auth-layout">
        <div className="auth-wrap">
          <section className="auth-side">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />

            <p className="eyebrow">Join the Network</p>
            <h1>Become part of something real.</h1>
            <p>
              Create your community identity, choose your role, and land inside
              the same polished HelpHub interface used across the product.
            </p>

            <ul>
              <li>Choose to give help, get help, or do both.</li>
              <li>Build a trust score with community-first product flows.</li>
              <li>Start with clean validation instead of loose demo forms.</li>
            </ul>
          </section>

          <section className="auth-card">
            <p className="eyebrow">Create Account</p>
            <h2>Set up your community profile</h2>
            <p className="helper-copy">
              Signup now validates all required fields, email format, password
              strength, and password confirmation before creating a session.
            </p>

            <form onSubmit={handleSubmit} className="stack">
              <div className="auth-grid">
                <div className="field">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    className={errors.name ? "input-error" : undefined}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                  {errors.name ? (
                    <span className="error-text">{errors.name}</span>
                  ) : (
                    <span className="helper-copy">
                      Use the same name you want to appear on the dashboard.
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    className={errors.email ? "input-error" : undefined}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email ? (
                    <span className="error-text">{errors.email}</span>
                  ) : (
                    <span className="helper-copy">
                      A valid email is required before signup completes.
                    </span>
                  )}
                </div>
              </div>

              <div className="field">
                <label htmlFor="signup-role">Role</label>
                <div className="relative">
                  <select
                    id="signup-role"
                    value={values.role}
                    onChange={(event) =>
                      updateField("role", event.target.value as DemoRole)
                    }
                    className={`form-select ${errors.role ? "input-error" : ""}`}
                  >
                    <option value="Both">Both</option>
                    <option value="Need Help">Need Help</option>
                    <option value="Can Help">Can Help</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                    size={18}
                  />
                </div>
                {errors.role ? (
                  <span className="error-text">{errors.role}</span>
                ) : (
                  <span className="helper-copy">
                    Pick the mode that best fits how you want to use the
                    platform.
                  </span>
                )}
              </div>

              <div className="auth-grid">
                <div className="field">
                  <label htmlFor="password">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={(event) =>
                        updateField("password", event.target.value)
                      }
                      className={
                        errors.password ? "input-error pr-12" : "pr-12"
                      }
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password ? (
                    <span className="error-text">{errors.password}</span>
                  ) : (
                    <span className="helper-copy">
                      Minimum 8 characters with upper, lower, and number.
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="confirm-password">Confirm password</label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={values.confirmPassword}
                      onChange={(event) =>
                        updateField("confirmPassword", event.target.value)
                      }
                      className={
                        errors.confirmPassword ? "input-error pr-12" : "pr-12"
                      }
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((current) => !current)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword ? (
                    <span className="error-text">{errors.confirmPassword}</span>
                  ) : (
                    <span className="helper-copy">
                      Confirmation must match the password exactly.
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="helper-copy">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-primary">
                Sign in
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
