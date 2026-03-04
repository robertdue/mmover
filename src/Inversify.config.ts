import "reflect-metadata";
import { Container } from "inversify";
import { config } from 'dotenv';
import { Worker } from "./Worker";
import { TYPES } from "./Types";
import { MousePositionWorker } from "./MousePositionWorker";
import { IMouseController } from "./IMouseController";
import { NutJsMouseController } from "./NutJsMouseController";
import { IMoveStrategy } from "./IMoveStrategy";
import { ToggleMoveStrategy } from "./ToggleMoveStrategy";

config();

const container = new Container();
container.bind<Worker>(TYPES.Worker).to(MousePositionWorker);
container.bind<IMouseController>(TYPES.MouseController).to(NutJsMouseController);
container.bind<IMoveStrategy>(TYPES.MoveStrategy).to(ToggleMoveStrategy);
container.bind<number>(TYPES.Timeout).toConstantValue(Number.parseInt(process.env.TIMEOUT || '3000'));
container.bind<number>(TYPES.MoveMargin).toConstantValue(Number.parseInt(process.env.MOVE_MARGIN || '3'));

export { container };
