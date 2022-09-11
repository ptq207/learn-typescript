import * as mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export async function connectDatabase(): Promise<MongoMemoryServer> {
	const mongoServer = await MongoMemoryServer.create({
		instance: {
			port: 27017
		}
	});
	const uri = mongoServer.getUri();
	// const mongooseOpts = {
	// 	useNewUrlParser: true,
	// 	dbName: "verifyMASTER",
	// 	useUnifiedTopology: true
	// }
	await mongoose.connect(uri);
	return mongoServer;
}

export async function closeDatabase(mongoServer: MongoMemoryServer) {
	await mongoose.disconnect();
	await mongoServer.stop();
}
