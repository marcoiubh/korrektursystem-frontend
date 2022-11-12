import Joi from 'joi-browser';
import React, { useState } from 'react';
import Input from './subcomponents/input';

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  const doSubmit = () => {
    console.log('submitted');
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(credentials, schema, options);
    if (!error) return null;

    for (let item of error.details)
      errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaCopy = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaCopy);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors({ errors: errors || {} });
    if (errors) return;

    doSubmit();
  };

  const handleChange = ({ target: input }) => {
    const errorsCopy = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorsCopy[input.name] = errorMessage;
    else delete errorsCopy[input.name];

    const credentialsCopy = { ...credentials };
    credentialsCopy[input.name] = input.value;
    setCredentials(credentialsCopy);
    setErrors(errorsCopy);
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={credentials.username}
          onChange={handleChange}
          error={errors.username}
        />
        <Input
          name="password"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          error={errors.password}
        />
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
