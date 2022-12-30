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
      className="newTicket"
      onSubmit={handleSubmit(onSave, onErrors)}
    >
      <div className="newTicket_headline">
        <h1>New Ticket</h1>
      </div>
      <div className="newTicket_form">
        <div className="newTicket_title">
          <InputHook
            property="title"
            obj={ticket}
            register={register}
            errors={errors}
          />
        </div>
        <div className="newTicket_module">
          <SelectHook
            property="module"
            obj={ticket}
            options={config.module}
            register={register}
            errors={errors}
          />
        </div>
        <div className="newTicket_type">
          <SelectHook
            property="type"
            obj={ticket}
            options={config.type}
            register={register}
            errors={errors}
          />
        </div>
        <div className="newTicket_source">
          <SelectHook
            property="source"
            obj={ticket}
            options={config.source}
            register={register}
            errors={errors}
          />
        </div>
        <div className="newTicket_comment">
          <TextAreaHook
            property="comment"
            obj={ticket}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div className="newTicket_save">
        <Button label="Submit" />
      </div>
      <div className="newTicket_cancel">
        <Button label="Cancel" onClick={onCancel} type="button" />
      </div>
    </form>
  );
};

export default RequestForm;
