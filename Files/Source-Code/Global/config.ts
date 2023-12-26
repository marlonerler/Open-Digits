import Path from "path";

// Directories
export const fileDirectory: string = "Files";
export const codeDirectory: string = Path.join(fileDirectory, "Source-Code");
export const dataDirectory: string = Path.join(fileDirectory, "Data");
export function getServiceDataDirectory(service: Services): string {
    return Path.join(dataDirectory, "Services", service);
}
export function getServiceCodeDirectory(service: Services): string {
    return Path.join(codeDirectory, "Services", service, "index.ts");
}

export enum Services {
    AMS = "App Management Service",
    ASP = "Automated Server Protection",
    AUP = "Automated User Protection",
    Bootloader = "Bootloader",
    CAA = "Central Account Administration",
    CRS = "Central Reporting Service",
    Guard = "Guard",
    MSG = "Messaging Service",
    OA = "Organization Administration",
    PA = "Pass Administration",
    SAS = "Server Administration Service",
    Server = "Server",
}

// IPC
export enum MessageCodes {
    ErrorIncompleteServiceRequest = "error-incomplete-service-request",
    ErrorInvalidServiceRequest = "error-invalid-service-request",
    ErrorDidAlreadyLaunch = "error-did-already-launch",
    ErrorNotAServiceRequest = "error-not-a-service-request",
    Ready = "ready",
}
