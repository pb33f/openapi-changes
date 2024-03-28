export const CONFIG = {
    name: "openapi-changes",
    path: "./bin",
    url: "https://github.com/pb33f/openapi-changes/releases/download/v{{version}}/{{bin_name}}_{{version}}_{{platform}}_{{arch}}.tar.gz",
};
export const ARCH_MAPPING = {
    ia32: "i386",
    x64: "x86_64",
    arm64: "arm64",
};
export const PLATFORM_MAPPING = {
    darwin: "darwin",
    linux: "linux",
    win32: "windows",
};