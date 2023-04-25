export const DPs = ["MMU9"]

export function getDP(strip, config, type) {
    return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    if (dp === DPs[0]) {
        return ".cmmu";
    } else return "Error with pdc1";
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 23/Land 23") {
        return ".pdc2 23";
    } else if (config === "Dep 5/Land 5"){
        return ".pdc2 5";
    } else return "Error with pdc2";
}