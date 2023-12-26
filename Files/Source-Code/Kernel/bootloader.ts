import { CRSLogRequest } from "../Services/Central-Reporting-Service/types";
import { delay } from "../Global/utility";

// Main
export default async function main(): Promise<void> {
    while (true) {
        const logRequest = new CRSLogRequest({
            message: "Hello, world",
            reportingService: "Bootloader",
        });
        logRequest.launch();
        await delay(5000);
    }
}
