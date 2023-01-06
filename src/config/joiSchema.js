import Joi from 'joi';
import config from '../config/config.json';

const LoginSchema = Joi.object({
  // email
  email: Joi.string()
    // option for non-IANA-listed TLDs
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'This is a required field',
      'string.email': 'A valid email is required',
    }),

  // password
  password: Joi.string()
    .required()
    .messages({ 'string.empty': 'A valid password is required' }),
});

const IssueSchema = Joi.object({
  // title
  title: Joi.string().required().max(20).messages({
    'string.empty': 'This is a required field',
    'string.max': '20 characters max',
  }),

  // description
  description: Joi.string().required().min(10).messages({
    'string.empty': 'This is a required field',
    'string.min': '10 characters min',
  }),
});

const ResponseSchema = Joi.object({
  // statement
  statement: Joi.string().required().messages({
    'string.emtpy': 'This is a required field',
  }),

  // priority
  priority: Joi.required()
    // get valid values from configuration file
    .valid(...config.priority)
    .messages({
      'any.required': 'This is a required field',
      'any.only': 'This is a required field',
    }),

  // status
  status: Joi.string()
    .required()
    // get valid values from configuration file
    .valid(...config.status)
    .messages({
      'any.required': 'This is a required field',
      'any.only': 'This is a required field',
    }),
});

const RequestSchema = Joi.object({
  // source
  source: Joi.required()
    // get valid values from configuration file
    .valid(...config.source)
    .messages({
      'any.required': 'This is a required field',
      'any.only': 'This is a required field',
    }),

  // type
  type: Joi.required()
    // get valid values from configuration file
    .valid(...config.type)
    .messages({
      'any.required': 'This is a required field',
      'any.only': 'This is a required field',
    }),

  // module
  module: Joi.required()
    // get valid values from configuration file
    .valid(...config.module)
    .messages({
      'any.required': 'This is a required field',
      'any.only': 'This is a required field',
    }),

  // title
  title: Joi.string().max(20).required().messages({
    'string.empty': 'This is a required field',
    'string.max': '20 characters max',
  }),

  // comment
  comment: Joi.string()
    .required()
    .messages({ 'string.empty': 'This is a required field' }),
});

export { LoginSchema, IssueSchema, ResponseSchema, RequestSchema };
