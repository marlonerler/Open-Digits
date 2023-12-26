import { ChildProcess, fork } from "child_process";

import { MessageCodes } from "./config";

export type ServiceInitializer = (serviceRequest: ServiceRequest) => void;

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

    handleMessage = (message: any): void => {
        console.log(message);
    };

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
