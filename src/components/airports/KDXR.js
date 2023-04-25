export const DPs = [""]

export function getDP(strip, config, type) {
    return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    if (dp === DPs[0]) return ".cvectors";
    else return "Error with pdc1";
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 8/Land 8") {
        return ".pdc2 8";
    } else if (config === "Dep 26/Land 26"){
        return ".pdc2 26";
    } else return "Error with pdc2";
}