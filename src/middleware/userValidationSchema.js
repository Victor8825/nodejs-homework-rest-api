const Joi = require("joi");

const joiUserValidationSchema = Joi.object({
  password: Joi.string().alphanum().min(5).required(),
  email: Joi.string().email().required(),
});

const joiUserSubscriptionUpdateValidationSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  joiUserValidationSchema,
  joiUserSubscriptionUpdateValidationSchema,
};
