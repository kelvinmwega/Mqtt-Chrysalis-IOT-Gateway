import { ILedgerConfig } from "./ILedgerConfig";
import { IMqttConfig } from "./IMqttConfig";

export interface IConfig {
    mqttConfig: IMqttConfig;
    ledgerConfig: ILedgerConfig;
}
