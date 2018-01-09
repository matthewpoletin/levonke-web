"use strict";

if (!document.APP) { document.APP = {}; }

function setCookie(cookie) {
	if (!cookie.name || !cookie.value) { return undefined; }
	const expires = new Date();
	expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
	cookie.expires = cookie.expires || expires;
	cookie.domain = cookie.domain || "localhost";
	cookie.path = cookie.path || "/";
	cookie.secure = cookie.secure || false;
	const cookieString = `  ${cookie.name}=${encodeURIComponent(cookie.value)};
							expires=${cookie.expires.toUTCString()};
                            domain=${cookie.domain};
                            path=${cookie.path};
							${cookie.secure ? "secure;" : ""}`;
	document.cookie = cookieString.replace(/\n/gi, " ").replace(/\s+/gi, " ");
	return cookie.value;
}

function getCookie(name) {
	const matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, "\\$1") + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

document.APP.setCookie = setCookie;
document.APP.getCookie = getCookie;
