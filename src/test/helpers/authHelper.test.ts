import * as vscode from "vscode";
import proxyquire from "proxyquire";
import path from "path";
import { expect, sinon } from "../setup";
import { GlobalState, DebrickedDataHelper } from "../../helpers";
import { Messages } from "../../constants";

describe("AuthHelper: Test Suite", () => {
    describe("AuthHelper.getAccessToken method", () => {
        let AuthHelper: any;
        let sandbox: sinon.SinonSandbox;
        let globalStateGetInstanceStub: sinon.SinonStub;
        let showInputBoxStub: sinon.SinonStub;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
            sandbox.spy(GlobalState, "initialize");
            sandbox.spy(path, "join");
            sandbox.spy(DebrickedDataHelper, "createDir");
            showInputBoxStub = sandbox.stub(vscode.window, "showInputBox");
            globalStateGetInstanceStub = sandbox.stub(GlobalState, "getInstance");
            AuthHelper = proxyquire("../../helpers", {
                path: path,
            }).AuthHelper;
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("Should generate access token if no saved access token present", async () => {
            showInputBoxStub.returns("sampleToken");
            globalStateGetInstanceStub.returns({
                clearAllGlobalData: sinon.spy(),
                setGlobalData: sinon.spy(),
                getGlobalData: sinon.stub().returns({ accessToken: "" }),
                getGlobalDataByKey: sinon.spy(),
                setGlobalDataByKey: sinon.spy(),
            });
            const accessToken = await AuthHelper.getAccessToken();
            expect(accessToken).to.be.a("string");
        });

        it("should throw an error if no saved access token present and failed to generate access token", async () => {
            showInputBoxStub.returns(undefined);
            globalStateGetInstanceStub.returns({
                clearAllGlobalData: sinon.spy(),
                setGlobalData: sinon.spy(),
                getGlobalData: sinon.stub().returns({ accessToken: "" }),
                getGlobalDataByKey: sinon.spy(),
                setGlobalDataByKey: sinon.spy(),
            });

            await expect(AuthHelper.getAccessToken()).to.be.rejectedWith(Messages.ACCESS_TOKEN_RQD);
        });

        it("Should return the saved access token if saved access token present in global data", async () => {
            const savedToken = "sampleToken";
            showInputBoxStub.returns(savedToken);
            globalStateGetInstanceStub.returns({
                clearAllGlobalData: sinon.spy(),
                setGlobalData: sinon.spy(),
                getGlobalData: sinon.stub().returns({ accessToken: savedToken }),
                getGlobalDataByKey: sinon.spy(),
                setGlobalDataByKey: sinon.spy(),
            });
            const accessToken = await AuthHelper.getAccessToken();
            expect(accessToken).to.eq(savedToken);
        });
    });
});
