import { ChildProcess, fork } from "child_process";

import { MessageCodes } from "./config";

// Types
export type ServiceInitializer = (serviceRequest: ServiceRequest) => void;

// Initialization
export function initializeService(
    serviceInitializer: ServiceInitializer,
): void {
    // receive first message (request)
    process.once("message", (message: any) => {
        // make sure message is service request
        if ("requestType" in message == false)
            throw MessageCodes.ErrorNotAServiceRequest;

        // initialize
        serviceInitializer(message as ServiceRequest);
    });

    // send ready
    process.send!(MessageCodes.Ready);
}

// Requests
export class ServiceRequest implements ServiceRequestData {
    readonly servicePath: string;
    requestType: any;
    requestData: any;

    private didLaunch: boolean = false;

    // methods
    launch = (): void => {
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
                childProcess.send(this.toServiceRequestObject());
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

    toServiceRequestObject = (): ServiceRequestData => {
        return {
            servicePath: this.servicePath,
            requestType: this.requestType,
            requestData: this.requestData,
        };
    };
}

export interface ServiceRequestData {
    readonly servicePath: string;
    requestType: any;
    requestData: any;
}
