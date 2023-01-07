import React from 'react';
import { useForm } from 'react-hook-form';

import { joiResolver } from '@hookform/resolvers/joi';

import '../../../css/issue.css';

import { IssueSchema } from '../../../config/joiSchema';
import Button from '../atomic/Button';
import InputForm from '../atomic/InputForm';
import TextAreaForm from '../atomic/TextAreaForm';

const IssueForm = ({ onSubmit }) => {
  // initiate react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    // schema to validate on
    resolver: joiResolver(IssueSchema),
  });

  return (
    <form
      className='issue__form'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* heading */}
      <div className='issue__form__heading'>
        <h1>Contact</h1>
      </div>

      {/* title */}
      <div className='issue__form__issue'>
        <InputForm
          property='title'
          obj=''
          register={register}
          errors={errors}
        />
      </div>

      {/* description */}
      <div className='issue__form__description'>
        <TextAreaForm
          property='description'
          obj=''
          register={register}
          errors={errors}
        />
      </div>

      {/* send button */}
      <div className='issue__form__button'>
        <Button label='Send' />
      </div>
    </form>
  );
};

export default IssueForm;
