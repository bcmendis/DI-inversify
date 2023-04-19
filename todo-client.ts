
import { injectable } from "inversify";
import "reflect-metadata";


const BASE_API_URL = "https://jsonplaceholder.typicode.com/todos";

@injectable()
export default class TodoClient {
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
