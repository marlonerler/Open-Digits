import { CRSLogProcessManager } from "../../Services/Central-Reporting-Service/types";
import { ReservedUsernames } from "../../Global/config";
import { Services } from "../../Global/services";

export function BootloaderLog(message: string): void {
    new CRSLogProcessManager({
        message: message,
        reportingService: Services.Bootloader,
        username: ReservedUsernames.Bootloader,
    }).launchProcess();
}
