import { getMousePos, moveMouse } from 'robotjs';

const MOVE_MARGIN: number = 10;
let direction: string = "down";

let mouse: { x: number, y: number } = getMousePos();
let x = mouse.x;
let y = mouse.y;

const handle = () => {
    mouse = getMousePos();
    console.log(mouse.x + "|" + mouse.y)
    console.log(x + "|" + y)

    if (mouse.x !== x && mouse.y !== y) {
        console.log("mouse position did change")
    } else {
        console.log("mouse position did not change")

        if (direction === "down") {
            moveMouse(mouse.x + MOVE_MARGIN, mouse.y + MOVE_MARGIN);
            direction = "up";
        } else {
            moveMouse(mouse.x - MOVE_MARGIN, mouse.y - MOVE_MARGIN);
            direction = "down";
        }
        console.log("new mouse position: " + x + "|" + y)
    }

    mouse = getMousePos();
    x = mouse.x;
    y = mouse.y;
    console.log("-------------------------------------")
}

setInterval(handle, 25000)
