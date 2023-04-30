import { AirportConfig } from "../airportData";
import { PilotData } from "components/Strips";

export const DPs = ["MMU9"]

export function getDP(strip: PilotData, config: AirportConfig, type: string) {
    return DPs[0];
}

export function getPDC1(strip: PilotData, config: AirportConfig, dp: string, type: string) {
    if (dp === DPs[0]) {
        return ".cmmu";
    } else return "Error with pdc1";
}

export function getPDC2(config: AirportConfig, pdc1: string) {
    if (config === "Dep 23/Land 23") {
        return ".pdc2 23";
    } else if (config === "Dep 5/Land 5"){
        return ".pdc2 5";
    } else return "Error with pdc2";
}
