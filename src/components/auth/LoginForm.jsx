"use client";

import { motion } from "framer-motion";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import { LockKeyhole, LogIn, Mail } from "lucide-react";
import GoogleLoginButton from "./GoogleLoginButton";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { getSafeCallbackUrl } from "@/lib/getSafeCallbackUrl";

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Desired Route

  const requestedCallbackUrl =
  searchParams.get("callbackUrl");
  
  const callbackUrl =
  getSafeCallbackUrl(requestedCallbackUrl);

  // Login
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = Object.fromEntries(new FormData(event.currentTarget));
    const { email, password } = user;

    // Loading toast
    const loadingToast = toast.loading("Logging in...");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        // Better Auth Callback
        // callbackURL: callbackUrl,
      });

      console.log({ data, error });

      // Remove loading toast
      toast.dismiss(loadingToast);

      // Error handling
      if (error) {
        toast.error(error.message || "Login failed ❌");
        return;
      }

      // Success
      if (data) {
        toast.success("Login successful!");
        // Desired Route
        window.location.replace(callbackUrl);
        // router.replace(callbackUrl);
        // router.refresh();

        return;
      }
    } catch (err) {
      // Remove loading toast
      toast.dismiss(loadingToast);

      console.error(err);

      toast.error("Something went wrong ❌");
    }
  };

  // login with google
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      // Desired route
      callbackURL: callbackUrl,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="mx-auto my-10 w-full max-w-md px-4 sm:my-14 sm:px-0"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
        }}
        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
      >
        {/* Background Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl dark:bg-cyan-400/10" />

        <div className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl dark:bg-blue-500/10" />

        <div className="relative">
          {/* Header */}
          <div className="mb-7 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
              }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-cyan-400"
            >
              <LogIn className="h-6 w-6" />
            </motion.div>

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Sign in to continue your journey with TripSwift.
            </p>
          </div>

          {/* Login Form */}
          <Form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!value) {
                  return "Email is required";
                }

                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email Address
              </Label>

              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input name="email" className="w-full pl-10" placeholder="Enter Your Email" />
              </div>

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type={`${isShowPassword ? "text" : "password"}`}
              validate={(value) => {
                if (!value) {
                  return "Password is required";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Password
              </Label>

              <div className="relative mt-1.5">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  name="password"
                  className="w-full pl-10"
                  placeholder="Enter your password"
                />
              </div>

              <FieldError />
              <span
                className="cursor-pointer absolute right-3 top-74 md:top-73.75"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <FaEye></FaEye> : <FaEyeSlash />}
              </span>
            </TextField>

            {/* Forgot Password */}
            <div className="-mt-1 flex justify-end">
              <button
                type="button"
                className="cursor-pointer text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="h-12 w-full cursor-pointer rounded-xl bg-[#4148E8] text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#343BD1] hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Form>
          <GoogleLoginButton callbackUrl={callbackUrl} />
          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link href={`/register?callbackUrl=${encodeURIComponent(
                callbackUrl
              )}`} className="text-blue-500 cursor-pointer">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;