import React, { useEffect, useState } from 'react';
import { getTicket } from './services/ticketService';
import { useParams } from 'react-router-dom';

const TicketStatus = () => {
  const [ticket, setTicket] = useState();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data: ticket } = await getTicket(params.id);
      setTicket(ticket[0]);
    };
    fetchData();
  }, []);

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="false"
    >
      <pre>Ticket #: {ticket._id}</pre>
      <pre>Date: {ticket.date}</pre>
      <pre>Title: {ticket.title}</pre>
      <pre>Module: {ticket.module}</pre>
      <pre>Type: {ticket.type}</pre>
      <pre>Source: {ticket.source}</pre>
      <pre>Status: {ticket.status}</pre>
      <pre>Comment: {ticket.comment}</pre>
      <pre>Statement: {ticket.statement}</pre>
      {/* <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="..." className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>
              Some representative placeholder content for the first
              slide.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="..." className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>
              Some representative placeholder content for the second
              slide.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="..." className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>
              Some representative placeholder content for the third
              slide.
            </p>
          </div>
        </div>
      </div> */}
      {/* <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button> */}
    </div>
  );
};

export default TicketStatus;
