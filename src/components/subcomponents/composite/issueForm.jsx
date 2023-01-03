import React from 'react';
import InputHook from '../atomicHooks/InputHook';
import TextAreaHook from '../atomicHooks/textAreaHook';
import Button from '../atomic/button';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IssueSchema } from '../../../config/joiSchema';

import '../../../css/issue.css';

const IssueForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(IssueSchema),
  });

  const onErrors = (error) => {
    console.error(error);
  };
  return (
    <form
      className="issue__form"
      onSubmit={handleSubmit(onSubmit, onErrors)}
    >
      <div className="issue__form__heading">
        <h1>Contact</h1>
      </div>
      <div className="issue__form__issue">
        <InputHook
          property="title"
          obj=""
          register={register}
          errors={errors}
        />
      </div>
      <div className="issue__form__description">
        <TextAreaHook
          property="description"
          obj=""
          register={register}
          errors={errors}
        />
      </div>

      <div className="issue__form__button">
        <Button label="Send" />
      </div>
    </form>
  );
};

export default IssueForm;
