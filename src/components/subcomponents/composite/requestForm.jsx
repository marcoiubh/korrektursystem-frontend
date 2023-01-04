import React from 'react';
import InputForm from '../atomic/inputForm';
import TextAreaForm from '../atomic/textAreaForm';
import Button from '../atomic/button';
import config from '../../../config/config.json';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { RequestSchema } from '../../../config/joiSchema';
import SelectForm from '../atomic/selectForm';

import '../../../css/newTicket.css';

const RequestForm = ({ ticket, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(RequestSchema),
  });

  const onErrors = (error) => {
    console.error(error);
  };
  return (
    <form
      className="requestForm"
      onSubmit={handleSubmit(onSave, onErrors)}
    >
      <div className="requestForm__heading">
        <h1>New Ticket</h1>
      </div>
      <div className="requestForm__form">
        <div className="requestForm__form__title">
          <InputForm
            property="title"
            obj={ticket}
            register={register}
            errors={errors}
          />
        </div>
        <div className="requestForm__form__module">
          <SelectForm
            property="module"
            obj={ticket}
            options={config.module}
            register={register}
            errors={errors}
          />
        </div>
        <div className="requestForm__form__type">
          <SelectForm
            property="type"
            obj={ticket}
            options={config.type}
            register={register}
            errors={errors}
          />
        </div>
        <div className="requestForm__form__source">
          <SelectForm
            property="source"
            obj={ticket}
            options={config.source}
            register={register}
            errors={errors}
          />
        </div>
        <div className="requestForm__form__comment">
          <TextAreaForm
            property="comment"
            obj={ticket}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div className="requestForm__save">
        <Button label="Submit" />
      </div>
      <div className="requestForm__cancel">
        <Button label="Cancel" onClick={onCancel} type="button" />
      </div>
    </form>
  );
};

export default RequestForm;
