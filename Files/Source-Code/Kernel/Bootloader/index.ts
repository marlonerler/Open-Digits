import { ColorTemplates, Colors } from "../../Global/colors";
import {
    ask,
    delay,
    writeSection,
    writeWelcomeText,
} from "../../Global/utility";

import { BootloaderLog } from "./helpers";
import { CRSLogProcessManager } from "../../Services/Central-Reporting-Service/types";
import { ReservedUsernames } from "../../Global/config";
import { Services } from "../../Global/services";

// Main
export default async function main(): Promise<void> {
    // greet
    writeWelcomeText();
    await delay(1000);

    BootloaderLog("Starting up...");

    // setup
    const password = await getCentralEncryptionPassphrase();
    BootloaderLog("Received Central Encryption Passphrase");
}

// Helpers
async function getCentralEncryptionPassphrase(): Promise<string> {
    // password text
    writeSection(
        "Central Encryption Passphrase",
        `The Central Encryption Passphrase encrypts sensitive information on the server.

${ColorTemplates.Highlight}If this is the first time you are starting Open Digits${Colors.Reset}, enter a new one.
    -> Make sure to enter a long and secure passphrase.
    -> Do not forget the passphrase or all encrypted data will be lost.
    -> The passphrase itself is never stored on the hard drive.

${ColorTemplates.Highlight}If you forgot the Passphrase${Colors.Reset}, enter a new one.
    -> Old encrypted data cannot be accessed using this new passphrase.
    -> Newly encrypted data will use the new passphrase.
`,
    );

    // ask for passphrase
    let passphrase: string = "";
    let doPassphrasesMatch: boolean = false;
    while (doPassphrasesMatch == false) {
        const passphraseFirstEntry = await ask(
            "Enter the Central Encryption Passphrase",
            true,
        );
        const passphraseSecondEntry = await ask(
            "Confirm the Central Encryption Passphrase",
            true,
        );

        if (passphraseFirstEntry != passphraseSecondEntry) {
            console.log(
                `\n\nSorry, the passphrases ${Colors.FgRed}did not match${Colors.Reset} :(\nPlease try again`,
            );
            await delay(1);
            continue;
        }
        doPassphrasesMatch = true;
        passphrase = passphraseFirstEntry;

        console.log(`${Colors.FgGreen}Thank you!${Colors.Reset}`);
    }

    return passphrase;
}
