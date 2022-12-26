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
    mode: 'onBlur',
    resolver: joiResolver(IssueSchema),
  });

  const Errors = (error) => {
    console.error(error);
  };
  return (
    <form
      className="issue_form"
      onSubmit={handleSubmit(onSubmit, Errors)}
    >
      <div className="issue_form_title">
        <h1>Contact</h1>
      </div>
      <div className="issue_input_title">
        <InputHook
          property="title"
          obj=""
          register={register}
          errors={errors}
        />
      </div>
      <div className="issue_input_description">
        <TextAreaHook
          property="description"
          obj=""
          register={register}
          errors={errors}
        />
      </div>
      <div className="issue_button">
        <Button label="Send" />
      </div>
    </form>
  );
};

export default IssueForm;