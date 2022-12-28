import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../../services/emailService';
import _ from 'lodash';
import IssueForm from '../subcomponents/composite/issueForm';
import '../../css/issue.css';

const Issue = () => {
  const navigate = useNavigate();

  const handleSend = async (e) => {
    const issue = {
      title: e.title,
      description: e.description,
    };

    await toast
      .promise(sendEmail(issue), {
        pending: 'Please wait...',
        success: 'Email has been sent.',
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

  const debouncedHandleSubmit = useMemo(
    () =>
      _.debounce(handleSend, 1000, {
        leading: true,
        trailing: false,
      }),
    []
  );

  return (
    <div className="issue">
      <IssueForm onSubmit={debouncedHandleSubmit} />
    </div>
  );
};

export default Issue;
