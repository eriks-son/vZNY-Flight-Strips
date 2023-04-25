export const DPs = ["BHAVN1"]

export function getDP(strip, config, type) {
    return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    if (dp === DPs[0]) {
        return ".cbhavn";
    } else return "Error with pdc1";
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 2/Land 2") {
        return ".pdc2 2";
    } else if (config === "Dep 20/Land 20"){
        return ".pdc2 20";
    } else return "Error with pdc2";
}