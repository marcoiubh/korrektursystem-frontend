import React, { useState } from 'react';
import config from '../../config/config.json';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ifUserIsStudent } from '../services/authenticationService';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const TicketDetail = ({ ticket, onSave }) => {
  const navigate = useNavigate();
  const [priority] = useState(config.priority);
  const [status] = useState(config.status);

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
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(JoiSchema),
  });
  // // config.ticket required to avoid uncontrolled component errors
  // const [currentPage, setCurrentPage] = useState(1);
  // const [ticket, setTicket] = useState(config.ticket);
  // const [tickets, setTickets] = useState([config.ticket]);
  // const [, setTicketsPaginated] = useState([config.ticket]);
  // const [totalCount, setTotalCount] = useState(0);
  // const navigate = useNavigate();
  // const params = useParams();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data: ticket } = await getTicket(params.id);
  //     const { data: tickets } = await getTickets();
  //     setTickets(tickets);
  //     setTicket(ticket[0]);
  //     setCurrentPage(
  //       tickets.map((t) => t._id).indexOf(ticket[0]._id) + 1
  //     );
  //     setTicketsPaginated(paginate(tickets, currentPage, '1'));
  //     setTotalCount(tickets.length);
  //   };
  //   fetchData();
  // }, []);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  //   setTicket(tickets[page - 1]);
  // };

  const handleCancel = (e) => {
    navigate('/ticket/overview');
  };

  return (
    <div className="container">
      <div className="gy-3">
        <h1>Ticket status</h1>
        <p>Ticket number # {ticket._id} </p>
      </div>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="row g-1">
          <div className="col-sm-3">
            <div className="input-group col-sm-6 mb-3">
              <span className="input-group-text" id="basic-addon1">
                Date
              </span>
              <input
                disabled
                type="text"
                name="date"
                value={moment(ticket.date).format(config.dateFormat)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="input-group col-sm-6 mb-3">
              <span className="input-group-text" id="basic-addon1">
                Module
              </span>
              <input
                disabled
                type="text"
                name="module"
                value={ticket.module}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-sm-5">
            <div className="input-group col-sm-6 mb-3">
              <span className="input-group-text" id="basic-addon1">
                Title
              </span>
              <input
                disabled
                type="text"
                name="title"
                value={ticket.title}
                className="form-control"
              />
            </div>{' '}
          </div>
        </div>

        <div className="row g-1">
          <div className="col-sm-6 ">
            <div className="input-group col-sm-6 mb-3">
              <span className="input-group-text" id="basic-addon1">
                Comment
              </span>
              <textarea
                disabled
                type="text"
                name="comment"
                value={ticket.comment}
                className="form-control"
                rows="4"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="input-group col-sm-6 mb-3">
              <span className="input-group-text" id="basic-addon1">
                Type
              </span>
              <input
                disabled
                type="text"
                name="type"
                value={ticket.type}
                className="form-control"
              />
            </div>
            <div className="input-group col-sm-6 mb-3">
              <span className="input-group-text" id="basic-addon1">
                Source
              </span>
              <input
                disabled
                type="text"
                name="source"
                value={ticket.source}
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row g-1">
          <div className="col-sm-6 ">
            <div className="input-group col-sm-6 mb-3">
              <span className="input-group-text" id="basic-addon1">
                Statement
              </span>
              <textarea
                disabled
                type="text"
                name="statement"
                value={ticket.statement}
                className="form-control"
                rows="4"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="input-group col-sm-6 mb-3">
              <span className="input-group-text" id="basic-addon1">
                Status
              </span>
              <input
                disabled //={ifUserIsStudent()}
                type="text"
                name="status"
                value={ticket.status}
                className="form-control"
              />
            </div>
          </div>
        </div>
        {!ifUserIsStudent() && (
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
        )}
        <div className="row-sm-0">
          <div className="col-sm-6">
            {/* <Pagination
            itemsCount={totalCount}
            pageSize={1}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          /> */}
            {!ifUserIsStudent() && (
              <button className="btn btn-outline-primary small m-1 ">
                Save
              </button>
            )}
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-outline-primary small m-1"
            >
              Overview
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketDetail;
