export const DPs = ["REP1", "DEEZZ5"]

export function getDP(strip, config, type) {
    if (strip.flight_plan.route.includes("DEEZZ")) return DPs[1];
    else return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    if (dp === DPs[1]) {
        if (localStorage.getItem("KJFK") === "Dep 22R/Land 22L") return ".cdeezzr22";
        else return ".cdeezzr";
    }
    else if (dp === DPs[0]) {
        if (localStorage.getItem("KJFK") === "Dep 22R/Land 22L") return ".crep22";
        else return ".crep";
    } else return "Error with pdc1";
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 19/Land 19") {
        return ".pdc2 19";
    } else if (config === "Dep 14/Land 14"){
        return ".pdc2 14";
    } else if (config === "Dep 1/Land 1") {
        return ".pdc2 1";
    } else if (config === "Dep 32/Land 32") {
        return ".pdc2 32";
    } else return "Error with pdc2";
}