import Joi from 'joi-browser';
import React, { useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import Date from './subcomponents/date';
import Input from './subcomponents/input';
import Select from './subcomponents/select';
import TextArea from './subcomponents/textarea';
import Calendar from 'react-calendar';

const TicketDetails = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [ticket, setTicket] = useState({
    date: '',
    title: '',
    module: [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
    ],
    type: [
      { id: '1', name: 'Error' },
      { id: '2', name: 'Notice' },
      { id: '3', name: 'Suggestion' },
    ],
    source: [
      { id: '1', name: 'Script' },
      { id: '2', name: 'Vodcast' },
      { id: '3', name: 'App' },
    ],
    status: [
      { id: '1', name: 'Pending' },
      { id: '2', name: 'In progress' },
      { id: '3', name: 'Waiting for reply' },
      { id: '4', name: 'Done' },
    ],
    comment: '',
  });
  const [errors, setErrors] = useState({});

  const schema = {
    title: Joi.string().required().label('Title'),
    module: Joi.array().min(1).label('Module'),
    type: Joi.array().min(1).label('Type'),
    source: Joi.array().min(1).label('Source'),
    status: Joi.array().min(1).label('Status'),
  };

  const doSubmit = () => {
    console.log('submitted');
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(ticket, schema, options);
    if (!error) return null;

    for (let item of error.details)
      errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaCopy = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaCopy);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors({ errors: errors || {} });
    if (errors) return;

    doSubmit();
  };

  const handleChange = ({ target: input }) => {
    const errorsCopy = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorsCopy[input.name] = errorMessage;
    else delete errorsCopy[input.name];

    const ticketCopy = { ...ticket };
    ticketCopy[input.name] = input.value;
    setTicket(ticketCopy);
    setErrors(errorsCopy);
  };

  const handleCancel = (e) => {
    console.log('cancelled');
    navigate(-1);
  };

  return (
    <div className="container">
      <h1>Ticket details</h1>
      <p>Ticket number # {params.id} </p>

      <form onSubmit={handleSubmit}>
        {/* <Calendar onChange={handleChange} value={ticket.date} />
        <Date
          name="date"
          value={ticket.date}
          onChange={handleChange}
          error={errors.date}
        /> */}
        <Input
          name="title"
          value={ticket.title}
          onChange={handleChange}
          error={errors.title}
        />
        <Select
          name="module"
          options={ticket.module}
          onChange={handleChange}
          error={errors.module}
        />
        <Select
          name="type"
          options={ticket.type}
          onChange={handleChange}
          error={errors.type}
        />
        <Select
          name="source"
          options={ticket.source}
          onChange={handleChange}
          error={errors.source}
        />
        <Select
          name="status"
          options={ticket.status}
          onChange={handleChange}
          error={errors.status}
        />
        <TextArea
          name="comment"
          options={ticket.comment}
          onChange={handleChange}
          error={errors.comment}
        />
        <button disabled={validate()} className="btn btn-primary">
          Save
        </button>
        <button
          onClick={handleCancel}
          className="btn btn-primary right"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TicketDetails;
