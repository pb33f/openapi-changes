import { createReadStream, createWriteStream } from "node:fs";
import * as fs from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { execSync } from "node:child_process";
import { createGunzip } from "node:zlib";
import { unpackTar } from "modern-tar/fs";

import { ARCH_MAPPING, CONFIG, PLATFORM_MAPPING } from "./config.js";

async function install() {
    if (process.platform === "android") {
        console.log("Installing, may take a moment...");
        const cmd =
            "pkg upgrade && pkg install golang git -y && git clone https://github.com/pb33f/openapi-changes.git && cd cli/ && go build -o $PREFIX/bin/openapi-changes";
        execSync(cmd, { encoding: "utf-8" });
        console.log("Installation successful!");
        return;
    }
    const packageJson = await fs.readFile("package.json").then(JSON.parse);
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
    if (!response.ok || !response.body) {
        throw new Error("Failed fetching the binary: " + response.statusText);
    }

    const tarFile = "downloaded.tar.gz";

    await fs.mkdir(binPath, { recursive: true });
    await pipeline(response.body, createWriteStream(tarFile));

    const readStream = createReadStream(tarFile);
    await pipeline(readStream, createGunzip(), unpackTar(binPath));

    await fs.rm(tarFile);
}

install()
    .then(async () => {
        process.exit(0);
    })
    .catch(async (err) => {
        console.error(err);
        process.exit(1);
    });
