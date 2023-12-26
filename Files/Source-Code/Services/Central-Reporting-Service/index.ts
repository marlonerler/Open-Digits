import { CRSLogProcessManager, CRSProcessTypes } from "./types";
import { ServiceProcessData, initializeServiceProcess } from "../../Global/services";

import { MessageCodes } from "../../Global/config";
import log from "./log";

initializeServiceProcess((data: ServiceProcessData) => {
    if (data.requestType == CRSProcessTypes.Log) {
        const logRequest: CRSLogProcessManager = data as CRSLogProcessManager;
        log(logRequest.requestData);
    } else {
        throw MessageCodes.ErrorInvalidServiceRequest;
    }
});
