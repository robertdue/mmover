import { getMousePos, moveMouse } from "robotjs";
import { Configuration, watchConfig } from "./configuration";

var mouse = getMousePos();
var direction = "down";
var x = mouse.x;
var y = mouse.y;
let interval: NodeJS.Timer | undefined = undefined;

const createHandler = (configuration: Configuration) => {
  return () => {
    var mouse = getMousePos();
    console.debug(
      `old mouse position: ${x}|${y}, current mouse position: ${mouse.x}|${mouse.y}`
    );

    if (mouse.x !== x || mouse.y !== y) {
      console.log("mouse position did change");
      x = mouse.x;
      y = mouse.y;
    } else {
      console.log("mouse position did not change");

      if (direction === "down") {
        x = mouse.x + configuration.moveMargin;
        y = mouse.y + configuration.moveMargin;
        direction = "up";
      } else {
        x = mouse.x - configuration.moveMargin;
        y = mouse.y - configuration.moveMargin;
        direction = "down";
      }
      moveMouse(x, y);
      console.debug(`new mouse position: ${x}|${y}`);
    }
  };
};

const restart = (configuration: Configuration) => {
  if (interval) clearInterval(interval);
  if (configuration.active)
    interval = setInterval(
      createHandler(configuration),
      configuration.interval
    );
};

watchConfig(restart);
