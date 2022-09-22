import { Worker } from "./Worker";
import { getMousePos, moveMouse } from "robotjs";
import { inject, injectable } from "inversify";
import { MousePosition } from "./MousePosition";
import { TYPES } from "./Types";

@injectable()
export class MousePositionWorker implements Worker {
    private timeout: number = 25000;
    private moveMargin: number = 10;
    private direction: string = 'down';
    private mousePosition: MousePosition;
    private handler: TimerHandler = () => this.handle();

    constructor(@inject(TYPES.MousePosition) mousePosition: MousePosition) {
        this.mousePosition = mousePosition;
    }

    public run(): void {
        setInterval(this.handler, this.timeout);
    }

    private handle(): void {
        let currentMousePosition: MousePosition = getMousePos();
        console.log(currentMousePosition.x + "|" + currentMousePosition.y)
        console.log(this.mousePosition.x + "|" + this.mousePosition.y)

        if (currentMousePosition.x !== this.mousePosition.x && currentMousePosition.y !== this.mousePosition.y) {
            console.log("currentMousePosition did change")
        } else {
            console.log("currentMousePosition did not change")

            if (this.direction === "down") {
                moveMouse(currentMousePosition.x + this.moveMargin, currentMousePosition.y + this.moveMargin);
                this.direction = "up";
            } else {
                moveMouse(currentMousePosition.x - this.moveMargin, currentMousePosition.y - this.moveMargin);
                this.direction = "down";
            }
            console.log("new currentMousePosition: " + this.mousePosition.x + "|" + this.mousePosition.y)
        }

        currentMousePosition = getMousePos();
        this.mousePosition = currentMousePosition;
        console.log("-------------------------------------")
    }
}
