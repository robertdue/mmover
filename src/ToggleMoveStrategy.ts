import { injectable } from "inversify";
import { MousePosition } from "./MousePosition";
import { IMoveStrategy } from "./IMoveStrategy";
import { Direction } from "./Direction";

@injectable()
export class ToggleMoveStrategy implements IMoveStrategy {
    private direction: Direction = Direction.Down;

    getNextPosition(current: MousePosition, margin: number): MousePosition {
        if (this.direction === Direction.Down) {
            this.direction = Direction.Up;
            return { x: current.x + margin, y: current.y + margin };
        } else {
            this.direction = Direction.Down;
            return { x: current.x - margin, y: current.y - margin };
        }
    }
}
