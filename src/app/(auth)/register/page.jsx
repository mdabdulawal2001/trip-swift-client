import RegisterForm from '@/components/auth/RegisterForm';
import React from 'react';

export const metadata = {
  title: "Create Account",
  description:
    "Create your TripSwift account and start exploring travel tickets.",
};

const RegisterPage = () => {
    return (
        <div>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;