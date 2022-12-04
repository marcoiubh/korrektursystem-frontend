import React, { useState, useEffect } from 'react';
import config from '../../config/config.json';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const Response = ({ ticket, onSave }) => {
  const JoiSchema = Joi.object({
    statement: Joi.string().required().messages({
      'string.emtpy': 'This is a required field',
    }),
    priority: Joi.required()
      .valid('Critical', 'Major', 'Medium', 'Minor')
      .messages({
        'any.only': 'This is a required field',
      }),
    status: Joi.string()
      .required()
      .valid('Pending', 'In Progress', 'Done')
      .messages({
        'any.only': 'This is a required field',
      }),
    comment: Joi.any(),
    date: Joi.any(),
    module: Joi.any(),
    source: Joi.any(),
    student: Joi.any(),
    title: Joi.any(),
    type: Joi.any(),
    _id: Joi.any(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(JoiSchema),
  });

  useEffect(() => {
    setValue('statement', ticket.statement);
    setValue('priority', ticket.priority);
    setValue('status', ticket.status);
    clearErrors();
  }, [ticket, onSave]);

  useEffect(() => {}, []);

  const [priority] = useState(config.priority);
  const [status] = useState(config.status);

  const onError = () => {
    console.error(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSave, onError)}>
      <div className="row g-1">
        <div className="input-group col-sm-6 mb-3 ">
          <span className="input-group-text" id="basic-addon1">
            Statement
          </span>
          <textarea
            type="text"
            name="statement"
            defaultValue={ticket.statement}
            {...register('statement')}
            className={`form-control ${
              errors.statement ? 'is-invalid' : ''
            }`}
            rows="4"
          />
          <div className="invalid-feedback">
            {errors.statement?.message}
          </div>
        </div>

        <div className="col-sm-6 mb-3">
          <div className="input-group col-sm-6 ">
            <span className="input-group-text">Priority</span>
            <select
              name="priority"
              defaultValue={ticket.priority}
              {...register('priority')}
              className={`form-select ${
                errors.priority ? 'is-invalid' : ''
              }`}
            >
              <option>priority</option>
              {priority.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <div className="invalid-feedback">
              {errors.priority?.message}
            </div>
          </div>
          <div className="input-group col-sm-6 mb-3 ">
            <span className="input-group-text">Status</span>
            <select
              name="status"
              defaultValue={ticket.status}
              {...register('status')}
              className={`form-select ${
                errors.status ? 'is-invalid' : ''
              }`}
            >
              <option>status</option>
              {status.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <div className="invalid-feedback">
              {errors.status?.message}
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-outline-primary small m-1 ">
        Save
      </button>
    </form>
  );
};

export default Response;
