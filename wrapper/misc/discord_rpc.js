////
//// this js loads the discord rpc
////

///
/// variables
///
const RPC = require("discord-rpc");
// loads env.json for Revision version
require("../server");
const env = Object.assign(process.env,
	require('../env'));
let version = env.WRAPPER_VER;

///
/// Discord rich presence
///
const rpc = new RPC.Client({
	transport: "ipc"
});
rpc.on("ready", () => {
	// Sets RPC activity
	rpc.setActivity({
		details: "Version " + version,
		startTimestamp: new Date(),
		largeImageKey: "icon",
		largeImageText: "Wrapper: Offline",
		smallImageKey: "Wrapper: Offline",
		smallImagetext: "Wrapper: Offline",
	});
	// Logs "Rich presence is on!" in the console
	console.log("Wrapper: Offline (Revision) rich presence is on!")
});
// Connects RPC to app
rpc.login({
	clientId: "825080302178926633"
});
