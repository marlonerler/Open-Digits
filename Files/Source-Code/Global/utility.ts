export function crashWithError(error: any): void {
    if (!error) return;
    throw error;
}

export function delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

export function getSplitISOString(date: Date): { date: string; time: string } {
    const ISOString: string = date.toISOString();
    const parts: string[] = ISOString.split("T");

    return {
        date: parts[0],
        time: parts[1],
    };
}
