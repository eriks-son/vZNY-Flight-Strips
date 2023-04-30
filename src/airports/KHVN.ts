import { PilotData } from "components/Strips";
import { AirportConfig } from "../airportData";

export const DPs = ["BHAVN1"]

export function getDP(strip: PilotData, config: AirportConfig, type: string) {
    return DPs[0];
}

export function getPDC1(strip: PilotData, config: AirportConfig, dp: string, type: string) {
    if (dp === DPs[0]) {
        return ".cbhavn";
    } else return "Error with pdc1";
}

export function getPDC2(config: AirportConfig, pdc1: string) {
    if (config === "Dep 24/Land 24") {
        return ".pdc2 24";
    } else if (config === "Dep 6/Land 6"){
        return ".pdc2 6";
    } else if (config === "Dep 33L/Land 33L") {
        return ".pdc2 33L";
    } else if (config === "Dep 15R/Land 15R") {
    } else return "Error with pdc2";
}
