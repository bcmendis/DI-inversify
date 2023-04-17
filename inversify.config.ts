import { Container } from "inversify";
import { TYPES } from "./types";
import { ApiManagerInterface} from "./interfaces";
import { ApiManager, TodoClient} from "./entities";

const myContainer = new Container();
myContainer.bind<ApiManagerInterface>(TYPES.ApiManager).to(ApiManager);
myContainer.bind(TYPES.TodoClient).to(TodoClient);

export { myContainer };