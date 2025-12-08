import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure"; //

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const { signInUser /*, getCurrentUserToken */ } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // const axiosSecure = useAxiosSecure(); // optional

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);

    try {
      const { email, password } = data;

      // 1) login 
      await signInUser(email, password);

      // 2) optional: exchange token with backend if you use server JWT
      // const idToken = await getCurrentUserToken();
      // await axiosSecure.post('/api/auth/exchange', { idToken });

      // 3) redirect to intended page or dashboard
      const dest = (location.state && location.state.from) || "/dashboard";
      navigate(dest, { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Login failed. Please check your credentials.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center b-g-main px-4">
      <div className="w-full max-w-md b-g-surface b-subtle rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="header-text t-primary text-3xl mb-2">Welcome back</h2>
        <p className="t-muted text-sm mb-6">Sign in to access your dashboard and orders.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label className="block t-muted text-sm mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              })}
              placeholder="you@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              className="w-full bg-transparent b-subtle t-primary px-4 py-2 rounded-md focus:outline-none"
            />
            {errors.email && <p className="t-accent text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block t-muted text-sm mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder="Minimum 6 characters"
              aria-invalid={errors.password ? "true" : "false"}
              className="w-full bg-transparent b-subtle t-primary px-4 py-2 rounded-md focus:outline-none"
            />
            {errors.password && <p className="t-accent text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Remember & Forgot row */}
          <div className="flex items-center justify-between mb-6">
            <label className="inline-flex items-center gap-2 t-muted text-sm">
              <input type="checkbox" className="accent-secondary" /> <span>Remember me</span>
            </label>
            {/* <a href="/forgot-password" className="t-accent text-sm hover:underline">Forgot?</a> */}
          </div>

          {/* Server error */}
          {serverError && <p className="t-accent text-sm mb-4">{serverError}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className={`w-full ${loading || isSubmitting ? "opacity-70 pointer-events-none" : ""} b-g-accent text-black font-semibold py-3 rounded-md transition hover:opacity-90`}
          >
            {loading || isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 border-t" style={{ borderColor: "#23232A" }} />

        {/* Signup link */}
        <p className="t-muted text-sm text-center">
          New to LocalChefBazaar?{" "}
          <a href="/register" className="t-accent hover:underline">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
