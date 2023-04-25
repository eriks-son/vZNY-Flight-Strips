export const DPs = ["DUCHS8"]

export function getDP(strip, config, type) {
    return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    if (dp === DPs[0]) return ".cpou";
    else return "Error with pdc1";
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 6/Land 6") {
        return ".pdc2 6";
    } else if (config === "Dep 24/Land 24"){
        return ".pdc2 24";
    } else return "Error with pdc2";
}