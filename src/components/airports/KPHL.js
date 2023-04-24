export const DPs = ["PHL2"]

export function getDP(strip, config, type) {
    return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    if (dp === DPs[0]) {
        if (type === "jet") {
            return ".cphl";
        } else {
            return ".cphlp";
        }
    } else return "Error with pdc1";
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 9L/Land 9R") {
        return ".pdc2 9L";
    } else {
        return ".pdc2 27L";
    }
}