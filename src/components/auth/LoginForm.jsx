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
import { LockKeyhole, LogIn, Mail, Store, UserRound } from "lucide-react";
import GoogleLoginButton from "./GoogleLoginButton";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { getSafeCallbackUrl } from "@/lib/getSafeCallbackUrl";

const DEMO_ACCOUNTS = {
  user: {
    email: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD,
  },
  vendor: {
    email: process.env.NEXT_PUBLIC_DEMO_VENDOR_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_VENDOR_PASSWORD,
  },
};

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Desired Route

  const requestedCallbackUrl =
  searchParams.get("callbackUrl");
  
  const callbackUrl =
  getSafeCallbackUrl(requestedCallbackUrl);

  const loginWithCredentials = async (email, password) => {
    setIsLoggingIn(true);
    const loadingToast = toast.loading("Logging in...");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        // Better Auth Callback
        // callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Login failed ❌");
        return;
      }

      if (data) {
        toast.success("Login successful!");
        window.location.replace(callbackUrl);
      } else {
        toast.error("Login failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    } finally {
      toast.dismiss(loadingToast);
      setIsLoggingIn(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = Object.fromEntries(
      new FormData(event.currentTarget),
    );
    await loginWithCredentials(email, password);
  };

  const handleDemoLogin = async (account, role) => {
    if (!account.email || !account.password) {
      toast.error(
        `Set the demo ${role} email and password in your .env.local file.`,
      );
      return;
    }

    await loginWithCredentials(account.email, account.password);
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
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#238FD7] dark:bg-blue-500/10 dark:text-cyan-400"
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
              <Label
                htmlFor="login-email"
                className="text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Email Address
              </Label>

              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="login-email"
                  name="email"
                  className="w-full pl-10"
                  placeholder="Enter Your Email"
                />
              </div>

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (!value) {
                return "Password is required";
              }
              return null;
            }}
          >
            <Label
              htmlFor="login-password"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Password
            </Label>

            {/* Input + Eye Button */}
            <div className="relative mt-1.5">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="login-password"
                name="password"
                type={isShowPassword ? "text" : "password"}
                className="w-full pl-10 pr-10"
                placeholder="Create a strong password"
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center text-slate-500 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
                onClick={() => setIsShowPassword(!isShowPassword)}
                aria-label={isShowPassword ? "Hide password" : "Show password"}
              >
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <FieldError />
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
              isDisabled={isLoggingIn}
              className="h-12 w-full cursor-pointer rounded-xl bg-[#238FD7] text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#1978B8] hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Form>
          <GoogleLoginButton callbackUrl={callbackUrl} />
          <div className="mt-6">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
              Try a demo account
            </p>
            <div className="grid grid-cols-2 gap-3 max-[374px]:grid-cols-1">
              <motion.button
                type="button"
                onClick={() => handleDemoLogin(DEMO_ACCOUNTS.user, "user")}
                disabled={isLoggingIn}
                whileHover={isLoggingIn ? undefined : { y: -2 }}
                whileTap={isLoggingIn ? undefined : { scale: 0.98 }}
                className="group flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-[border-color,background-color,box-shadow,color] duration-200 ease-out hover:border-blue-300 hover:bg-blue-50 hover:text-[#1978B8] hover:shadow-md hover:shadow-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900! dark:text-slate-200 dark:hover:border-blue-700 dark:hover:bg-slate-800 dark:hover:text-cyan-300 dark:focus-visible:ring-offset-slate-900"
              >
                <UserRound className="h-4 w-4 text-[#238FD7] transition-colors group-hover:text-[#1978B8] dark:text-cyan-400 dark:group-hover:text-cyan-300" />
                Demo User
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleDemoLogin(DEMO_ACCOUNTS.vendor, "vendor")}
                disabled={isLoggingIn}
                whileHover={isLoggingIn ? undefined : { y: -2 }}
                whileTap={isLoggingIn ? undefined : { scale: 0.98 }}
                className="group flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-[border-color,background-color,box-shadow,color] duration-200 ease-out hover:border-blue-300 hover:bg-blue-50 hover:text-[#1978B8] hover:shadow-md hover:shadow-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900! dark:text-slate-200 dark:hover:border-blue-700 dark:hover:bg-slate-800 dark:hover:text-cyan-300 dark:focus-visible:ring-offset-slate-900"
              >
                <Store className="h-4 w-4 text-[#238FD7] transition-colors group-hover:text-[#1978B8] dark:text-cyan-400 dark:group-hover:text-cyan-300" />
                Demo Vendor
              </motion.button>
            </div>
          </div>
          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link href={`/register?callbackUrl=${encodeURIComponent(
                callbackUrl
              )}`} className="cursor-pointer text-[#1978B8] hover:text-[#6fb2de] font-medium hover:transition-colors duration-200">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;