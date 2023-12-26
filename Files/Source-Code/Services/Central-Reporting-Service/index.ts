import Crypto from "node:crypto";
import Fs from "node:fs/promises";
import Path from "node:path";

import * as Config from "./crs-config";
import { crashWithError } from "../../Utility/errorHandling";

// Repair
Fs.mkdir(Config.mainDirectory, { recursive: true }).catch(crashWithError);

// Types
export enum LogMessageCategories {
    Activity = "Activity",
    Warning = "Warning",
    Error = "Error",
    Unknown = "Unknown",
}

/** additional information to write alongside message */
export interface LogMessageData {
    username?: string;
    reportingService?: string;
    category?: LogMessageCategories;
}

/** object containing all information to write */
interface FinalLogMessageObject extends LogMessageData {
    message: string;
    timestamp: string;
    uuid: string;
}

// Main
/** logs message */
export function log(message: string, data?: LogMessageData): void {
    const timestamp: string = new Date().toISOString();
    const uuid: string = Crypto.randomUUID();

    const username: string = data?.username ?? "unknown";
    const reportingService: string = data?.reportingService ?? "unknown";
    const category: LogMessageCategories = data?.category ?? LogMessageCategories.Unknown;

    const finalLogMessageObject: FinalLogMessageObject = {
        category,
        username,
        reportingService,
        message,
        timestamp,
        uuid,
    };
    writeLogMessage(finalLogMessageObject);
}

// Helpers
/** writes log message to disk */
function writeLogMessage(finalLogMessageObject: FinalLogMessageObject): void {
    // group messages by categories
    Object.entries(finalLogMessageObject).forEach(async (entry) => {
        const [key, value]: [string, string] = entry;
        // messages cannot be grouped by their content
        if (!Config.keysToGroupBy.includes(key)) return;

        // generate message id to use as filename
        const messageId: string = generateMessageId(finalLogMessageObject);
        const stringifiedMessage: string = stringifyMessage(
            finalLogMessageObject,
        );

        // get path to store message at
        const parentDir: string = Path.join(Config.mainDirectory, key, value);
        const filePath: string = Path.join(parentDir, messageId);

        // prepare storing
        await Fs.mkdir(parentDir, { recursive: true });
        // store
        await Fs.writeFile(filePath, stringifiedMessage);
    });
}

function generateMessageId(
    finalLogMessageObject: FinalLogMessageObject,
): string {
    return `${finalLogMessageObject.timestamp}-${finalLogMessageObject.uuid}`;
}

function stringifyMessage(
    finalLogMessageObject: FinalLogMessageObject,
): string {
    return JSON.stringify(finalLogMessageObject, null, 4);
}
