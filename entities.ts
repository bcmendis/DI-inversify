import { injectable, inject } from "inversify";
import "reflect-metadata";
import { ApiManagerInterface} from "./interfaces";
import { TYPES } from "./types";

const BASE_API_URL = 'https://jsonplaceholder.typicode.com/todos';

@injectable()
export class TodoClient {
    private readonly base_url: string
  constructor(url?: string) {
    if(url)
        this.base_url = url;
    else
        this.base_url = 'https://jsonplaceholder.typicode.com/todos';
  }

  private async request() {

    let response;
    try {
        response = await fetch(this.base_url);
    }
    catch (e) {
      response = {
        ok: false,
        status: 500,
        json: async () => { return {
          code: 500,
          message: 'The server is unresponsive',
          description: e,
        }; }
      };
    }
    if(response.status === 200)
        return response.json();
    else
        return response.status;
  }

  public async get() {
    return this.request();
  }
}

@injectable()
export class ApiManager implements ApiManagerInterface {

    private readonly _TodoClient: TodoClient;

    public constructor(
	    @inject(TYPES.TodoClient) TodoClient: TodoClient,
    ) {
        this._TodoClient = TodoClient;
    }

    public async fetchData() { return this._TodoClient.get(); }

}
