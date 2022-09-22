import { getMousePos, moveMouse } from 'robotjs';

const MOVE_MARGIN: number = 10;
let direction: string = "down";

let initialMousePosition = getMousePos();
let x = initialMousePosition.x;
let y = initialMousePosition.y;

const handle = () => {
    let currentMousePosition = getMousePos();
    console.log(currentMousePosition.x + "|" + currentMousePosition.y)
    console.log(x + "|" + y)

    if (currentMousePosition.x !== x && currentMousePosition.y !== y) {
        console.log("currentMousePosition did change")
    } else {
        console.log("currentMousePosition did not change")

        if (direction === "down") {
            moveMouse(currentMousePosition.x + MOVE_MARGIN, currentMousePosition.y + MOVE_MARGIN);
            direction = "up";
        } else {
            moveMouse(currentMousePosition.x - MOVE_MARGIN, currentMousePosition.y - MOVE_MARGIN);
            direction = "down";
        }
        console.log("new currentMousePosition: " + x + "|" + y)
    }

    currentMousePosition = getMousePos();
    x = currentMousePosition.x;
    y = currentMousePosition.y;
    console.log("-------------------------------------")
}

setInterval(handle, 25000)
