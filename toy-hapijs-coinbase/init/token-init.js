const db = require("../dist/models/token");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/core-system");

const mongoConn = mongoose.connection;

mongoConn.on("open", () => {
	console.log("Connected to db successfully");
});

mongoConn.on("error", () => {
	console.log("Connect to db fail");
})

const tokens = [
	{
		code: "SOL",
		tokenName: "Solana",
		price: 2.2,
		marketCap: 48392949,
		vol: 1039020000,
		issueDate: new Date(),
		introduction: "Scalable blockchain, end-users friendly app"
	},
	{
		code: "AVAX",
		tokenName: "Avalanche",
		price: 55.0,
		marketCap: 16392039,
		vol: 830888400,
		issueDate: new Date(),
		introduction: "Blazingly Fast, Low Cost, & Eco-Friendly"
	},
	{
		code: "LINK",
		tokenName: "Chainlink",
		price: 28.57,
		marketCap: 12494040,
		vol: 993339589,
		issueDate: new Date(),
		introduction: "Blockchain abstraction layer that enables universally connected smart contracts"
	},
	{
		code: "NEAR",
		tokenName: "Near protocol",
		price: 2.2,
		marketCap: 4392949000,
		vol: 326994003,
		issueDate: new Date(),
		introduction: "Decentralized application platform designed to make apps usable on the web"
	},
	{
		code: "ADA",
		tokenName: "Cardano",
		price: 2.38,
		marketCap: 76162419957,
		vol: 1873443993,
		issueDate: new Date(),
		introduction: "Proof-of-stake blockchain platform"
	},
	{
		code: "ETH",
		tokenName: "Ethereum",
		price: 3421.97,
		marketCap: 402266133848,
		vol: 14618017587,
		issueDate: new Date(),
		introduction: "Decentralized open-source blockchain system that features its own cryptocurrency"
	},
	{
		code: "DOT",
		tokenName: "Polkadot",
		price: 34.06,
		marketCap: 33596508245,
		vol: 1563800913,
		issueDate: new Date(),
		introduction: "Open-source sharding multichain protocol that facilitates the cross-chain transfer"
	},
	{
		code: "AXS",
		tokenName: "Axie infinity",
		price: 65.93,
		marketCap: 4018253860,
		vol: 160649958,
		issueDate: new Date(),
		introduction: "Blockchain-based trading and battling game that is partially owned and operated by its players"
	},
	{
		code: "ONE",
		tokenName: "Harmony",
		price: 0.1629,
		marketCap: 1720300461,
		vol: 121307374,
		issueDate: new Date(),
		introduction: "Blockchain platform designed to facilitate the creation and use of decentralized applications"
	},
	{
		code: "SUSHI",
		tokenName: "SushiSwap",
		price: 12.34,
		marketCap: 1570453811,
		vol: 383343255,
		issueDate: new Date(),
		introduction: "SushiSwap (SUSHI) is an example of an automated market maker (AMM)"
	},
]

const initToken = async () => {
	let promises = [];
	tokens.forEach(token => {
		try {
			promises.push(db.TokenModel.create(token));
		} catch (err) {
			console.err("Error while initializing token ", err)
		}
	});
	await Promise.all(promises);
}

initToken().then(() => {
	console.log("init done");
});

