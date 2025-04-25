export const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    success: false,
  });
};

export default errorMiddleware;