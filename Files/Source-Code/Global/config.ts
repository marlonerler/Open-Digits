import Path from "path";
import { Services } from "./services";
import { replaceWhitespaces } from "./utility";

// Directories
export const fileDirectory: string = "Files";
export const codeDirectory: string = Path.join(fileDirectory, "Source-Code");
export const dataDirectory: string = Path.join(fileDirectory, "Data");
export function getServiceDataDirectory(service: Services): string {
    return Path.join(dataDirectory, "Services", replaceWhitespaces(service));
}
export function getServiceCodeDirectory(service: Services): string {
    return Path.join(codeDirectory, "Services", replaceWhitespaces(service), "index.ts");
}

// IPC
export enum MessageCodes {
    ErrorIncompleteServiceRequest = "error-incomplete-service-request",
    ErrorInvalidServiceRequest = "error-invalid-service-request",
    ErrorDidAlreadyLaunch = "error-did-already-launch",
    ErrorNotAServiceRequest = "error-not-a-service-request",
    Ready = "ready",
}

// Users
export enum ReservedUsernames {
    Bootloader = "bootloader",
}
