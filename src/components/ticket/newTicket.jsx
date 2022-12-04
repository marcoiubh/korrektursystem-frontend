import '../../css/App.css';
import { saveTicket } from '../services/ticketService';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config.json';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { NewTicketSchema } from '../../config/joiSchema';
import SelectHook from '../subcomponents/SelectHook';
import TextAreaHook from '../subcomponents/textAreaHook';
import InputHook from '../subcomponents/InputHook';
import Button from '../subcomponents/button';

const NewTicket = ({ user }) => {
  // config.ticket required to avoid uncontrolled component errors
  const [ticket] = useState(config.ticket);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(NewTicketSchema),
  });

  const handleSave = async (e) => {
    // copy new value into existing values
    const ticketCopy = Object.assign(ticket, e);
    // stores states
    ticketCopy.student = user;
    // ticket gets updated if validation passes
    saveTicket(ticketCopy);
    navigate('/ticket/overview');
    window.location.reload(false);
  };

  const handleCancel = (e) => {
    navigate('/ticket/overview');
  };

  const onErrors = (errors) => console.error(errors);

  return (
    <div className="container">
      <div className="gy-3">
        <h1>New Ticket</h1>
      </div>
      <form onSubmit={handleSubmit(handleSave, onErrors)}>
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
          <Button
            label="Cancel"
            onClick={handleCancel}
            type="button"
          />
        </div>
      </form>
    </div>
  );
};

export default NewTicket;
