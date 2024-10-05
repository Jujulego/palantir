export class FetchError extends Error {
  // Constructor
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(`${status}: ${message}`);
  }
}