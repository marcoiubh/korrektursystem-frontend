import React from 'react';
import InputHook from '../atomicHooks/InputHook';
import TextAreaHook from '../atomicHooks/textAreaHook';
import Button from '../atomic/button';
import config from '../../../config/config.json';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { NewTicketSchema } from '../../../config/joiSchema';
import SelectHook from '../atomicHooks/SelectHook';

import '../../../css/newTicket.css';

const RequestForm = ({ ticket, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(NewTicketSchema),
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
          <InputHook
            property="title"
            obj={ticket}
            register={register}
            errors={errors}
          />
        </div>
        <div className="requestForm__form__module">
          <SelectHook
            property="module"
            obj={ticket}
            options={config.module}
            register={register}
            errors={errors}
          />
        </div>
        <div className="requestForm__form__type">
          <SelectHook
            property="type"
            obj={ticket}
            options={config.type}
            register={register}
            errors={errors}
          />
        </div>
        <div className="requestForm__form__source">
          <SelectHook
            property="source"
            obj={ticket}
            options={config.source}
            register={register}
            errors={errors}
          />
        </div>
        <div className="requestForm__form__comment">
          <TextAreaHook
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
