import LoginForm from '@/components/auth/LoginForm';
import React from 'react';

export const metadata = {
  title: "Login",
  description:
    "Sign in to your TripSwift account and manage your travel bookings.",
};

const LoginPage = () => {
    return (
        <div>
            <LoginForm />
        </div>
    );
};

export default LoginPage;