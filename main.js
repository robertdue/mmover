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
        console.debug(`old mouse position: ${x}|${y}, current mouse position: ${mouse.x}|${mouse.y}`)

        if (mouse.x !== x || mouse.y !== y) {
            console.log("mouse position did change")
            x = mouse.x
            y = mouse.y
        } else {
            console.log("mouse position did not change")

            if (direction === "down") {
                x = mouse.x + configuration.moveMargin
                y = mouse.y + configuration.moveMargin
                direction = "up";
            } else {
                x = mouse.x - configuration.moveMargin
                y = mouse.y - configuration.moveMargin
                direction = "down";
            }
            robot.moveMouse(x, y);
            console.debug(`new mouse position: ${x}|${y}`)
        }
    }
}

const restart = (configuration) => {
    if (interval)
        clearInterval(interval);
    if (configuration.active)
        interval = setInterval(createHandler(configuration), configuration.interval)
}

watchConfig(restart)