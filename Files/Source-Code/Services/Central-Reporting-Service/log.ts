import Crypto from "node:crypto";
import Fs from "node:fs/promises";
import Path from "node:path";

import * as Config from "./config";
import * as Types from "./types";

// Main
/** logs message */
export default function log(
    message: string,
    data?: Types.LogMessageData,
): void {
    // generate timestamp and id
    const timestamp: string = new Date().toISOString();
    const uuid: string = Crypto.randomUUID();

    // get data
    const username: string = data?.username ?? "unknown";
    const reportingService: string = data?.reportingService ?? "unknown";
    const category: Types.LogMessageCategories =
        data?.category ?? Types.LogMessageCategories.Unknown;

    // build message object
    const finalLogMessageObject: Types.FinalLogMessageObject = {
        category,
        username,
        reportingService,
        message,
        timestamp,
        uuid,
    };

    // process message
    processMessage(finalLogMessageObject);
}

// Helpers
/** writes log message to disk */
async function processMessage(
    finalLogMessageObject: Types.FinalLogMessageObject,
): Promise<void> {
    // generate message id string to use as filename
    const messageId: string = generateMessageId(finalLogMessageObject);
    // stringify message
    const stringifiedMessage: string = stringifyMessage(finalLogMessageObject);

    // store chronologically
    const parentDir: string = Path.join(Config.mainDirectory, Config.chronologicalDirectoryName);
    await storeLogMessage(stringifiedMessage, parentDir, messageId);

    // group messages by categories
    for (const [key, value] of Object.entries(finalLogMessageObject)) {
        // group messages only by select properties
        if (!Config.keysToGroupBy.includes(key)) continue;

        // store message
        const parentDir: string = Path.join(Config.mainDirectory, key, value);
        await storeLogMessage(stringifiedMessage, parentDir, messageId);
    }
}

/** stores log message */
async function storeLogMessage(
    stringifiedMessage: string,
    parentDir: string,
    messageId: string,
): Promise<void> {
    // get file path
    const filePath: string = Path.join(parentDir, messageId);

    try {
        // prepare storing
        await Fs.mkdir(parentDir, { recursive: true });
        // store
        await Fs.writeFile(filePath, stringifiedMessage);
    } catch (error) {
        console.error(error);
    }
}

/** joins timestamp and uuid */
function generateMessageId(
    finalLogMessageObject: Types.FinalLogMessageObject,
): string {
    return `${finalLogMessageObject.timestamp}-${finalLogMessageObject.uuid}`;
}

/** creates string from message object */
function stringifyMessage(
    finalLogMessageObject: Types.FinalLogMessageObject,
): string {
    return JSON.stringify(finalLogMessageObject, null, 4);
}
