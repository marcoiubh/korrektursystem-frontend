import '../css/App.css';
import { getCurrentUser } from './services/authenticationService';
import { saveTicket } from './services/ticketService';
import { useNavigate } from 'react-router-dom';
import config from '../config/config.json';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const NewTicket = () => {
  // TODO: swap config.module to database query for each user
  const [module] = useState(config.module);
  const [source] = useState(config.source);
  // config.ticket required to avoid uncontrolled component errors
  const [ticket] = useState(config.ticket);
  const [type] = useState(config.type);
  const navigate = useNavigate();

  const JoiSchema = Joi.object({
    source: Joi.required()
      .valid('Script', 'Vodcast', 'App', 'Excercises', 'OnlineQuiz')
      .messages({
        'any.only': 'This is a required field',
      }),
    type: Joi.required()
      .valid('Notice', 'Error', 'Proposal', 'Improvement')
      .messages({
        'any.only': 'This is a required field',
      }),
    module: Joi.required()
      .valid(
        'BSTA01-01',
        'IOBP02',
        'IGIS01',
        'IREN01',
        'DLBINGE04',
        'ISPE01'
      )
      .messages({
        'any.only': 'This is a required field',
      }),
    _id: Joi.any(),
    date: Joi.any(),
    student: Joi.any(),
    title: Joi.string()
      .required()
      .messages({ 'string.empty': 'This is a required field' }),
    comment: Joi.string()
      .required()
      .messages({ 'string.empty': 'This is a required field' }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(JoiSchema),
  });

  const handleSave = async (e) => {
    // copy new value into existing values
    const ticketCopy = Object.assign(ticket, e);
    // stores states

    ticketCopy.student = getCurrentUser();

    // ticket gets updated if validation passes
    saveTicket(ticketCopy);
    navigate('/tickets');
    window.location.reload(false);
  };

  const handleCancel = (e) => {
    navigate('/tickets');
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
            <div className="input-group mb-3">
              <span className="input-group-text">Module</span>
              <select
                name="module"
                {...register('module')}
                className={`form-select ${
                  errors.module ? 'is-invalid' : ''
                }`}
              >
                <option>module</option>
                {module.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors.module?.message}
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="input-group col-sm-6 mb-3 ">
              <span className="input-group-text" id="basic-addon1">
                Title
              </span>
              <input
                type="text"
                name="title"
                defaultValue={ticket.title}
                {...register('title')}
                className={`form-control ${
                  errors.title ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.title?.message}
              </div>
            </div>
          </div>
        </div>

        <div className="row g-1">
          <div className="col-sm-6 ">
            <div className="input-group col-sm-6 mb-3 ">
              <span className="input-group-text" id="basic-addon1">
                Comment
              </span>
              <textarea
                type="text"
                name="comment"
                defaultValue={ticket.comment}
                {...register('comment')}
                className={`form-control ${
                  errors.comment ? 'is-invalid' : ''
                }`}
                rows="4"
              />
              <div className="invalid-feedback">
                {errors.comment?.message}
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="input-group mb-3">
              <span className="input-group-text">Type</span>
              <select
                name="type"
                defaultValue={ticket.type}
                {...register('type')}
                className={`form-select ${
                  errors.type ? 'is-invalid' : ''
                }`}
              >
                <option>type</option>
                {type.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors.type?.message}
              </div>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Source</span>
              <select
                name="source"
                defaultValue={ticket.source}
                {...register('source')}
                className={`form-select ${
                  errors.source ? 'is-invalid' : ''
                }`}
              >
                <option>source</option>
                {source.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors.source?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="row-sm-0">
          <button className="btn btn-outline-primary small m-1">
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-outline-primary small m-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTicket;
