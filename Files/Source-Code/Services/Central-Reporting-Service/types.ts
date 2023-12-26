/** categories for log messages */
export enum LogMessageCategories {
    Activity = "Activity",
    Warning = "Warning",
    Error = "Error",
    Unknown = "unknown",
}

/** additional information to write alongside message */
export interface LogMessageData {
    username?: string;
    reportingService?: string;
    category?: LogMessageCategories;
}

/** object containing all information to write */
export interface FinalLogMessageObject extends LogMessageData {
    message: string;
    timestamp: string;
    uuid: string;
}