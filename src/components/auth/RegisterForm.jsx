"use client";

import { motion } from "framer-motion";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Image as ImageIcon,
  UserPlus,
} from "lucide-react";

import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import GoogleLoginButton from "./GoogleLoginButton";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { getSafeCallbackUrl } from "@/lib/getSafeCallbackUrl";

const RegisterForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  // Desired Route
  const requestedCallbackUrl = searchParams.get("callbackUrl");

  const callbackUrl = getSafeCallbackUrl(requestedCallbackUrl);

  // Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = Object.fromEntries(new FormData(e.currentTarget));
    const { email, name, password } = user;

    // Loading toast
    const loadingToast = toast.loading("Creating account...");

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        name,
        password,
        autoSignIn: false,
      });

      console.log({ data, error });

      // Remove loading toast
      toast.dismiss(loadingToast);

      // Error handling
      if (error) {
        toast.error(error.message || "Registration failed ❌");
        return;
      }

      // Success
      if (data) {
        await authClient.signOut();

        toast.success("Account created successfully!");

        // Go to Login
        // router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        router.replace(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      }
    } catch (err) {
      // Remove loading toast
      toast.dismiss(loadingToast);

      console.error(err);

      toast.error("Something went wrong ❌");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto my-10 w-full md:w-[60%] max-w-lg px-4 sm:my-14 sm:px-6"
    >
      {/* FORM CARD */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-500/5 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-7 text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-cyan-400">
            <UserPlus className="h-6 w-6" />
          </div>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Create Account
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Create your TripSwift account and make every journey easier.
          </p>
        </motion.div>

        {/* REGISTER FORM */}
        <Form
          className="flex max-w-7xl mx-auto w-full flex-col gap-5"
          onSubmit={handleSubmit}
        >
          {/* FULL NAME */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (!value?.trim()) {
                return "Full name is required";
              }

              if (value.trim().length < 2) {
                return "Name must be at least 2 characters";
              }

              return null;
            }}
          >
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Full Name
            </Label>

            <div className="relative mt-1.5">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                name="name"
                className="w-full pl-10"
                placeholder="Enter your full name"
              />
            </div>

            <FieldError />
          </TextField>

          {/* EMAIL */}
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

              <Input
                name="email"
                type="email"
                className="w-full pl-10"
                placeholder="Enter Your Email Address"
              />
            </div>

            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (!value) {
                return "Password is required";
              }

              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Password
            </Label>

            {/* Input + Eye Button */}
            <div className="relative mt-1.5">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
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

          {/* CONFIRM PASSWORD */}
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            validate={(value) => {
              if (!value) {
                return "Please confirm your password";
              }

              const passwordInput = document.querySelector(
                'input[name="password"]',
              );

              const password = passwordInput ? passwordInput.value : "";

              if (password && value !== password) {
                return "Passwords do not match";
              }

              return null;
            }}
          >
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Confirm Password
            </Label>

            {/* Input + Eye Button */}
            <div className="relative mt-1.5">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                name="confirmPassword"
                type={isShowConfirmPassword ? "text" : "password"}
                className="w-full pl-10 pr-10"
                placeholder="Confirm your password"
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center text-slate-500 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                aria-label={
                  isShowConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {isShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <FieldError />
          </TextField>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="mt-1 h-12 w-full cursor-pointer rounded-xl bg-[#4148E8] text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#343BD1] hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <UserPlus className="h-4 w-4" />
            Create Account
          </Button>
        </Form>
        <GoogleLoginButton callbackUrl={callbackUrl} />
        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="cursor-pointer text-blue-500 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
