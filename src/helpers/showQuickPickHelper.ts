import * as vscode from "vscode";

export class QuickPick {
    public static async showQuickPick<T extends vscode.QuickPickItem>(
        items: T[],
        placeHolder: string,
        canPickMany: boolean = false,
    ): Promise<T | undefined> {
        return vscode.window.showQuickPick(items, {
            placeHolder,
            canPickMany,
        });
    }
}
