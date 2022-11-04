const validationBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next({ status: 400, message: error.details[0].message });
    }
    next();
  };
};

module.exports = {
  validationBody,
};
