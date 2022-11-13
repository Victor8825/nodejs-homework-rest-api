const Joi = require("joi");

const joiSchemaPostContact = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().alphanum().min(7).required(),
});

const joiSchemaPutContact = Joi.object({
  name: Joi.string().min(7).optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});

const joiSchemaPatchContact = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  joiSchemaPostContact,
  joiSchemaPutContact,
  joiSchemaPatchContact,
};
