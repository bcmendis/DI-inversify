import dotenv from "dotenv";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { ApiManagerInterface } from "./interfaces";
import { TYPES } from "./types";
dotenv.config();

const BASE_API_URL = "https://jsonplaceholder.typicode.com/todos";

@injectable()
export class TodoClient {
  private readonly base_url: string;

  constructor() {
    this.base_url = BASE_API_URL;
  }

  private async request() {
    let response;
    try {
      response = await fetch(this.base_url);
    } catch (e) {
      response = {
        ok: false,
        status: 500,
        json: async () => {
          return {
            code: 500,
            message: "The server is unresponsive",
            description: e,
          };
        },
      };
    }
    if (response.ok) return response.json();
    else return null;
  }

  public async get() {
    return this.request();
  }
}

@injectable()
export class ApiManager implements ApiManagerInterface {
  private readonly _TodoClient: TodoClient;

  public constructor(@inject(TYPES.TodoClient) TodoClient: TodoClient) {
    this._TodoClient = TodoClient;
  }

  public async fetchData() {
    return this._TodoClient.get();
  }
}
