import { MousePosition } from "./MousePosition";

export interface IMoveStrategy {
    getNextPosition(current: MousePosition, margin: number): MousePosition;
}
