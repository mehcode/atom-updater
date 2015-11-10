import fs from "fs";
import child from "child_process";
import cheerio from "cheerio";
import request from "superagent-bluebird-promise";
import tmp from "tmp";

function getInstalledVersion() {
  try {
    return child.execSync("atom --version", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch (err) {
    if (err.status === 127) {
      return null;
    } else {
      throw err;
    }
  }
}

async function installVersion(version) {
  console.log("");
  console.log("\x1b[1;37m[*] Downloading version v%s...\x1b[0m", version);
  var filename = tmp.tmpNameSync();
  var file = fs.createWriteStream(filename);

  var url = `https://github.com/atom/atom/releases/download/v${version}/atom-amd64.deb`
  await new Promise(function(resolve) {
    var process = child.spawn("curl", ["-L", url], {
      stdio: ["ignore", "pipe", "inherit"]
    });

    process.stdout.on("data", function(data) {
      file.write(data)
    });

    process.stdout.on("end", function() {
      file.end()
    });

    process.on("exit", function() {
      resolve();
    });
  })

  console.log("");
  console.log("\x1b[1;37m[*] Installing version v%s...\x1b[0m", version);

  await new Promise(function(resolve) {
    var process = child.spawn("sudo", ["dpkg", "-i", filename], {
      stdio: ["ignore", "inherit", "inherit"]
    });

    process.on("exit", function() {
      resolve();
    });
  });
}

async function main(beta = false) {
  console.log("\x1b[1;37m[*] Checking for installed version...\x1b[0m");
  let installedVersion = getInstalledVersion();
  if (installedVersion == null) {
    console.log("\x1b[0;36m - (not installed)\x1b[0m")
  } else {
    console.log("\x1b[0;36m - %s\x1b[0m", installedVersion)
  }

  let latestVersion;

  console.log("");
  console.log("\x1b[1;37m[*] Checking for latest version...\x1b[0m");
  if (beta) {
    let res = await request.get("https://github.com/atom/atom/releases");
    let $ = cheerio.load(res.text);
    latestVersion = $(".release-title").first().text().trim();
  } else {
    let res = await request.get("https://github.com/atom/atom/releases/latest");
    let $ = cheerio.load(res.text);
    latestVersion = $(".release-title").text().trim();
  }
  console.log("\x1b[0;36m - %s\x1b[0m", latestVersion);

  if (installedVersion === latestVersion) {
    // All good!
    return;
  }

  installVersion(latestVersion);
}

export default main;
