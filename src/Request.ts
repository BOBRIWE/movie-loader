import MovieDBApiCredentials from './MovieDBApi/MovieDBApiCredentials';
import IResponseError from '@/MovieDBApi/IResponseError';
import ErrorResponse from '@/MovieDBApi/ErrorResponse';

export default class Request {
    private readonly requestPath: string;

    constructor(requestPath: string) {
      this.requestPath = requestPath;
    }

    async get<TResponse>(): Promise<TResponse> {
      const fetchRequest = await fetch(
        MovieDBApiCredentials.apiRoot + this.requestPath,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8;',
            Authorization: `Bearer ${MovieDBApiCredentials.accessToken}`,
          },
        },
      );

      if (!fetchRequest.ok) {
        const error: IResponseError = await fetchRequest.json();
        throw new ErrorResponse(error);
      }

      return fetchRequest.json();
    }
}
