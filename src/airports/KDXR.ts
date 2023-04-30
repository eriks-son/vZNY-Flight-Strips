import { PilotData } from "components/Strips";
import { AirportConfig } from "../airportData";

export const DPs = [""]

export function getDP(strip: PilotData, config: AirportConfig, type: string) {
    return DPs[0];
}

export function getPDC1(strip: PilotData, config: AirportConfig, dp: string, type: string) {
    if (dp === DPs[0]) return ".cvectors";
    else return "Error with pdc1";
}

export function getPDC2(config: AirportConfig, pdc1: string) {
    if (config === "Dep 8/Land 8") {
        return ".pdc2 8";
    } else if (config === "Dep 26/Land 26"){
        return ".pdc2 26";
    } else return "Error with pdc2";
}
