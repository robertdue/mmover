import chalk from "chalk";
import robotjs from "robotjs";
import { Configuration, watchConfig } from "./configuration.js";

var mouse = robotjs.getMousePos();
var direction = "down";
var x = mouse.x;
var y = mouse.y;
let interval: NodeJS.Timer | undefined = undefined;

const createHandler = (configuration: Configuration) => {
  return () => {
    var mouse = robotjs.getMousePos();
    console.debug(
      chalk.cyan(
        `[MAIN] old mouse position: ${x}|${y}, current mouse position: ${mouse.x}|${mouse.y}`
      )
    );

    if (mouse.x !== x || mouse.y !== y) {
      console.log(chalk.cyan("[MAIN] mouse position did change"));
      x = mouse.x;
      y = mouse.y;
    } else {
      console.log(chalk.cyan("[MAIN] mouse position did not change"));

      if (direction === "down") {
        x = mouse.x + configuration.moveMargin;
        y = mouse.y + configuration.moveMargin;
        direction = "up";
      } else {
        x = mouse.x - configuration.moveMargin;
        y = mouse.y - configuration.moveMargin;
        direction = "down";
      }
      robotjs.moveMouse(x, y);
      console.debug(chalk.cyan(`[MAIN] new mouse position: ${x}|${y}`));
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
