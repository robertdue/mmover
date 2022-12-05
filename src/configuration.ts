import { readFileSync, watch } from "fs";

export interface Configuration {
  interval: number;
  moveMargin: number;
  active: boolean;
}

export type ConfigurationCallbackFunction = (
  configuration: Configuration
) => void;

let configFile = "./config.json";
let defaultConfiguration: Configuration = {
  interval: 25000,
  moveMargin: 10,
  active: true,
};

let configuration = defaultConfiguration;

const reloadConfig = (callback: ConfigurationCallbackFunction) => {
  try {
    configuration = {
      ...defaultConfiguration,
      ...JSON.parse(readFileSync(configFile, "utf8")),
    };
    console.log("reading configuration successful");
  } catch (e) {
    configuration = defaultConfiguration;
    console.warn(
      "reading configuration failed - fallback to default configuration"
    );
  }
  console.debug("configuration: " + JSON.stringify(configuration));
  callback(configuration);
};

export const watchConfig = (callback: ConfigurationCallbackFunction) => {
  reloadConfig(callback);
  watch(configFile, () => reloadConfig(callback));
};
