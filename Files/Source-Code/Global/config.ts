import Path from "path";

// Directories
export const fileDirectory: string = "Files";
export const dataDirectory: string = Path.join(fileDirectory, "Data");
export function getServiceDataDirectory(serviceName: string): string {
    return Path.join(dataDirectory, "Services", serviceName);
}

// IPC
export enum MessageCodes {
    ErrorIncompleteServiceRequest = "error-incomplete-service-request",
    ErrorInvalidServiceRequest = "error-invalid-service-request",
    ErrorDidAlreadyLaunch = "error-did-already-launch",
    ErrorNotAServiceRequest = "error-not-a-service-request",
    Ready = "ready",
}
