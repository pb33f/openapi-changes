import { createWriteStream } from "fs";
import * as fs from "fs";


import fetch from "node-fetch";
import { pipeline } from "stream/promises";
import tar from "tar";
import AdmZip from 'adm-zip'
import { execSync } from "child_process";

import { ARCH_MAPPING, CONFIG, PLATFORM_MAPPING } from "./config.js";

async function install() {
    if (process.platform === "android") {
        console.log("Installing openapi-changes, may take a moment...");
        const cmd =
            "pkg upgrade && pkg install golang git -y && git clone https://github.com/pb33f/openapi-changes.git && cd cli/ && go build -o $PREFIX/bin/openapi-changes";
        execSync(cmd, { encoding: "utf-8" });
        console.log("openapi-changes installation successful!");
        return;
    }
    const packageJson = await fs.promises.readFile("package.json").then(JSON.parse);
    let version = packageJson.version;

    if (typeof version !== "string") {
        throw new Error("Missing version in package.json");
    }

    if (version[0] === "v") version = version.slice(1);

    let { name: binName, path: binPath, url } = CONFIG;

    url = url.replace(/{{arch}}/g, ARCH_MAPPING[process.arch]);
    url = url.replace(/{{platform}}/g, PLATFORM_MAPPING[process.platform]);
    url = url.replace(/{{version}}/g, version);
    url = url.replace(/{{bin_name}}/g, binName);


    console.log('fetching from URL', url)
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed fetching the binary: " + response.statusText);
    }

    const zipFile = "downloaded.zip";
    await fs.promises.mkdir(binPath, { recursive: true });
    await pipeline(response.body, createWriteStream(zipFile));

    // unzip binary
    const zip = new AdmZip(zipFile);
    zip.extractAllTo(binPath, true);

    // make the binary executable.
    await fs.chmodSync(`${binPath}/openapi-changes`, 0o755);
    await fs.promises.rm(zipFile);
    console.log("openapi-changes installation successful!");
}

install()
    .then(async () => {
        process.exit(0);
    })
    .catch(async (err) => {
        console.error(err);
        process.exit(1);
    });