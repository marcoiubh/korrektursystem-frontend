import React from 'react';
import InputHook from '../atomicHooks/InputHook';
import TextAreaHook from '../atomicHooks/textAreaHook';
import Button from '../atomic/button';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ContactSchema } from '../../../config/joiSchema';

const IssueForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(ContactSchema),
  });

  const Errors = (error) => {
    console.error(error);
  };
  return (
    <form
      className="col-sm-4 mt-lg-5"
      onSubmit={handleSubmit(onSubmit, Errors)}
    >
      <InputHook
        property="issue"
        obj=""
        register={register}
        errors={errors}
      />
      <TextAreaHook
        property="description"
        obj=""
        register={register}
        errors={errors}
      />
      <Button label="Send" />
    </form>
  );
};

export default IssueForm;
