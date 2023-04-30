import { PilotData } from "components/Strips";
import { AirportConfig } from "../airportData";

export const DPs = ["EWR4", "PORTT4"]

export function getDP(strip: PilotData, config: AirportConfig, type: string) {
    return DPs[0];
}

export function getPDC1(strip: PilotData, config: AirportConfig, dp: string, type: string) {
    if (dp === DPs[1]) {
        if (strip.flight_plan.route.includes("ELIOT")) return ".cporttt ELIOT";
        else if (strip.flight_plan.route.includes("PARKE")) return ".cporttt PARKE";
        else if (strip.flight_plan.route.includes("LANNA")) return ".cporttt LANNA";
        else if (strip.flight_plan.route.includes("BIGGY")) return ".cporttt BIGGY";
        else return ".cportt";
    } else if (dp === DPs[0]) {
        if (config === "Dep 22R/Land 22L" || config === "Dep 22R/Land 29") return ".cewrs";
        else if (config === "Dep 4L/Land 4R") return ".cewrn";
        else if (config === "4s + ILS 13") return ".cewrni";
    } else return "Error with pdc1";
}

export function getPDC2(config: AirportConfig, pdc1: string) {
    if (config === "Dep 4L/Land 4R" || config === "4s + ILS 13") return ".pdc2 4L";
    else if (config === "Dep 22R/Land 22L") return ".pdc2 22R@W";
    else if (config === "Dep 22R/Land 29") return ".pdc2 22R@Y";
    else return "Error with pdc2";
}
