"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

import Header from "../../components/header/header";
import {
  startDemoSession,
  validateLoginForm,
  type LoginValues,
  type ValidationErrors,
} from "../../utils/auth-session";
import { type DemoRole } from "../../utils/mock-community";
import { updateUserById, useCommunityStore } from "../../utils/community-store";

const DEFAULT_PASSWORD = "DemoPass123";

export default function LoginPage() {
  const router = useRouter();
  const { users } = useCommunityStore();
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id ?? "");
  const [values, setValues] = useState<LoginValues>({
    email: users[0]?.email ?? "",
    password: DEFAULT_PASSWORD,
    role: users[0]?.role ?? "Both",
  });
  const [errors, setErrors] = useState<ValidationErrors<keyof LoginValues>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedUser = users.find((user) => user.id === selectedUserId) ?? users[0];

  const handleUserChange = (userId: string) => {
    const nextUser = users.find((user) => user.id === userId) ?? users[0];
    if (!nextUser) {
      return;
    }

    setSelectedUserId(userId);
    setValues((currentValues) => ({
      ...currentValues,
      email: nextUser.email,
      role: nextUser.role,
    }));
    setErrors({});
  };

  const updateField = <T extends keyof LoginValues>(
    field: T,
    value: LoginValues[T],
  ) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateLoginForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted login fields.");
      return;
    }

    setIsLoading(true);

    window.setTimeout(() => {
      if (!selectedUser) {
        setIsLoading(false);
        toast.error("No account is available to log in.");
        return;
      }

      updateUserById(selectedUser.id, {
        email: values.email.trim(),
        role: values.role,
      });
      startDemoSession({
        name: selectedUser.name,
        email: values.email.trim(),
        role: values.role,
      });
      toast.success("Welcome back. Redirecting to your dashboard.");
      router.push("/dashboard");
      router.refresh();
    }, 600);
  };

  return (
    <div className="site-shell">
      <Header />

      <main className="container auth-layout">
        <div className="auth-wrap">
          <section className="auth-side">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />

            <p className="eyebrow">Community Access</p>
            <h1>Enter the support network.</h1>
            <p>
              Choose a demo identity, set your role, and jump into the same
              premium dashboard flow shown in the reference design.
            </p>

            <ul>
              <li>Role-based entry for Need Help, Can Help, or Both.</li>
              <li>
                Direct path into dashboard, requests, AI Center, and feed.
              </li>
              <li>Persistent demo session with a polished auth experience.</li>
            </ul>
          </section>

          <section className="auth-card">
            <p className="eyebrow">Login</p>
            <h2>Authenticate your community profile</h2>
            <p className="helper-copy">
              Use one of the seeded demo accounts below. Validation is now
              enforced before entering the dashboard.
            </p>

            <form onSubmit={handleSubmit} className="stack">
              <div className="field">
                <label htmlFor="demo-user">Select demo user</label>
                <div className="relative">
                  <select
                    id="demo-user"
                    value={selectedUser?.id ?? ""}
                    onChange={(event) => handleUserChange(event.target.value)}
                    className="form-select"
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                    size={18}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="role">Role selection</label>
                <div className="relative">
                  <select
                    id="role"
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
                    Recommended role for {selectedUser.name}:{" "}
                    {selectedUser.role}
                  </span>
                )}
              </div>

              <div className="auth-grid">
                <div className="field">
                  <label htmlFor="email">Email</label>
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
                      You can keep the demo email or replace it with your own.
                    </span>
                  )}
                </div>

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
                      placeholder="Enter your password"
                      autoComplete="current-password"
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
                      Demo password: <strong>{DEFAULT_PASSWORD}</strong>
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Continue to dashboard"}
              </button>
            </form>

            <p className="helper-copy">
              Don&apos;t have an account yet?{" "}
              <Link href="/signup" className="font-bold text-primary">
                Create one
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
