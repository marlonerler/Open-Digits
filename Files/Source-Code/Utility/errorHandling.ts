export function crashWithError(error: any): void {
    if (!error) return;
    throw error;
}