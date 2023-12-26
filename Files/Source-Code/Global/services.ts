import { ChildProcess, fork } from "child_process";

import { MessageCodes } from "./config";

// Types
export type ServiceProcessInitializer = (serviceRequest: ServiceProcessManager) => void;

export enum Services {
    AMS = "App Management Service",
    ASP = "Automated Server Protection",
    AUP = "Automated User Protection",
    Bootloader = "Bootloader",
    CAA = "Central Account Administration",
    CRS = "Central Reporting Service",
    Documentation = "Documentation",
    Guard = "Guard",
    MSG = "Messaging Service",
    OA = "Organization Administration",
    PA = "Pass Administration",
    SAS = "Server Administration Service",
    Server = "Server",
}

// Initialization
export function initializeServiceProcess(
    initialize: ServiceProcessInitializer,
): void {
    // receive first message (request)
    process.once("message", (message: any) => {
        // make sure message is service request
        if ("requestType" in message == false)
            throw MessageCodes.ErrorNotAServiceRequest;

        // initialize
        initialize(message as ServiceProcessManager);
    });

    // send ready
    process.send!(MessageCodes.Ready);
}

// Requests
export class ServiceProcessManager implements ServiceProcessData {
    readonly servicePath: string;
    requestType: any;
    requestData: any;

    private didLaunch: boolean = false;

    // methods
    launchProcess = (): void => {
        if (!(this.servicePath && this.requestType))
            return console.error(MessageCodes.ErrorIncompleteServiceRequest);

        if (this.didLaunch == true)
            return console.error(MessageCodes.ErrorDidAlreadyLaunch);

        this.didLaunch = true;

        // create child process
        const childProcess: ChildProcess = fork(this.servicePath);

        // handle IPC
        childProcess.on("close", this.handleClose);
        childProcess.on("error", this.handleError);
        childProcess.on("message", (message: any) => {
            // send requestData when ready
            if (message == MessageCodes.Ready) {
                childProcess.send(this.toServiceProcessData());
                // forward messages
            } else {
                this.handleMessage(message);
            }
        });
    };

    handleError = (error: Error): void => {
        console.error(error);
    };

    handleMessage = (message: any): void => {};

    handleClose = (): void => {};

    toServiceProcessData = (): ServiceProcessData => {
        return {
            servicePath: this.servicePath,
            requestType: this.requestType,
            requestData: this.requestData,
        };
    };
}

export interface ServiceProcessData {
    readonly servicePath: string;
    requestType: any;
    requestData: any;
}
