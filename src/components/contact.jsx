import { useForm } from 'react-hook-form';
import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import InputHook from './subcomponents/atomicHooks/InputHook';
import Button from './subcomponents/atomic/button';
import { ContactSchema } from '../config/joiSchema';
import TextAreaHook from './subcomponents/atomicHooks/textAreaHook';
import moment from 'moment';
import config from '../config/config.json';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from './services/emailService';

const Contact = ({ user }) => {
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
      user: user,
      email: e.email,
      date: moment(Date.now()).format(config.dateFormat),
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
        {/* for testing purposes only */}
        <InputHook
          property="email"
          placeholder="This field is for testing email functionality only."
          obj=""
          register={register}
          errors={errors}
        />
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
