import React, { useEffect } from 'react';
import config from '../../../config/config.json';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ResponseSchema } from '../../../config/joiSchema';
import TextAreaHook from '../atomicHooks/textAreaHook';
import SelectHook from '../atomicHooks/SelectHook';
import Button from '../atomic/button';
import '../../../css/response.css';

const ResponseForm = ({ ticket, onSave }) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
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
    <form
      className={`response__form ${
        ticket.mark ? 'ticketDetail__mark' : null
      }`}
      onSubmit={handleSubmit(onSave, onError)}
    >
      <p className="response__form__heading">Professor response</p>

      <div className="response__form__priority">
        <SelectHook
          property="priority"
          obj={ticket}
          options={config.priority}
          register={register}
          errors={errors}
        />
      </div>
      <div className="response__form__status">
        <SelectHook
          property="status"
          obj={ticket}
          options={config.status}
          register={register}
          errors={errors}
        />
      </div>
      <div className="response__form__statement">
        <TextAreaHook
          property="statement"
          obj={ticket}
          register={register}
          errors={errors}
        />
      </div>
      <div className="response__form__save">
        <Button label="Save" />
      </div>
    </form>
  );
};

export default ResponseForm;
