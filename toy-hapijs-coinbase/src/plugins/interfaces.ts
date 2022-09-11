import { Server } from "@hapi/hapi";

export interface IPlugin {
	register(server: Server): Promise<void>;
	info: IPluginInfo
}

export interface IPluginInfo {
	name: string
	description: string
	version: string
}