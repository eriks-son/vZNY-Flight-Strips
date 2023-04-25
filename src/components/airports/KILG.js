export const DPs = [""]

export function getDP(strip, config, type) {
    return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    if (dp === DPs[0]) return ".cvectors";
    else return "Error with pdc1";
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 19/Land 19") {
        return ".pdc2 19";
    } else if (config === "Dep 1/Land 1"){
        return ".pdc2 1";
    } else if (config === "Dep 32/Land 32"){
        return ".pdc2 32";
    } else return "Error with pdc2";
}