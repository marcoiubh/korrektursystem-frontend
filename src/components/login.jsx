import { loginUser } from './services/authenticationService';
import { useForm } from 'react-hook-form';
import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const Login = () => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.empty': 'This is a required field',
        'string.email': 'A valid email is required',
      }),
    password: Joi.string()
      .required()
      .messages({ 'string.empty': 'A valid password is required' }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: joiResolver(schema) });

  const handleLogin = async (e) => {
    const credentials = {
      email: e.email,
      password: e.password,
    };

    try {
      await loginUser(credentials);
      window.location = '/tickets';
    } catch (ex) {}
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form
        className="col-sm-4 mt-lg-5"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="input-group col-sm-6  ">
          <span className="input-group-text" id="basic-addon1">
            Email
          </span>
          <input
            type="text"
            name="email"
            {...register('email')}
            className={`form-control ${
              errors.email ? 'is-invalid' : ''
            }`}
          />
          <div className="invalid-feedback">
            {errors.email?.message}
          </div>
        </div>
        <div className="input-group col-sm-6  ">
          <span className="input-group-text" id="basic-addon1">
            Password
          </span>
          <input
            type="password"
            name="password"
            {...register('password')}
            className={`form-control ${
              errors.password ? 'is-invalid' : ''
            }`}
          />
          <div className="invalid-feedback">
            {errors.password?.message}
          </div>
        </div>
        <button className="btn btn-outline-primary small">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
