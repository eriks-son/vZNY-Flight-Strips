import { PilotData } from "components/Strips";
import { AirportConfig } from "../airportData";

export const DPs = ["PHL2"]

export function getDP(strip: PilotData, config: AirportConfig, type: string) {
    return DPs[0];
}

export function getPDC1(strip: PilotData, config: AirportConfig, dp: string, type: string) {
    if (dp === DPs[0]) {
        if (type === "jet") {
            return ".cphl";
        } else {
            return ".cphlp";
        }
    } else return "Error with pdc1";
}

export function getPDC2(config: AirportConfig, pdc1: string) {
    if (config === "Dep 9L/Land 9R") {
        return ".pdc2 9L";
    } else {
        return ".pdc2 27L";
    }
}
