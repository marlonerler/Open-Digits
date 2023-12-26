import { ServiceRequest } from "../../Global/services";

// Requests
export enum CRSServiceRequests {
    Log = "crs-log-request",
    Access = "crs-access-request",
}

export class CRSRequest extends ServiceRequest {
    servicePath =
        "Files/Source-Code/Services/Central-Reporting-Service/index.ts";
}

export class CRSLogRequest extends CRSRequest {
    requestType = CRSServiceRequests.Log;
    constructor(public requestData: CRSLogRequestData) {
        super();
    }
}

export class CRSAccessRequest extends CRSRequest {
    requestType = CRSServiceRequests.Access;
    constructor(public requestData: CRSAccessRequestData) {
        super();
    }
}

// General
export enum CRSLogMessageGroups {
    category = "category",
    date = "date",
    username = "username",
    reportingService = "reporting-service",
}

// Log Messages
/** categories for log messages */
export enum CRSLogMessageCategories {
    Activity = "Activity",
    Warning = "Warning",
    Error = "Error",
    Unknown = "unknown",
}

/** additional information to write alongside message */
export interface CRSLogRequestData {
    message: string;
    username?: string;
    reportingService?: string;
    category?: CRSLogMessageCategories;
}

/** object containing all information to write */
export interface CRSFinalLogMessageObject extends CRSLogRequestData {
    date: string;
    time: string;
    uuid: string;
}

// Access
/** defines what logs to obtain */
export interface CRSAccessRequestData {
    groupToSearch: CRSLogMessageGroups;
    groupMemberToSearch: string;
    reverseIndexOfFirstMessage?: number;
    maxAmountOfMessages?: number;
}
