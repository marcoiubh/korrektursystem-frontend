import Joi from 'joi';

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

const ResponseSchema = Joi.object({
  statement: Joi.string().required().messages({
    'string.emtpy': 'This is a required field',
  }),
  priority: Joi.required()
    .valid('Critical', 'Major', 'Medium', 'Minor')
    .messages({
      'any.only': 'This is a required field',
    }),
  status: Joi.string()
    .required()
    .valid('Pending', 'In Progress', 'Done')
    .messages({
      'any.only': 'This is a required field',
    }),
  comment: Joi.any(),
  date: Joi.any(),
  module: Joi.any(),
  source: Joi.any(),
  student: Joi.any(),
  title: Joi.any(),
  type: Joi.any(),
  _id: Joi.any(),
});

const NewTicketSchema = Joi.object({
  source: Joi.required()
    .valid('Script', 'Vodcast', 'App', 'Excercises', 'OnlineQuiz')
    .messages({
      'any.only': 'This is a required field',
    }),
  type: Joi.required()
    .valid('Notice', 'Error', 'Proposal', 'Improvement')
    .messages({
      'any.only': 'This is a required field',
    }),
  module: Joi.required()
    .valid(
      'BSTA01-01',
      'IOBP02',
      'IGIS01',
      'IREN01',
      'DLBINGE04',
      'ISPE01'
    )
    .messages({
      'any.only': 'This is a required field',
    }),
  _id: Joi.any(),
  date: Joi.any(),
  student: Joi.any(),
  title: Joi.string()
    .required()
    .messages({ 'string.empty': 'This is a required field' }),
  comment: Joi.string()
    .required()
    .messages({ 'string.empty': 'This is a required field' }),
});

export { LoginSchema, ResponseSchema, NewTicketSchema };