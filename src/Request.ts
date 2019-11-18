import MovieDBApiCredentials from './MovieDBApi/MovieDBApiCredentials';

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
        throw new Error(fetchRequest.statusText);
      }


      const json = await fetchRequest.json();
      return json;
    }
}
