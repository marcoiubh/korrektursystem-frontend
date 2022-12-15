import React, { useMemo } from 'react';

import InputHook from '../subcomponents/atomicHooks/InputHook';
import Button from '../subcomponents/atomic/button';

import TextAreaHook from '../subcomponents/atomicHooks/textAreaHook';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../../services/emailService';
import _ from 'lodash';
import IssueForm from '../subcomponents/composite/issueForm';

const Contact = () => {
  const navigate = useNavigate();

  const handleSend = async (e) => {
    console.log('send');
    const issue = {
      issue: e.issue,
      description: e.description,
    };

    try {
      toast.success('Issue has been sent.');
      await sendEmail(issue);
      navigate('/ticket/overview');
    } catch (ex) {}
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
    <div className="container">
      <h1>Contact</h1>
      <IssueForm onSubmit={debouncedHandleSubmit} />
    </div>
  );
};

export default Contact;
