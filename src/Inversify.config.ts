import "reflect-metadata";
import { Container } from "inversify";
import { getMousePos } from "robotjs";
import { config } from 'dotenv';
import { Worker } from "./Worker";
import { TYPES } from "./Types";
import { MousePositionWorker } from "./MousePositionWorker";
import { MousePosition } from "./MousePosition";

config();
const container = new Container();
container.bind<Worker>(TYPES.Worker).to(MousePositionWorker)
container.bind<MousePosition>(TYPES.MousePosition).toConstantValue(getMousePos());
container.bind<number>(TYPES.Timeout).toConstantValue(Number.parseInt(process.env.TIMEOUT || '3000'));
container.bind<number>(TYPES.MoveMargin).toConstantValue(Number.parseInt(process.env.MOVE_MARGIN || '3'));

export { container };
