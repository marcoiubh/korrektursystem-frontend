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

    const id = toast.loading('Please wait...');
    await sendEmail(issue)
      .then((res) => {
        toast.update(id, {
          render: res.data,
          type: 'success',
          isLoading: false,
        });
        navigate('/ticket/overview');
      })
      .catch((err) => {
        toast.update(id, {
          render: err.response.data,
          autoClose: 3000,
          type: 'error',
          isLoading: false,
        });
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
