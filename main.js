const robot = require("robotjs");

const MOVE_MARGIN = 10;
var direction = "down";

var mouse = robot.getMousePos();
var x = mouse.x;
var y = mouse.y;

const handle = () => {
    var mouse = robot.getMousePos();
    console.log(mouse.x + "|" + mouse.y)
    console.log(x + "|" + y)

    if (mouse.x !== x && mouse.y !== y) {
        console.log("mouse position did change")
    } else {
        console.log("mouse position did not change")

        if (direction === "down") {
            robot.moveMouse(mouse.x + MOVE_MARGIN, mouse.y + MOVE_MARGIN);
            direction = "up";
        } else {
            robot.moveMouse(mouse.x - MOVE_MARGIN, mouse.y - MOVE_MARGIN);
            direction = "down";
        }
        console.log("new mouse position: " + x + "|" + y)
    }

    var mouse = robot.getMousePos();
    x = mouse.x;
    y = mouse.y;
    console.log("-------------------------------------")
}

setInterval(handle, 25000)