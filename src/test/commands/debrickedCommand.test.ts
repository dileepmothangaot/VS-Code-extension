import * as vscode from "vscode";
import { expect, sinon } from "../setup";
import { DebrickedCommand } from "../../commands/debrickedCommand";
import { BaseCommandService, FileService, ScanService } from "../../services";
import { GlobalState, Logger, AuthHelper } from "../../helpers";

describe("DebrickedCommand: Test Suite", () => {
    describe("DebrickedCommand.commands method", () => {
        let sandbox: sinon.SinonSandbox;
        let baseCommandSpy: sinon.SinonSpy;
        let installCommandSpy: sinon.SinonSpy;
        let helpCommandSpy: sinon.SinonSpy;
        let openLogFileSpy: sinon.SinonSpy;
        let updateCommandSpy: sinon.SinonSpy;
        let scanServiceSpy: sinon.SinonSpy;
        let runDebrickedScanSpy: sinon.SinonSpy;
        let filesServiceSpy: sinon.SinonSpy;
        let findFilesServiceSpy: sinon.SinonSpy;
        let registerCommandStub: sinon.SinonStub;
        let debrickedCommandSpy: sinon.SinonSpy;
        let globalStateGetInstanceStub: sinon.SinonStub;
        let getFilesToScanStub: sinon.SinonStub;
        let createFileSystemWatcherStub: sinon.SinonStub;

        const context = {
            globalState: {
                get: () => "0.0.1",
                update: (key: string, value: boolean | string) => {
                    return `${key}-${value}`;
                },
            },
            subscriptions: [],
        };

        const progress = {
            report: sinon.spy(),
        };

        before(async () => {
            sandbox = sinon.createSandbox();
            sandbox.spy(GlobalState, "initialize");
            globalStateGetInstanceStub = sandbox.stub(GlobalState, "getInstance");
            globalStateGetInstanceStub.returns({
                clearAllGlobalData: sinon.spy(),
                setGlobalData: sinon.spy(),
                getGlobalData: sinon.spy(),
                getGlobalDataByKey: sinon.spy(),
                setGlobalDataByKey: sinon.spy(),
            });

            getFilesToScanStub = sandbox.stub(FileService, "getFilesToScan");
            sandbox.stub(Logger, "logMessageByStatus");
            sandbox.stub(AuthHelper, "getAccessToken");

            registerCommandStub = sandbox.stub(vscode.commands, "registerCommand");
            registerCommandStub.callsFake(() => {});
            baseCommandSpy = sandbox.spy(BaseCommandService, "baseCommand");
            installCommandSpy = sandbox.spy(BaseCommandService, "installCommand");
            updateCommandSpy = sandbox.spy(BaseCommandService, "updateCommand");
            openLogFileSpy = sandbox.stub(Logger, "openLogFile");
            findFilesServiceSpy = sandbox.spy(FileService, "findFilesService");
            filesServiceSpy = sandbox.spy(FileService, "filesService");
            helpCommandSpy = sandbox.spy(BaseCommandService, "help");
            scanServiceSpy = sandbox.spy(ScanService, "scanService");
            debrickedCommandSpy = sandbox.spy(DebrickedCommand, "commands");
            runDebrickedScanSpy = sandbox.spy(ScanService, "runDebrickedScan");
            getFilesToScanStub.returns([]);

            createFileSystemWatcherStub = sandbox.stub(vscode.workspace, "createFileSystemWatcher").returns({
                onDidChange: sandbox.stub(),
                onDidCreate: sandbox.stub(),
                onDidDelete: sandbox.stub(),
                dispose: sandbox.stub(),
            } as any);
            await debrickedCommandSpy(context, progress);
        });

        after(() => {
            sandbox.restore();
        });

        it("Should run base command on BASE_COMMAND register", async () => {
            const registerCommandCallBack = registerCommandStub.getCall(0).args[1];

            await registerCommandCallBack();
            expect(baseCommandSpy.calledOnce).to.be.true;
        });

        it("Should run install command on BASE_COMMAND.sub_commands.install trigger", async () => {
            const registerCommandCallBack = registerCommandStub.getCall(1).args[1];

            await registerCommandCallBack();
            expect(installCommandSpy.called).to.be.true;
        });

        it("Should run updateCommand command on BASE_COMMAND.sub_commands.access_token trigger", async () => {
            const registerCommandCallBack = registerCommandStub.getCall(2).args[1];

            await registerCommandCallBack();
            expect(updateCommandSpy.calledOnce).to.be.true;
        });

        it("Should run help command on BASE_COMMAND.sub_commands.help trigger", async () => {
            const registerCommandCallBack = registerCommandStub.getCall(3).args[1];

            await registerCommandCallBack();
            expect(helpCommandSpy.calledOnce).to.be.true;
        });

        it("Should run openLogFile command on BASE_COMMAND.sub_commands.log trigger", async () => {
            const registerCommandCallBack = registerCommandStub.getCall(4).args[1];

            await registerCommandCallBack();
            expect(openLogFileSpy.calledOnce).to.be.true;
        });

        it("Should run scanService command on DebrickedCommands.SCAN.command trigger", async () => {
            const registerCommandCallBack = registerCommandStub.getCall(5).args[1];

            await registerCommandCallBack();
            expect(scanServiceSpy.calledOnce).to.be.true;
        });

        it("Should run filesService command on DebrickedCommands.FILES.command trigger", async () => {
            const registerCommandCallBack = registerCommandStub.getCall(6).args[1];

            await registerCommandCallBack();
            expect(filesServiceSpy.calledOnce).to.be.true;
        });

        it("Should run findFilesServiceSpy command on DebrickedCommands.FILES.sub_commands.debricked.files.find trigger", async () => {
            const registerCommandCallBack = registerCommandStub.getCall(7).args[1];

            await registerCommandCallBack();
            expect(findFilesServiceSpy.called).to.be.true;
        });

        it("Should call runDebrickedScan on watcher events trigger", async () => {
            globalStateGetInstanceStub.returns({
                clearAllGlobalData: sinon.spy(),
                setGlobalData: sinon.spy(),
                getGlobalData: sinon.stub().returns({ filesToScan: ["sample1"] }),
                getGlobalDataByKey: sinon.spy(),
                setGlobalDataByKey: sinon.spy(),
            });
            getFilesToScanStub.returns(["file_1"]);
            await debrickedCommandSpy(context, progress);

            const { onDidChange, onDidCreate, onDidDelete } = createFileSystemWatcherStub();
            await onDidChange.callArgWith(0, {});
            await onDidCreate.callArgWith(0, {});
            await onDidDelete.callArgWith(0, {});
            expect(runDebrickedScanSpy.callCount).to.eq(3);
        });
    });
});
