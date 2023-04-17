import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { TodoClient, ApiManager } from "./entities";
import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { ApiManagerInterface } from "./interfaces";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const test = myContainer.get<ApiManagerInterface>(TYPES.ApiManager);

// test
// expect(ninja.fight()).eql("cut!"); // true
// expect(ninja.sneak()).eql("hit!"); // true

app.get("/", async (req: Request, res: Response) => {
  //     const client = new TodoClient();
  //     const x=new ApiManager(client);

  //   res.send(await x.fetchData());
  await test.fetchData().then((result) => console.log(result));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
