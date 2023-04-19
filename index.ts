import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { ApiManagerInterface } from "./interfaces";

dotenv.config();

const app: Express = express();
// const port = process.env.PORT;
const port = 5000;

const test = myContainer.get<ApiManagerInterface>(TYPES.ApiManager);


app.get("/", async (req: Request, res: Response) => {
  const conResult = await test.fetchData();
  res.send(conResult);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
