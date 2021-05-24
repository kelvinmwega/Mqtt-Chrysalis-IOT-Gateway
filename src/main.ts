import logger = require("./utils/logger");
import { IConfig } from "./models/IConfig";
import { MqttService } from "./services/MqttService";

(async () => {
   try {
      const config: IConfig = require(`./data/config.local.json`);
      const mqttService = new MqttService(config);
      await mqttService.connect();
      await mqttService.subscribe();
   } catch (error) {
      logger.error(`Connection Failed : ${error}`);
   }
})();

// Hot Module Replacement
if (module.hot) {
   module.hot.accept();
   module.hot.dispose(() => console.log("Module disposed. "));
 }
