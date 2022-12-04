import React, { useEffect } from 'react';
import config from '../../config/config.json';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ResponseSchema } from '../../config/joiSchema';
import TextAreaHook from './textAreaHook';
import SelectHook from './SelectHook';
import Button from './button';

const Response = ({ ticket, onSave }) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(ResponseSchema),
  });

  useEffect(() => {
    setValue('statement', ticket.statement);
    setValue('priority', ticket.priority);
    setValue('status', ticket.status);
    clearErrors();
  }, [setValue, clearErrors, ticket]);

  const onError = () => {
    console.error(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSave, onError)}>
      <div className="row g-1">
        <TextAreaHook
          property="statement"
          obj={ticket}
          register={register}
          errors={errors}
        />
        <div className="col-sm-6 mb-3">
          <SelectHook
            property="priority"
            obj={ticket}
            options={config.priority}
            register={register}
            errors={errors}
          />

          <SelectHook
            property="status"
            obj={ticket}
            options={config.status}
            register={register}
            errors={errors}
          />
        </div>
        <Button label="Save" />
      </div>
    </form>
  );
};

export default Response;
