const Joi = require("joi");

const joiUserValidationSchema = Joi.object({
  password: Joi.string().alphanum().min(5).required(),
  email: Joi.string().email().required(),
});

module.exports = {
  joiUserValidationSchema,
};
