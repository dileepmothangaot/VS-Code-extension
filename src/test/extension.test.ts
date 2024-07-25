import * as vscode from "vscode";
import { activate, deactivate } from "../extension";
import { sinon, expect } from "./setup";
import { Logger, Common, GlobalState } from "../helpers";
import { BaseCommandService } from "../services";
import { DebrickedCommand } from "../commands";

describe("Extension: Test Suite", () => {
    vscode.window.showInformationMessage("Debricked: ./extension Unit tests started");

    const context = {
        globalState: {
            get: () => "0.0.1",
            update: (key: string, value: boolean | string) => {
                return `${key}-${value}`;
            },
        },
        subscriptions: [],
    };

    describe("activate function", () => {
        let sandbox: sinon.SinonSandbox;
        let activateSpy: sinon.SinonSpy;
        let loggerInitializeSpy: sinon.SinonSpy;
        let globalStateInitializeSpy: sinon.SinonSpy;
        let commandsSpy: sinon.SinonSpy;
        let setupDebrickedSpy: sinon.SinonSpy;
        let registerTreeDataProviderStub: sinon.SinonStub;

        beforeEach(async () => {
            sandbox = sinon.createSandbox();
            sandbox.spy(BaseCommandService, "getCurrentExtensionVersion");
            activateSpy = await sandbox.spy(activate);
            loggerInitializeSpy = sandbox.stub(Logger, "initialize");
            sandbox.stub(Logger, "logMessageByStatus");
            globalStateInitializeSpy = sandbox.spy(GlobalState, "initialize");
            setupDebrickedSpy = sandbox.spy(Common, "setupDebricked");
            commandsSpy = sandbox.spy(DebrickedCommand, "commands");
            registerTreeDataProviderStub = sandbox.stub(vscode.window, "registerTreeDataProvider");
        });

        afterEach(() => {
            sandbox.restore();
        });

        it.only("Should activate the extension", async () => {
            await activateSpy(context);

            expect(commandsSpy.calledOnce).to.be.true;
            expect(loggerInitializeSpy.calledOnceWith(context)).to.be.true;
            expect(globalStateInitializeSpy.calledOnceWith(context)).to.be.true;
            expect(setupDebrickedSpy.calledOnce).to.be.true;
            expect(registerTreeDataProviderStub.calledOnce).to.be.true;
        });
    });

    describe("deactivate function", () => {
        let sandbox: sinon.SinonSandbox;
        let deactivateSpy: sinon.SinonSpy;
        let globalStateGetInstanceSpy: sinon.SinonStub;

        beforeEach(async () => {
            sandbox = sinon.createSandbox();
            deactivateSpy = sandbox.spy(deactivate);
            globalStateGetInstanceSpy = sandbox.stub(GlobalState, "getInstance");
            globalStateGetInstanceSpy.returns({
                clearAllGlobalData: sinon.spy(),
                setGlobalData: sinon.spy(),
            });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("Should deactivate the extension", async () => {
            await deactivateSpy();
            expect(globalStateGetInstanceSpy().clearAllGlobalData.called).to.be.true;
        });
    });
});
