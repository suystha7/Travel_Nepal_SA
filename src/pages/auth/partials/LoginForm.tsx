import InputPassword from '@/components/formField/InputPassword';
import InputText from '@/components/formField/InputText';
import { FormikProvider } from 'formik';
import React from 'react';
import { useLogin } from '../hooks/useLogin';
import { Loader } from 'lucide-react';
import TravelNepalLogo from '@/assets/logo/travel-logo.webp'
const LoginForm: React.FC = () => {

  const { formik, isLoginLoading } = useLogin();

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="flex justify-center items-center bg-gradient-to-br from-green-200 via-white to-green-200 w-screen min-h-screen">
          {/* Card */}
          <div className="flex flex-col items-center bg-white shadow-xl px-8 py-10 rounded-2xl w-full max-w-md">
            {/* Logo */}
            <div className="mb-6 w-40 h-16">
              <img
                src={TravelNepalLogo}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <div className="space-y-1 mb-8 text-center">
              <p className="text-gray-500 text-sm">Enter your credentials to continue</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5 w-full">
              <InputText
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                required
              />
              <InputPassword
                label="Password"
                name="password"
                placeholder="Enter your password"
                required
              />

              {/* Submit Button */}
              <button
                disabled={isLoginLoading}
                type="submit"
                className="flex justify-center items-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-70 shadow-md px-6 py-3 rounded-md w-full font-semibold text-white transition duration-200 cursor-pointer"
              >
                {isLoginLoading ? <Loader /> : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};

export default LoginForm;
