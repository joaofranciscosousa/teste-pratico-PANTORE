const returnServerError = ({ res, error, status = 500, extraData = {} }) => {
  console.error("=== Error ===\n", error, "\n");

  const errorMessage = error.message ?? error;

  res.status(status).json({
    message: status
      ? errorMessage
      : `Erro interno do servidor! (${errorMessage})`,
    ...extraData,
  });
};

export default returnServerError;
