import Joi from 'joi';
import config from '../config/config.json';

const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'This is a required field',
      'string.email': 'A valid email is required',
    }),
  password: Joi.string()
    .required()
    .messages({ 'string.empty': 'A valid password is required' }),
});

const IssueSchema = Joi.object({
  title: Joi.string().required().max(20).messages({
    'string.empty': 'This is a required field',
    'string.max': '20 characters max',
  }),
  description: Joi.string().required().min(10).messages({
    'string.empty': 'This is a required field',
    'string.min': '10 characters min',
  }),
});

const ResponseSchema = Joi.object({
  statement: Joi.string().required().messages({
    'string.emtpy': 'This is a required field',
  }),
  priority: Joi.required()
    .valid(...config.priority)
    .messages({
      'any.required': 'This is a required field',
      'any.only': 'This is a required field',
    }),
  status: Joi.string()
    .required()
    .valid(...config.status)
    .messages({
      'any.required': 'This is a required field',
      'any.only': 'This is a required field',
    }),
});

const NewTicketSchema = Joi.object({
  source: Joi.required()
    .valid(...config.source)
    .messages({
      'any.required': 'This is a required field',
      'any.only': 'This is a required field',
    }),
  type: Joi.required()
    .valid(...config.type)
    .messages({
      'any.required': 'This is a required field',
      'any.only': 'This is a required field',
    }),
  module: Joi.required()
    .valid(...config.module)
    .messages({
      'any.required': 'This is a required field',
      'any.only': 'This is a required field',
    }),
  title: Joi.string().max(20).required().messages({
    'string.empty': 'This is a required field',
    'string.max': '20 characters max',
  }),
  comment: Joi.string()
    .required()
    .messages({ 'string.empty': 'This is a required field' }),
});

export { LoginSchema, IssueSchema, ResponseSchema, NewTicketSchema };
