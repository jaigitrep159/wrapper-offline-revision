const fUtil = require("../misc/file");
const stuff = require("./info");
const http = require("http");

function toAttrString(table) {
	return typeof table == "object"
		? Object.keys(table)
				.filter((key) => table[key] !== null)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`)
				.join("&")
		: table.replace(/"/g, '\\"');
}
function toParamString(table) {
	return Object.keys(table)
		.map((key) => `<param name="${key}" value="${toAttrString(table[key])}">`)
		.join(" ");
}
function toObjectString(attrs, params) {
	return `<object ${Object.keys(attrs)
		.map((key) => `${key}="${attrs[key].replace(/"/g, '\\"')}"`)
		.join(" ")}>${toParamString(params)}</object>`;
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	if (req.method != "GET") return;
	const query = url.query;

	var attrs, params, title;
	switch (url.pathname) {
		case "/go_full": {
			let presave =
				query.movieId && query.movieId.startsWith("m")
					? query.movieId
					: `m-${fUtil[query.noAutosave ? "getNextFileId" : "fillNextFileId"]("movie-", ".xml")}`;
			title = "Video Editor";
			attrs = {
				data: process.env.SWF_URL + "/go_full.swf",
				type: "application/x-shockwave-flash",
				id: "video_maker",
			};
			params = {
				flashvars: {
					apiserver: "/",
					isEmbed: 1,
					ctc: "go",
					ut: 50,
					bs: "default",
					appCode: "go",
					page: "",
					siteId: "go",
					lid: 13,
					isLogin: "Y",
					retut: 1,
					themeId: "custom",
					tlang: "en_US",
					presaveId: presave,
					goteam_draft_only: 1,
					isWide: 1,
					collab: 0,
					nextUrl: "/pages/html/create.html",
					storePath: process.env.STORE_URL + "/<store>",
					clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
				},
				allowScriptAccess: "always",
			};
			break;
		}

		default:
			return;
	}
	res.setHeader("Content-Type", "text/html; charset=UTF-8");
	Object.assign(params.flashvars, query);
	res.end(`
	<head>
    	<link rel="stylesheet" type="text/css" href="/pages/css/global.css">
        <link rel="stylesheet" type="text/css" href="/pages/css/modern-normalize.css">
        <link rel="stylesheet" type="text/css" href="/pages/css/swf.css">
		<script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/jquery/jquery-1.11.0.min.js.gz.js"></script>
        <script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/bootstrap3/bootstrap.min.js.gz.js"></script>
        <script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/bootstrap3/bootstrap-switch.min.js.gz.js"></script>
        <script src="https://josephcrosmanplays532.github.io/Old-Vyond-Assets/static/55910a7cd204c37c/go/js/go2.js.gz.js"></script>
        <script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/jquery/jquery.swfobject.min.js.gz.js"></script>
        <script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/jquery/jquery.blockUI-2.66.0.js.gz.js"></script>
        <script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/jquery/jquery.scrollTo.min.js.gz.js"></script>
        <script src="https://josephcrosmanplays532.github.io/Old-Vyond-Assets/static/55910a7cd204c37c/go/js/studio.js.gz.js"></script>
        <script src="https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/go/js/jquery/jquery.tmpl.min.js.gz.js"></script>
    </head>

    <body class="page-container">
        <div style="position:relative;">
            <div id="studioBlock" style="height: 0px;"><!-- --></div>
            <div id="playerBlock"></div>
            <div id="previewPlayerContainer" style="display: none;">
                <div class="preview-player" id="previewPlayer">
                    <h2>Preview Video</h2>
                    <div id="playerdiv"></div>
                    <div id="preview-alert-block" class="preview-alert-block clearfix">Auto-pause at end of scenes is not supported in our web video player.<br>The auto-pause feature is supported once you download the video as presentation in the "Share/Export" overlay.</div>
                    <div class="buttons clearfix">
                        <button class="button_edit" type="button" onclick="switchBackToStudio();">Back to editing</button>
                        <button class="button_save" type="button" onclick="publishStudio();">Save Now</button>
                    </div>
                    <a class="close_btn" href="#" onclick="switchBackToStudio(); return false;">×</a>
                </div>
            </div>
        </div>
        <div style="display:none">
        </div>
        <script>
        $("#previewPlayerContainer").hide();

        var movieDataXmlStr = null,
            filmXmlStr = null,
            previewStartFrame = 0;

        function checkPreviewServer() {
            return previewPlayer._connectionState === PreviewPlayerConstants.STATE_READY;
        }

        function loadLegacyPreview() {
            if (movieDataXmlStr === null) {
                return;
            }

            savePreviewData(movieDataXmlStr);
            createPreviewPlayer("playerdiv", {
                height: 360,
                width: 640,
                player_url: "https://localhost:4664/animation/8389acc5d2f2b548/player.swf",
                quality: "medium"
            }, {
                movieOwner: "", movieOwnerId: "", movieId: "", ut: "-1",
                movieLid: "8", movieTitle: "", movieDesc: "", userId: "", username: "", uemail: "",
                apiserver: "/", thumbnailURL: "", copyable: "0", isPublished: "0", ctc: "go", tlang: "en_US", is_private_shared: "0",
                autostart: "1", appCode: "go", is_slideshow: "0", originalId: "0", is_emessage: "0", isEmbed: "0", refuser: "",
                utm_source: "", uid: "", isTemplate: "1", showButtons: "0", chain_mids: "", showshare: "0", averageRating: "",
                            s3base: "https://s3.amazonaws.com/fs.goanimate.com/,https://assets.vyond.com/",
                        ratingCount: "", fb_app_url: "/", numContact: 0, isInitFromExternal: 1, storePath: "https://localhost:4664/store/3a981f5cb2739137/<store>", clientThemePath: "https://josephcrosmanplays532.github.io/static/55910a7cd204c37c/<client_theme>", animationPath: "https://josephcrosmanplays532.github.io/animation/8389acc5d2f2b548/",
                startFrame: previewStartFrame
            });
            $('#previewPlayer').removeClass('using-h5');
        }

        function initPreviewPlayer(dataXmlStr, startFrame, containsChapter, themeList) {
            movieDataXmlStr = dataXmlStr;
            previewStartFrame = startFrame;

            filmXmlStr = dataXmlStr.split("<filmxml>")[1].split("</filmxml>")[0];

            if (typeof startFrame == 'undefined') {
                startFrame = 1;
            } else {
                startFrame = Math.max(1, parseInt(startFrame));
            }

            if (containsChapter) {
                $("#preview-alert-block").show();
            } else {
                $("#preview-alert-block").hide();
            }

            previewSceen();

            $("#previewPlayerContainer").show();


                // fallback to legacy preview
                loadLegacyPreview();

                if (!checkPreviewServer() && (previewPlayerRetryCount > 0)) { // Retry on WebSocket connection problem
                    previewPlayer.connect();
                    previewPlayerRetryCount--;
                }

        }

        function switchBackToStudio() {
            try {
                ($("#previewPlayerContainer #Player").get(0) || {pause:function(){}}).pause();
            } catch (err) {};

            $("#previewPlayerContainer").hide();
            restoreStudio();
            document.getElementById("Studio").onExternalPreviewPlayerCancel();
        }
        function publishStudio() {
            try {
                ($("#previewPlayerContainer #Player").get(0) || {pause:function(){}}).pause();
            } catch (err) {};

            $("#previewPlayerContainer").hide();
            restoreStudio();
            document.getElementById("Studio").onExternalPreviewPlayerPublish();
        }
        function exitStudio(share) {
            loadedFullscreenStudio = false;
        }

        window.addEventListener(PreviewPlayerEvent.ANIMATION_INCOMPATIBLE, function() {
            loadLegacyPreview();
        });
        </script>

        <div id="studio_container" style="top: 0px;">
            <div id="studio_holder">
                ${toObjectString(attrs, params)}
            </div>
        </div>
    </body>
    ${stuff.pages[url.pathname] || ''}
	`);
	return true;
};
