import React from 'react';
import InputHook from '../atomicHooks/InputHook';
import TextAreaHook from '../atomicHooks/textAreaHook';
import Button from '../atomic/button';
import config from '../../../config/config.json';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { NewTicketSchema } from '../../../config/joiSchema';
import SelectHook from '../atomicHooks/SelectHook';

const NewTicketForm = ({ ticket, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(NewTicketSchema),
  });

  const onErrors = (error) => {
    console.error(error);
  };
  return (
    <form onSubmit={handleSubmit(onSave, onErrors)}>
      <div className="row g-1">
        <div className="col-sm-4">
          <SelectHook
            property="module"
            obj={ticket}
            options={config.module}
            register={register}
            errors={errors}
          />
        </div>
        <div className="col-sm-6">
          <InputHook
            property="title"
            obj={ticket}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div className="row g-1">
        <div className="col-sm-6 ">
          <TextAreaHook
            property="comment"
            obj={ticket}
            register={register}
            errors={errors}
          />
        </div>
        <div className="col-sm-6">
          <SelectHook
            property="type"
            obj={ticket}
            options={config.type}
            register={register}
            errors={errors}
          />
          <SelectHook
            property="source"
            obj={ticket}
            options={config.source}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="row-sm-0">
        <Button label="Submit" />
        <Button label="Cancel" onClick={onCancel} type="button" />
      </div>
    </form>
  );
};

export default NewTicketForm;
