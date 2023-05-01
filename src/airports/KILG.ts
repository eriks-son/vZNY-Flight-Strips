import { AirportConfig } from "../airportData";
import { PilotData } from "components/Strips";

export const DPs = [""]

export function getDP(strip: PilotData, config: AirportConfig, type: string) {
    return DPs[0];
}

export function getPDC1(strip: PilotData, config: AirportConfig, dp: string, type: string) {
    if (dp === DPs[0]) return ".cvectors";
    else return "Error with pdc1";
}

export function getPDC2(config: AirportConfig, pdc1: string) {
    if (config === "Dep 19/Land 19") {
        return ".pdc2 19";
    } else if (config === "Dep 1/Land 1"){
        return ".pdc2 1";
    } else if (config === "Dep 32/Land 32"){
        return ".pdc2 32";
    } else return "Error with pdc2";
}
