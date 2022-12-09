import { useForm } from 'react-hook-form';
import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import InputHook from './subcomponents/atomicHooks/InputHook';
import Button from './subcomponents/atomic/button';
import { ContactSchema } from '../config/joiSchema';
import TextAreaHook from './subcomponents/atomicHooks/textAreaHook';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from './services/emailService';

const Contact = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(ContactSchema),
  });

  const handleSend = async (e) => {
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

  return (
    <div className="container">
      <h1>Contact</h1>

      <form
        className="col-sm-4 mt-lg-5"
        onSubmit={handleSubmit(handleSend)}
      >
        <InputHook
          property="issue"
          obj=""
          register={register}
          errors={errors}
        />
        <TextAreaHook
          property="description"
          obj=""
          register={register}
          errors={errors}
        />
        <Button label="Send" />
      </form>
    </div>
  );
};

export default Contact;
