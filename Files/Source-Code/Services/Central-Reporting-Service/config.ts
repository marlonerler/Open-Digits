import * as Paths from "../../Utility/paths";

// Main
export const mainDirectory: string = Paths.getServiceDataDirectory(
    "Central-Reporting-Service",
);

export const chronologicalDirectoryName: string = "chronological";
export const keysToGroupBy: string[] = [
    "username",
    "reportingService",
    "category",
];
