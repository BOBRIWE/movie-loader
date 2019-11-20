import IResponseError from '@/MovieDBApi/IResponseError';

export default class ErrorResponse extends Error implements IResponseError {
  private e: IResponseError;

  constructor(e: IResponseError) {
    super(e.status_message);
    this.e = e;
  }

  // eslint-disable-next-line camelcase
  get status_code(): number {
    return this.e.status_code;
  }

  // eslint-disable-next-line camelcase
  get status_message(): string {
    return this.e.status_message;
  }
}
