import React from 'react';
import { useForm } from 'react-hook-form';

import { joiResolver } from '@hookform/resolvers/joi';

import '../../../css/newTicket.css';

import config from '../../../config/config.json';
import { RequestSchema } from '../../../config/joiSchema';
import Button from '../atomic/Button';
import InputForm from '../atomic/InputForm';
import SelectForm from '../atomic/SelectForm';
import TextAreaForm from '../atomic/TextAreaForm';

const RequestForm = ({ ticket, onSave, onCancel }) => {
  // initiate react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    // schema to validate on
    resolver: joiResolver(RequestSchema),
  });

  return (
    <form
      className='requestForm'
      onSubmit={handleSubmit(onSave)}
    >
      {/* heading */}
      <div className='requestForm__heading'>
        <h1>New Ticket</h1>
      </div>

      <div className='requestForm__form'>
        {/* title */}
        <div className='requestForm__form__title'>
          <InputForm
            property='title'
            obj={ticket}
            register={register}
            errors={errors}
          />
        </div>

        {/* module */}
        <div className='requestForm__form__module'>
          <SelectForm
            property='module'
            obj={ticket}
            options={config.module}
            register={register}
            errors={errors}
          />
        </div>

        {/* type */}
        <div className='requestForm__form__type'>
          <SelectForm
            property='type'
            obj={ticket}
            options={config.type}
            register={register}
            errors={errors}
          />
        </div>

        {/* source */}
        <div className='requestForm__form__source'>
          <SelectForm
            property='source'
            obj={ticket}
            options={config.source}
            register={register}
            errors={errors}
          />
        </div>

        {/* comment */}
        <div className='requestForm__form__comment'>
          <TextAreaForm
            property='comment'
            obj={ticket}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      {/* submit button */}
      <div className='requestForm__save'>
        <Button label='Submit' />
      </div>

      {/* cancle button */}
      <div className='requestForm__cancel'>
        <Button
          label='Cancel'
          onClick={onCancel}
          type='button'
        />
      </div>
    </form>
  );
};

export default RequestForm;
