const robot = require("robotjs");
const { watchConfig } = require("./configuration")

var mouse = robot.getMousePos();
var direction = "down";
var x = mouse.x;
var y = mouse.y;
let interval = undefined

const createHandler = (configuration) => {
    return () => {
        var mouse = robot.getMousePos();
        console.debug(mouse.x + "|" + mouse.y)
        console.debug(x + "|" + y)

        if (mouse.x !== x && mouse.y !== y) {
            console.log("mouse position did change")
        } else {
            console.log("mouse position did not change")

            if (direction === "down") {
                robot.moveMouse(mouse.x + configuration.moveMargin, mouse.y + configuration.moveMargin);
                direction = "up";
            } else {
                robot.moveMouse(mouse.x - configuration.moveMargin, mouse.y - configuration.moveMargin);
                direction = "down";
            }
            console.debug("new mouse position: " + x + "|" + y)
        }

        var mouse = robot.getMousePos();
        x = mouse.x;
        y = mouse.y;
        console.log("-------------------------------------")
    }
}

const restart = (configuration) => {
    console.log("restart mouse mover")
    clearInterval(interval);
    interval = setInterval(createHandler(configuration), configuration.interval)
}

watchConfig(restart)