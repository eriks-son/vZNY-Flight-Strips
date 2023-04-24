export const DPs = ["SWF9"]

export function getDP(strip, config, type) {
    return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    if (dp === DPs[0]) {
        return ".cswf";
    } else return "Error with pdc1";
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 9/Land 9") {
        return ".pdc2 9";
    } else if (config === "Dep 27/Land 27") {
        return ".pdc2 27";
    } else return "Error with pdc2";
}