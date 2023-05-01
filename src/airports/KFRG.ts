import { PilotData } from "components/Strips";
import { AirportConfig } from "../airportData";

export const DPs = ["REP1", "DEEZZ5"]

export function getDP(strip: PilotData, config: AirportConfig, type: string) {
    if (strip.flight_plan.route.includes("DEEZZ")) return DPs[1];
    else return DPs[0];
}

export function getPDC1(strip: PilotData, config: AirportConfig, dp: string, type: string) {
    if (dp === DPs[1]) {
        if (localStorage.getItem("KJFK") === "Dep 22R/Land 22L") return ".cdeezzr22";
        else return ".cdeezzr";
    }
    else if (dp === DPs[0]) {
        if (localStorage.getItem("KJFK") === "Dep 22R/Land 22L") return ".crep22";
        else return ".crep";
    } else return "Error with pdc1";
}

export function getPDC2(config: AirportConfig, pdc1: string) {
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
