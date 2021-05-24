import { IConfig } from "../models/IConfig";
import { ILedgerConfig } from "../models/ILedgerConfig";
import { ChrysalisService } from "../services/ChrysalisService";
import logger from "../utils/logger";

export class DataHandlerService {

    private readonly _chrysalisConfig: ILedgerConfig;

    constructor(config: ILedgerConfig) {
        this._chrysalisConfig = config;
    }

    public async handleMQTTRxDate(topic: any, message: any): Promise<void> {
        try {

            this.postData(message.toString());

        } catch (error) {
            logger.error(`Error : ${error}`);
        }
    }

    private async postData(data: any): Promise<void> {
        logger.info(`Data to post : ${data}`);
        const ledgerService = new ChrysalisService(this._chrysalisConfig);
        await ledgerService.publish(data);
    }
}