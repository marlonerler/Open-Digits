import { CRSLogProcessManager } from "../Services/Central-Reporting-Service/types";
import { delay } from "../Global/utility";

// Main
export default async function main(): Promise<void> {
    while (true) {
        const processManager = new CRSLogProcessManager({
            message: "Hello, world",
            reportingService: "Bootloader",
        });
        processManager.launchProcess();
        await delay(5000);
    }
}
