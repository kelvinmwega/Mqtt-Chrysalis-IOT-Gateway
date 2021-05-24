import logger = require("./utils/logger");
import { IConfig } from "./models/IConfig";
import { MqttService } from "./services/MqttService";
import { ChrysalisService } from "./services/ChrysalisService";

(async () => {
   try {
      const config: IConfig = require(`./data/config.local.json`);
      const mqttService = new MqttService(config);
      await mqttService.connect();
      await mqttService.subscribe();

      const ledgerService = new ChrysalisService(config.chrysalis);
      await ledgerService.info();
      await ledgerService.fetch("53c4d4a4710446d20e47dfc1d53924a1efc74b5307f5ee612bdfad9ba1192f04")
   } catch (error) {
      logger.error(`Connection Failed : ${error}`);
   }
})();

// Hot Module Replacement
if (module.hot) {
   module.hot.accept();
   module.hot.dispose(() => console.log("Module disposed. "));
 }
