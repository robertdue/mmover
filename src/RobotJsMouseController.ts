import { injectable } from "inversify";
import { getMousePos, moveMouse } from "robotjs";
import { MousePosition } from "./MousePosition";
import { IMouseController } from "./IMouseController";

@injectable()
export class RobotJsMouseController implements IMouseController {
    getPosition(): MousePosition {
        return getMousePos();
    }

    moveTo(x: number, y: number): void {
        moveMouse(x, y);
    }
}
