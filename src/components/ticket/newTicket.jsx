import '../../css/App.css';
import { saveTicket } from '../services/ticketService';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config.json';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { NewTicketSchema } from '../../config/joiSchema';
import SelectHook from '../subcomponents/atomicHooks/SelectHook';
import TextAreaHook from '../subcomponents/atomicHooks/textAreaHook';
import InputHook from '../subcomponents/atomicHooks/InputHook';
import Button from '../subcomponents/atomic/button';
import { toast } from 'react-toastify';

const NewTicket = ({ user }) => {
  // config.ticket required to avoid uncontrolled component errors
  const [ticket, setTicket] = useState(config.ticket);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(NewTicketSchema),
  });

  useEffect(() => {
    setTicket({});
  }, []);

  const handleSave = async (e) => {
    // copy new value into existing values
    const ticketCopy = Object.assign(ticket, e);
    // associate student with the new ticket
    ticketCopy.student = user;
    ticketCopy.date = Date.now();

    try {
      await saveTicket(ticketCopy);
      toast.success('Ticket has been created.');
      navigate('/ticket/overview');
    } catch (error) {
      toast.error('An error occured.');
    }
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
