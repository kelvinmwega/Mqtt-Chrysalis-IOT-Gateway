import { Converter, IMessage, INDEXATION_PAYLOAD_TYPE, MAX_NUMBER_PARENTS, SingleNodeClient } from "@iota/iota.js";
import { ILedgerConfig } from "../models/ILedgerConfig";
import logger from "../utils/logger";

export class ChrysalisService {

   private readonly _ledgerConfig: ILedgerConfig;

   constructor(config: ILedgerConfig) {
      this._ledgerConfig = config;
   }

   public async info(): Promise<void> {
      const client = new SingleNodeClient(this._ledgerConfig.server);

      const health = await client.health();
      logger.info("Is the node healthy", health ? "Yes" : "No");

      const info = await client.info();
      logger.info(JSON.stringify(info));
   }

   public async publish(data: any): Promise<string> {
      const client = new SingleNodeClient(this._ledgerConfig.server);

      const tipsResponse = await client.tips();
      
      const submitMessage: IMessage = {
         // Parents can be left undefined if you want the node to populate the field
         parentMessageIds: tipsResponse.tipMessageIds.slice(0, MAX_NUMBER_PARENTS),
         payload: {
             type: INDEXATION_PAYLOAD_TYPE,
             index: Converter.utf8ToHex(this._ledgerConfig.index),
             data: Converter.utf8ToHex(data)
         }
     };
     
      const messageId = await client.messageSubmit(submitMessage);
      logger.info("Message Id --> " + messageId);

      return messageId;
   }

   public async fetch(messageId: string): Promise<any> {
      const client = new SingleNodeClient(this._ledgerConfig.server);

      const message = await client.message(messageId);

      if (message.payload) {
         const decoded = Converter.hexToUtf8(message.payload["data"]);
         logger.info("Decoded data " + decoded);
         return decoded;
      }
   }
}
