import { loginUser } from '../../services/authenticationService';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import InputHook from '../subcomponents/atomicHooks/InputHook';
import Button from '../subcomponents/atomic/button';
import { LoginSchema } from '../../config/joiSchema';
import ShowPassword from '../subcomponents/atomic/showPassword';
import { toast } from 'react-toastify';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: joiResolver(LoginSchema) });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  const handleLogin = async (e) => {
    const credentials = {
      email: e.email,
      password: e.password,
    };

    try {
      await loginUser(credentials);
      window.location = '/ticket/overview';
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { data: message } = error.response;
        toast.error(message);
      }
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form
        className="col-sm-4 mt-lg-5"
        onSubmit={handleSubmit(handleLogin)}
      >
        <InputHook
          property="email"
          obj=""
          register={register}
          errors={errors}
        />
        <InputHook
          property="password"
          obj=""
          type={showPassword ? 'text' : 'password'}
          register={register}
          errors={errors}
        />
        <ShowPassword
          state={showPassword}
          onClick={handleShowPassword}
        />
        <Button label="Login" />
      </form>
    </div>
  );
};

export default Login;
