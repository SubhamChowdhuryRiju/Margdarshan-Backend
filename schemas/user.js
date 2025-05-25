const Joi = require('joi');

// Define the schema
const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
});

module.exports = userValidationSchema;