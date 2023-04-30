import { PilotData } from "components/Strips";
import { AirportConfig } from "../airportData";

export const DPs = [""]

export function getDP(strip: PilotData, config: AirportConfig, type: string) {
    return DPs[0];
}

export function getPDC1(strip: PilotData, config: AirportConfig, dp: string, type: string) {
    if (dp === DPs[0]) {
        return ".ccdw";
    } else return "Error with pdc1";
}

export function getPDC2(config: AirportConfig, pdc1: string) {
    if (config === "Dep 22/Land 22") {
        return ".pdc2 24";
    } else if (config === "Dep 4/Land 4"){
        return ".pdc2 6";
    } else return "Error with pdc2";
}
