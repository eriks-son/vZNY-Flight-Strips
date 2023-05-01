import { PilotData } from "components/Strips";
import { AirportConfig } from "../airportData";

export const DPs = ["TEB3", "RUUDY6"]

export function getDP(strip: PilotData, config: AirportConfig, type: string) {
    if (type === "jet" && config === "Dep 24/Land 19") return DPs[1];
    else return DPs[0];
}

export function getPDC1(strip: PilotData, config: AirportConfig, dp: string, type: string) {
    if (dp === DPs[1]) return ".cruudy";
    else if (dp === DPs[0]) {
        if (config === "Dep 24/Land 19") return ".cteb2";
        else return ".cteb";
    } else return "Error with pdc1";
}

export function getPDC2(config: AirportConfig, pdc1: string) {
    if (config === "Dep 24/Land 19") {
        return ".pdc2 24";
    } else if (config === "Dep 1/Land 6"){
        return ".pdc2 1";
    } else return "Error with pdc2";
}
