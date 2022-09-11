import * as chai from "chai";
import * as Server from "../../src/server";
import * as ConfigManager from "../../src/configs/configs";
import { connectDatabase, closeDatabase } from "../db";
import * as utils from "../utils";

const assert = chai.assert;

describe("UserController test", () => {
	let server;
	let mongoMemServer;

	before(async () => {
		mongoMemServer = await connectDatabase()
		await utils.seedUserData();
		server = await Server.init(ConfigManager.getServerConfig());
	});

	after(async () => await closeDatabase(mongoMemServer));

	it("login should success", async () => {
		const resp = await utils.login(server, "ptquyen", "abc123");
		assert.equal(resp.result["code"], 200);
		assert.isNotEmpty(resp.result["data"]["token"])
	});

	it("login fail because user does not exists", async () => {
		const resp = await utils.login(server, "ptquyen44", "abc123");
		assert.equal(resp.result["code"], 400);
		assert.isNull(resp.result["data"])
	});

	it("login fail because of bad request", () => {

	});

	it("create user success", () => {

	});

	it("create user fail because of duplicate username|email", () => {

	});

	it("create user fail because of bad request", () => {

	});

	it("get user success", () => {

	});

	it("get user success but user not found", () => {

	});

	it("get user fail because invalid token", () => {

	});

	it("modify profile success", () => {

	});

	it("modify profile fail because user not found", () => {

	});

	it("modify profile fail because of invalid token", () => {

	});

	it("update user success", () => {

	});

	it("update user fail because user not found", () => {

	});

	it("update user fail because invalid token", () => {

	});
})