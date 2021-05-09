////
//// this js starts wrapper and loads the js files
////

const env = Object.assign(process.env, require("./env"), require("./config"));

///
/// variables
///
const env = Object.assign(process.env, require("./env"), require("./config"));
const http = require("http");
const asset_list = require("./asset/list");
const asset_load = require("./asset/load");
const asset_thumb = require("./asset/thmb");
const asset_upload = require("./asset/upload");
const char_load = require("./character/load");
const char_premade = require("./character/premade");
const char_redirect = require("./character/redirect");
const char_save = require("./character/save");
const char_thmb = require("./character/thmb");
const movie_list = require("./movie/list");
const movie_load = require("./movie/load");
const movie_meta = require("./movie/meta");
const movie_save = require("./movie/save");
const movie_thumb = require("./movie/thmb");
const movie_upload = require("./movie/upload");
const static_load = require("./static/load");
const static_page = require("./static/page");
const theme_list = require("./theme/list");
const theme_load = require("./theme/load");
const tts_load = require("./tts/load");
const tts_voices = require("./tts/voices");
const url = require("url");

///
/// functions
///
const functions = [
	asset_list,
	asset_load,
	asset_thumb,
	asset_upload,
	char_load,
	char_premade,
	char_redirect,
	char_save,
	char_thmb,
	movie_list,
	movie_load,
	movie_meta,
	movie_save,
	movie_thumb,
	movie_upload,
	static_load,
	static_page,
	theme_list,
	theme_load,
	tts_load,
	tts_voices
];

///
/// create http server
///
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

// Hi, Cleveland.
// Hi Joseph. What's the story, morning glory?
// What's the word, humming bird?
// Have you heard Peter Griffin is slow?
// Can he still drive a car?
// Can he drink at a bar?
// Will they let him have kids?
// Is his life on the skids?
// Hello, Mrs. Griffin, it's your neighbor Quagmire.
// Now that Peter's mental, you probably have some needs, oh!
// He's retarded!
// He's retarded!
// He's retarded!
// He's retarded!
// He's retarded!
// He's retarded!
// Peter is slow!
console.log("Welcome to verbose mode.");