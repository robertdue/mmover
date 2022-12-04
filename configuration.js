const fs = require("fs")

let configFile = "./config.json"
let defaultConfiguration = {
    interval: 25000,
    moveMargin: 10
}

let configuration = defaultConfiguration

const reloadConfig = (callback) => {
    try {
        configuration = { ...defaultConfiguration, ...JSON.parse(fs.readFileSync(configFile, 'utf8')) }
        console.log("reading configuration successful")
    } catch (e) {
        configuration = defaultConfiguration;
        console.warn("reading configuration failed - fallback to default configuration")
    }
    console.debug("configuration: " + JSON.stringify(configuration))
    callback(configuration)
}

const watchConfig = (callback) => {
    reloadConfig(callback);
    fs.watch(configFile, () => reloadConfig(callback));
};

module.exports = { watchConfig, configuration };