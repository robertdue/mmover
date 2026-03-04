import { MousePosition } from "./MousePosition";

export interface IMouseController {
    getPosition(): Promise<MousePosition>;
    moveTo(x: number, y: number): Promise<void>;
}
