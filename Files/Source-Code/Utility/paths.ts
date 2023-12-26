import Path from 'path';

export const fileDirectory: string = 'Files';
export const dataDirectory: string = Path.join(fileDirectory, 'Data');

export function getServiceDataDirectory(serviceName: string): string {
    return Path.join(dataDirectory, 'Services', serviceName)
}