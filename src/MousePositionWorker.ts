import { inject, injectable } from "inversify";
import { Worker } from "./Worker";
import { IMouseController } from "./IMouseController";
import { IMoveStrategy } from "./IMoveStrategy";
import { MousePosition } from "./MousePosition";
import { TYPES } from "./Types";

@injectable()
export class MousePositionWorker implements Worker {
    private lastMousePosition: MousePosition;
    private intervalHandle: NodeJS.Timer | null = null;

    constructor(
        @inject(TYPES.MouseController) private readonly mouseController: IMouseController,
        @inject(TYPES.MoveStrategy) private readonly moveStrategy: IMoveStrategy,
        @inject(TYPES.Timeout) private readonly timeout: number,
        @inject(TYPES.MoveMargin) private readonly moveMargin: number,
    ) {
        this.lastMousePosition = this.mouseController.getPosition();
    }

    public run(): void {
        this.intervalHandle = setInterval(() => this.checkAndMoveIfIdle(), this.timeout);
    }

    public stop(): void {
        if (this.intervalHandle) {
            clearInterval(this.intervalHandle);
            this.intervalHandle = null;
        }
    }

    private checkAndMoveIfIdle(): void {
        try {
            const currentPosition = this.mouseController.getPosition();
            console.info(`Current: ${currentPosition.x}|${currentPosition.y}, Last: ${this.lastMousePosition.x}|${this.lastMousePosition.y}`);

            if (this.hasMouseMoved(currentPosition)) {
                console.info("Mouse position did change – no action needed.");
            } else {
                console.info("Mouse position did not change – moving mouse.");
                const nextPosition = this.moveStrategy.getNextPosition(currentPosition, this.moveMargin);
                this.mouseController.moveTo(nextPosition.x, nextPosition.y);
                console.info(`New position: ${nextPosition.x}|${nextPosition.y}`);
            }

            this.lastMousePosition = this.mouseController.getPosition();
        } catch (error) {
            console.error("Error during mouse position check:", error);
        }
        console.info("-------------------------------------");
    }

    private hasMouseMoved(current: MousePosition): boolean {
        return current.x !== this.lastMousePosition.x || current.y !== this.lastMousePosition.y;
    }
}
