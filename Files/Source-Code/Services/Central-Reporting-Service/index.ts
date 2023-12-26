import { CRSLogRequest, CRSServiceRequests } from "./types";

import { MessageCodes } from "../../Global/config";
import { ServiceRequestData } from "../../Global/services";
import { initializeService } from "../../Global/utility";
import log from "./log";

initializeService((data: ServiceRequestData) => {
    if (data.requestType == CRSServiceRequests.Log) {
        const logRequest: CRSLogRequest = data as CRSLogRequest;
        log(logRequest.requestData);
    } else {
        throw MessageCodes.ErrorInvalidServiceRequest;
    }
});
