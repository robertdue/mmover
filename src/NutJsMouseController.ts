import { injectable } from "inversify";
import { mouse, Point } from "@nut-tree-fork/nut-js";
import { MousePosition } from "./MousePosition";
import { IMouseController } from "./IMouseController";

@injectable()
export class NutJsMouseController implements IMouseController {
    async getPosition(): Promise<MousePosition> {
        const point = await mouse.getPosition();
        return { x: point.x, y: point.y };
    }

    async moveTo(x: number, y: number): Promise<void> {
        await mouse.setPosition(new Point(x, y));
    }
}
