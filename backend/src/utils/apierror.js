/**
 * Custom API error class that extends the native Error.
 * Carries HTTP status code and structured error details for consistent error handling.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (4xx / 5xx)
   * @param {string} message - Human-readable error message
   * @param {Array} errors - Optional array of field-level validation errors
   */
  constructor( data, message = "Something went wrong", errors = []) {
    super(message);
    this.errors = errors;
    this.data = data;

    // Maintain proper stack trace (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
