import {
    CRSFinalLogMessageObject,
    CRSLogMessageCategories,
    CRSLogMessageFilters,
    CRSLogProcessData,
} from "./types";

import { CRSmainDirectory } from "./config";
import Crypto from "node:crypto";
import Fs from "node:fs/promises";
import Path from "node:path";
import { getSplitISOString } from "../../Global/utility";

// Main
/** logs message */
export default function log(data: CRSLogProcessData): void {
    // get data
    const message: string = data.message;
    const username: string = data.username ?? "unknown";
    const reportingService: string = data.reportingService ?? "unknown";
    const category: CRSLogMessageCategories =
        data?.category ?? CRSLogMessageCategories.Unknown;

    // generate data
    const { date, time } = getSplitISOString(new Date());
    const uuid: string = Crypto.randomUUID();

    // build message object
    const finalLogMessageObject: CRSFinalLogMessageObject = {
        category,
        username,
        reportingService,
        message,
        date,
        time,
        uuid,
    };

    // process message
    processMessage(finalLogMessageObject);
}

// Helpers
/** writes log message to disk */
async function processMessage(
    finalLogMessageObject: CRSFinalLogMessageObject,
): Promise<void> {
    // generate message id string to use as filename
    const messageId: string = generateMessageId(finalLogMessageObject);
    // stringify message
    const stringifiedMessage: string = stringifyMessage(finalLogMessageObject);

    // store messages
    for (const [key, value] of Object.entries(finalLogMessageObject)) {
        // group messages only by select filters
        if (key in CRSLogMessageFilters == false) continue;

        // store message
        const parentDir: string = Path.join(CRSmainDirectory, key, value);
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
    finalLogMessageObject: CRSFinalLogMessageObject,
): string {
    return `${finalLogMessageObject.date}-${finalLogMessageObject.time}-${finalLogMessageObject.uuid}`;
}

/** creates string from message object */
function stringifyMessage(
    finalLogMessageObject: CRSFinalLogMessageObject,
): string {
    return JSON.stringify(finalLogMessageObject, null, 4);
}
