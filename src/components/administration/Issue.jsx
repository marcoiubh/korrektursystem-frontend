import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../../services/emailService';
import _ from 'lodash';
import IssueForm from '../subcomponents/composite/IssueForm';
import '../../css/issue.css';

const Issue = () => {
  const navigate = useNavigate();

// send button
  const handleSend = async (inputValues) => {

    // get form field values
    const issue = {
      title: inputValues.title,
      description: inputValues.description,
    };

    // send email and wait for response
    await toast
      .promise(sendEmail(issue), {

        // display notification based on response
        pending: 'Please wait...',
        success: 'Email has been sent.',
        error: {
          render({ data: error }) {
            return error.response.data;
          },
        },
      })
      .then(() => {
        // return to overview when successful
        navigate('/ticket/overview');
      });
  };

  // debounce send button
  const debouncedHandleSend = useMemo(
    () =>
      _.debounce(handleSend, 1000, {
        leading: true,
        trailing: false,
      }),
    []
  );

  return (
    <div className="issue">
      <IssueForm onSubmit={debouncedHandleSend} />
    </div>
  );
};

export default Issue;
