import { MousePosition } from "./MousePosition";

export interface IMouseController {
    getPosition(): MousePosition;
    moveTo(x: number, y: number): void;
}
