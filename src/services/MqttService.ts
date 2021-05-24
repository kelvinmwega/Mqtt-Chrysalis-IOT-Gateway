import { IMqttConfig } from "../models/IMqttConfig";
import * as mqtt from "mqtt";
import logger from "../utils/logger";
import { MqttClient } from "mqtt";
import { IConfig } from "../models/IConfig";
import { DataHandlerService } from "../utils/DataHandler";


export class MqttService {

    private readonly _mqttconfig: IMqttConfig;
    private client: MqttClient;
    private _dataHandlerService: DataHandlerService;

    constructor(config: IConfig) {
        this._mqttconfig = config["mqttserver"];
        this._dataHandlerService = new DataHandlerService(config);
    }

    public async connect(): Promise<void> {
        this.client = mqtt.connect(this._mqttconfig.server);

        this.client.on("connect", () => {
            logger.info("Client is CONNECTED");
        });

        this.client.on("offline", () => {
            logger.info(`offline`);
        });

        this.client.on("error", () => {
            logger.info(`error`);
        });

        this.client.on("reconnect", () => {
            logger.info(`reconnects`);
        });
    }

    public async subscribe(): Promise<void> {

        this.client.subscribe(this._mqttconfig.subtopic, (err) => {
            if (!err) {
                logger.info(`Subscribed to ${this._mqttconfig.subtopic}`);
            }
        });

        this.client.on("message", async (topic, message) => {
            this._dataHandlerService.handleMQTTRxDate(topic, message);
        });

    }

    public async publish(message: string): Promise<void> {
        this.client.publish(this._mqttconfig.pubtopic, message);
    }

}
