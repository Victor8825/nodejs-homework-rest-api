const Joi = require("joi");

const schemaPostContact = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().alphanum().min(7).required(),
});

const schemaPutContact = Joi.object({
  name: Joi.string().min(7).optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});

module.exports = {
  schemaPostContact,
  schemaPutContact,
};
