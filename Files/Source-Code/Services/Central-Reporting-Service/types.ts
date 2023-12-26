import { ServiceProcessManager, Services } from "../../Global/services";

import { getServiceCodeDirectory } from "../../Global/config";

// Requests
export enum CRSProcessTypes {
    Log = "crs-log-request",
    Access = "crs-access-request",
}

export class CRSProcessManager extends ServiceProcessManager {
    servicePath = getServiceCodeDirectory(Services.CRS);
}

export class CRSLogProcessManager extends CRSProcessManager {
    requestType = CRSProcessTypes.Log;
    constructor(public requestData: CRSLogProcessData) {
        super();
    }
}

export class CRSAccessProcessManager extends CRSProcessManager {
    requestType = CRSProcessTypes.Access;
    constructor(public requestData: CRSAccessProcessData) {
        super();
    }
}

// General
export enum CRSLogMessageFilters {
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
export interface CRSLogProcessData {
    message: string;
    username?: string;
    reportingService?: Services;
    category?: CRSLogMessageCategories;
}

/** object containing all information to write */
export interface CRSFinalLogMessageObject extends CRSLogProcessData {
    date: string;
    time: string;
    uuid: string;
}

// Access
/** defines what logs to obtain */
export interface CRSAccessProcessData {
    groupToSearch: CRSLogMessageFilters;
    groupMemberToSearch: string;
    reverseIndexOfFirstMessage?: number;
    maxAmountOfMessages?: number;
}
