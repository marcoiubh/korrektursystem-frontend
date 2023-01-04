import React, { useEffect } from 'react';
import config from '../../../config/config.json';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ResponseSchema } from '../../../config/joiSchema';
import TextAreaForm from '../atomic/TextAreaForm';
import SelectForm from '../atomic/SelectForm';
import Button from '../atomic/Button';
import '../../../css/response.css';

const ResponseForm = ({ ticket, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(ResponseSchema),
  });

  useEffect(() => {
    let defaultValues = {};
    defaultValues.statement = ticket.statement;
    defaultValues.priority = ticket.priority;
    defaultValues.status = ticket.status;
    reset({ ...defaultValues });
  }, [ticket]);

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
        <SelectForm
          property="priority"
          obj={ticket}
          options={config.priority}
          register={register}
          errors={errors}
        />
      </div>
      <div className="response__form__status">
        <SelectForm
          property="status"
          obj={ticket}
          options={config.status}
          register={register}
          errors={errors}
        />
      </div>
      <div className="response__form__statement">
        <TextAreaForm
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
