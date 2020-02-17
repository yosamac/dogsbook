export default (error, request, response, next) => {
  const { joi = {} } = error;
  if (joi.isJoi) {
    error = {
      statusCode: 400,
      name: joi.name,
      message: joi.details[0].message,
    };
  }
  return response.status(error.statusCode || 500).json({
    error: {
      ...error,
    },
  });
};
