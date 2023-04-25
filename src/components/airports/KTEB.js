export const DPs = ["TEB3", "RUUDY6"]

export function getDP(strip, config, type) {
    if (type === "jet" && config === "Dep 24/Land 19") return DPs[1];
    else return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    if (dp === DPs[1]) return ".cruudy";
    else if (dp === DPs[0]) {
        if (config === "Dep 24/Land 19") return ".cteb2";
        else return ".cteb";
    } else return "Error with pdc1";
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 24/Land 19") {
        return ".pdc2 24";
    } else if (config === "Dep 1/Land 6"){
        return ".pdc2 1";
    } else return "Error with pdc2";
}