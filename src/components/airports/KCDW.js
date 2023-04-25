export const DPs = [""]

export function getDP(strip, config, type) {
    return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    if (dp === DPs[0]) {
        return ".ccdw";
    } else return "Error with pdc1";
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 22/Land 22") {
        return ".pdc2 24";
    } else if (config === "Dep 4/Land 4"){
        return ".pdc2 6";
    } else return "Error with pdc2";
}