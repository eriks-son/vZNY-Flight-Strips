export const DPs = ["HPN7", "PROP1"]

export function getDP(strip, config, type) {
    return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    if (dp === DPs[0]) return ".chpn";
    else if (dp === DPs[1]) return ".cprop";
    else return "Error with pdc1";
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 16/Land 16") {
        return ".pdc2 16";
    } else if (config === "Dep 34/Land 34"){
        return ".pdc2 34";
    } else return "Error with pdc2";
}