export default class ErrorResponse extends Error {
  /**
   * Exception that recives an error message and a boolean.
   */
  toResponseJSON: boolean;
  constructor(message?: string, toResponseJSON?: boolean) {
    super(message);
    /** If true we pass the console log as response. */
    this.toResponseJSON = toResponseJSON;
  }
}

/**
 * Three behaviours:
 * - throw new Error() sould be same as throw new Error(). (defaultErrorMessage in res: Response)
 * - throw new ErrorResponse("message") should log it in console but return defaultErrorMessage in res: Response.
 * - throw new ErrorResponse("message", true) should log it in console and return it in res: Response.
 */
