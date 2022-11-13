import Joi from 'joi-browser';
import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import Date from './subcomponents/date';
import Input from './subcomponents/input';
import Select from './subcomponents/select';
import TextArea from './subcomponents/textarea';
import Calendar from 'react-calendar';
import { getTicket, saveTicket, updateTicket } from './util/database';
import config from '../config/config.json';

const TicketDetails = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [ticket, setTicket] = useState(config.ticket);

  const [errors, setErrors] = useState({});

  const schema = {
    _id: Joi.toString(),
    title: Joi.string().required().label('Title'),
    module: Joi.array().min(1).label('Module'),
    type: Joi.array().min(1).label('Type'),
    source: Joi.array().min(1).label('Source'),
    status: Joi.array().min(1).label('Status'),
    comment: Joi.toString(),
    priority: Joi.toString(),
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: ticket } = await getTicket(params.id);
      setTicket(ticket[0]);
    };
    fetchData(params.id);
  }, []);

  const validate = () => {
    // const options = { abortEarly: false };
    // const { error } = Joi.validate(ticket, schema, options);
    // if (!error) return null;
    // for (let item of error.details)
    //   errors[item.path[0]] = item.message;
    // return errors;
  };

  const validateProperty = ({ name, value }) => {
    // const obj = { [name]: value };
    // const schemaCopy = { [name]: schema[name] };
    // const { error } = Joi.validate(obj, schemaCopy);
    // return error ? error.details[0].message : null;
  };

  const handleSave = (e) => {
    e.preventDefault();
    // const errors = validate();
    // setErrors({ errors: errors || {} });
    // if (errors) return;
    updateTicket(ticket);
    navigate('/tickets');
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
    navigate('/tickets');
  };

  return (
    <div className="container">
      <h1>Ticket details</h1>
      <p>Ticket number # {params.id} </p>
      <form onSubmit={handleSave}>
        <Input
          name="date"
          value={ticket.date}
          onChange={handleChange}
          error={errors.date}
        />
        <Input
          name="priority"
          value={ticket.priority}
          onChange={handleChange}
          error={errors.priority}
        />
        <Input
          name="title"
          value={ticket.title}
          onChange={handleChange}
          error={errors.title}
        />
        <Input
          name="module"
          value={ticket.module}
          onChange={handleChange}
          error={errors.module}
        />
        <Input
          name="type"
          value={ticket.type}
          onChange={handleChange}
          error={errors.type}
        />
        <Input
          name="source"
          value={ticket.source}
          onChange={handleChange}
          error={errors.source}
        />
        <Input
          name="status"
          value={ticket.status}
          onChange={handleChange}
          error={errors.status}
        />
        <Input
          name="comment"
          value={ticket.comment}
          onChange={handleChange}
          error={errors.comment}
        />
        <button
          disabled={validate()}
          className="btn btn-outline-primary small m-2"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="btn btn-outline-primary small m-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TicketDetails;
