import { ColorTemplates, Colors } from "./colors";

import { read } from "read";

// CLI
export async function ask(
    question: string,
    isPassword: boolean = false,
): Promise<string> {
    return await read({
        prompt: formatQuestion(question),
        silent: isPassword,
        replace: "*",
    });
}

export function formatQuestion(questionText: string): string {
    return `${questionText} >>> `;
}

// Delay
export function delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

// Miscellaneous
export function getSplitISOString(date: Date): { date: string; time: string } {
    const ISOString: string = date.toISOString();
    const parts: string[] = ISOString.split("T");

    return {
        date: parts[0],
        time: parts[1],
    };
}

export function replaceWhitespaces(text: string): string {
    return text.replace(/ /g, '-');
}

export function writeWelcomeText(): void {
    console.log(`
 ______             ____  _____  ______ _   _                   
/  ____|           / __ \\|  __ \\|  ____| \\ | |                  
| |    ______     | |  | | |__) | |__  |  \\| |    
| |   |____  \\    | |  | |  ___/|  __| | . \` |      
| |        | |    | |__| | |    | |____| |\\  |      
| |        | |     \\____/|_|___ |______|_|_\\_|___ _____________
| |____    | |           |  __ \\_   _/ ____|_   _|__   __/ ____|
\\______|   | |           | |  | || || |  __  | |    | | | (___  
       ____| |           | |  | || || | |_ | | |    | |  \\___ \\ 
      |______/           | |__| || || |__| |_| |_   | |  ____) |
                         |_____/_____\\_____|_____|  |_| |_____/ 

Welcome to ${Colors.FgGreen}${Colors.Bright}Open Digits${Colors.Reset}.

    `);
}

export function writeSection(title: string, body: string): void {
    console.log(`${ColorTemplates.Headline}--- ${title} ---${Colors.Reset}`);
    console.log(body);
}
