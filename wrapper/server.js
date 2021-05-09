const env = Object.assign(process.env, require("./env"), require("./config"));

const http = require("http");
const asl = require("./asset/list");
const asL = require("./asset/load");
const ast = require("./asset/thmb");
const asu = require("./asset/upload");
const chl = require("./character/load");
const chp = require("./character/premade");
const chr = require("./character/redirect");
const chs = require("./character/save");
const cht = require("./character/thmb");
const msd = require("./misc/discord_rpc.js");
const mvl = require("./movie/list");
const mvL = require("./movie/load");
const mvm = require("./movie/meta");
const mvs = require("./movie/save");
const mvt = require("./movie/thmb");
const mvu = require("./movie/upload");
const stl = require("./static/load");
const stp = require("./static/page");
const thl = require("./theme/list");
const thL = require("./theme/load");
const tsl = require("./tts/load");
const tsv = require("./tts/voices");
const url = require("url");

const functions = [
	asl,
	asL,
	ast,
	asu,
	chl,
	chp,
	chr,
	chs,
	cht,
	msd,
	mvl,
	mvL,
	mvm,
	mvs,
	mvt,
	mvu,
	stl,
	stp,
	thl,
	thL,
	tsl,
	tsv
];

// Creates an HTTP server
module.exports = http
	.createServer((req, res) => {
		try {
			const parsedUrl = url.parse(req.url, true);
			//if (!parsedUrl.path.endsWith('/')) parsedUrl.path += '/';
			const found = functions.find((f) => f(req, res, parsedUrl));
			console.log(req.method, parsedUrl.path);
			if (!found) {
				res.statusCode = 404;
				res.end();
			}
		} catch (x) {
			res.statusCode = 404;
			res.end();
		}
	})
	.listen(env.SERVER_PORT, console.log);

// have you heard peter griffin is slow