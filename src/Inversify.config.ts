import "reflect-metadata";
import { Container } from "inversify";
import { Worker } from "./Worker";
import { TYPES } from "./Types";
import { MousePositionWorker } from "./MousePositionWorker";
import { MousePosition } from "./MousePosition";
import { getMousePos } from "robotjs";

const container = new Container();
container.bind<Worker>(TYPES.Worker).to(MousePositionWorker)
container.bind<MousePosition>(TYPES.MousePosition).toConstantValue(getMousePos());

export { container };
