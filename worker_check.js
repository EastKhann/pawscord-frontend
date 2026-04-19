const https = require("https");
// Test the new deployment URL directly
https.get({
  hostname: "7934b71d.pawscord.pages.dev",
  path: "/assets/js/main-BNr3Bg49.js",
  headers: {
    "User-Agent": "Mozilla/5.0 Chrome/124",
    "Sec-Fetch-Mode": "cors",
    "Origin": "https://7934b71d.pawscord.pages.dev"
  }
}, (res) => {
  let d = "";
  res.on("data", c => d += c.slice(0,5));
  res.on("end", () => console.log("DEPLOY cors:", res.statusCode, res.headers["content-type"]?.slice(0,30), d.slice(0,15)));
}).on("error", e => console.log("err:", e.code, e.message));
