import * as vscode from "vscode";
import { MessageStatus, Organization } from "../constants/index";
import * as crypto from "crypto";
import { Logger } from "./loggerHelper";
import { GlobalState } from "./globalState";
import { DebrickedDataHelper } from "./debrickedDataHelper";

export class Common {
    private static get globalState(): GlobalState {
        return GlobalState.getInstance();
    }

    public static async getInput(prompt: string): Promise<string | undefined> {
        return await vscode.window.showInputBox({ prompt });
    }

    public static generateHashCode(input: string = new Date().toISOString()): string {
        return crypto.createHash("sha256").update(input).digest("hex");
    }

    public static async checkUserId(): Promise<void> {
        const user_id = await Common.globalState.getGlobalDataByKey(Organization.DEBRICKED_DATA_KEY, "user_id");
        if (user_id === null) {
            const userHashCode = Common.generateHashCode(new Date().toDateString());
            const debrickedData: any = await Common.globalState.getGlobalData(Organization.DEBRICKED_DATA_KEY, {});
            debrickedData["user_id"] = userHashCode;
            Logger.logMessageByStatus(MessageStatus.INFO, `New user_id generated : ${userHashCode}`);
        }
    }

    public static replacePlaceholder(originalString: string, placeholderValue: string) {
        const test = originalString.replace("PLACEHOLDER", placeholderValue);
        return test;
    }

    public static async setupDebricked(): Promise<void> {
        Common.globalState.setGlobalData(Organization.SEQ_ID_KEY, Common.generateHashCode());
        await Common.checkUserId();
        DebrickedDataHelper.createDir(Organization.reportsFolderPath);
    }

    public static stringToArray(inputString: string, separator: string) {
        // Split the string by newline character
        let array = inputString.split(separator);

        // Trim whitespace and asterisks from each element
        array = array.map((item) => item.trim().replace(/^\* /, ""));

        return array;
    }
}
