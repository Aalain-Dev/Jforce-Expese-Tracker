class ApiError extends Error {
  constructor(data, message = "Something went wrong", errors = []) {
    super(message);
    this.errors = errors;
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
