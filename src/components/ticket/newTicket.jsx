import { saveTicket } from '../../services/ticketService';
import { useNavigate } from 'react-router-dom';
import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import { getFormattedTimestamp } from '../../services/getFormattedTimestamp';
import _ from 'lodash';
import RequestForm from '../subcomponents/composite/requestForm';

const NewTicket = ({ user }) => {
  let ticket = {};
  const navigate = useNavigate();

  const handleSave = async (inputValues) => {
    ticket = {
      ...inputValues,
      // associate student with the new ticket
      student: user.email,
      date: Date.now(),
      status: 'New',
      // new ticket has not been read by a professor
      readProfessor: false,
      readStudent: true,
      history: `${getFormattedTimestamp(Date.now())} : ${
        user.email
      } \n`,
    };

    await toast
      .promise(saveTicket(ticket), {
        pending: 'Please wait...',
        success: 'Ticket has been created.',
        error: {
          render({ data: error }) {
            return error.response.data;
          },
        },
      })
      .then(() => {
        navigate('/ticket/overview');
      });
  };

  const debouncedHandleSave = useMemo(
    () =>
      _.debounce(handleSave, 1000, {
        leading: true,
        trailing: false,
      }),
    []
  );

  const handleCancel = () => {
    navigate('/ticket/overview');
  };

  return (
    <RequestForm
      ticket={ticket}
      onSave={debouncedHandleSave}
      onCancel={handleCancel}
    />
  );
};

export default NewTicket;
