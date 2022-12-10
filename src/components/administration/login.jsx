import { loginUser } from '../../services/authenticationService';
import { useForm } from 'react-hook-form';
import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import InputHook from '../subcomponents/atomicHooks/InputHook';
import Button from '../subcomponents/atomic/button';
import { LoginSchema } from '../../config/joiSchema';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: joiResolver(LoginSchema) });

  const handleLogin = async (e) => {
    const credentials = {
      email: e.email,
      password: e.password,
    };

    try {
      await loginUser(credentials);
      window.location = '/ticket/overview';
    } catch (ex) {}
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
          type="password"
          register={register}
          errors={errors}
        />
        <Button label="Login" />
      </form>
    </div>
  );
};

export default Login;
