import { IConfig } from "../models/IConfig";
import logger from "../utils/logger";

export class DataHandlerService {


    constructor(config: IConfig) {
    }

    public async handleMQTTRxDate(topic: any, message: any): Promise<void> {

        const devicetype = topic.toString().split("/");

        let dataToPublish;
        let root;

        try {

         this.postData(" -- >", message.toString());

        } catch (error) {
            logger.error(`Error : ${error}`);
        }
    }

    private async postData(url: string, data: any): Promise<void> {
        logger.info(`Data to post : ${data}`);
    }
}