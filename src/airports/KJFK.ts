import { PilotData } from "../components/Strips";
import { AirportConfig } from "../airportData";

export const DPs = ["SKORR5", "JFK5", "DEEZZ5"]

export function getDP(strip: PilotData, config: AirportConfig, type: string) {
    if (strip.flight_plan.route.includes("DEEZZ")) return DPs[2];
    else if (config === "Dep 31L/Land 31R") {
        if (strip.flight_plan.route.includes("RBV")
        || strip.flight_plan.route.includes("WHITE")
        || strip.flight_plan.route.includes("DIXIE")) return DPs[0];
        else if (type === "prop" || type === "turboprop") return DPs[1];
        else return DPs[0];
    }
    else return DPs[1];
}

export function getPDC1(strip: PilotData, config: AirportConfig, dp: string, type: string) {
    if (dp === "SKORR5") {
        if (strip.flight_plan.route.includes("RBV")
        || strip.flight_plan.route.includes("WHITE")
        || strip.flight_plan.route.includes("DIXIE")) return ".cskorr RNGRR";
        else return ".cskorr YNKEE";
    } else if (dp === "DEEZZ5") {
        if (config === "Dep 4L/Land 4R") return ".cdeezz4 CANDR";
        else if (config === "Dep 31L/Land 31R") return ".cdeezz3 CANDR";
        else return ".cdeezz CANDR";
    } else if (dp === "JFK5") {
        if (config === "Dep 31L/Land 31R") {
            if (strip.flight_plan.route.includes("RBV")
            || strip.flight_plan.route.includes("WHITE")
            || strip.flight_plan.route.includes("DIXIE")) return ".cjfkb";
            else if (type === "prop" || type === "turboprop") return ".cjfki";
            else return ".cjfkc";
        } else if (config === "Dep 4L/Land 4R") return ".cjfk4";
        else if (config === "Dep 13R/Land 13L") {
            var heading;
            if (strip.flight_plan.route.includes("RBV")
            || strip.flight_plan.route.includes("WHITE")
            || strip.flight_plan.route.includes("DIXIE")) heading = "185";
            else if (strip.flight_plan.route.includes("SHIPP")
            || strip.flight_plan.route.includes("WAVEY")) heading = "170";
            else if (strip.flight_plan.route.includes("BETTE")
            || strip.flight_plan.route.includes("HAPIE")) heading = "155";
            else if (type === "jet") heading = "110";
            else heading = "090";
            return ".cjfkh " + heading + "";
        } else if (config === "Dep 22R/Land 22L") return ".cjfk";
    } else return "Error with pdc1";
}

export function getPDC2(config: AirportConfig, pdc1: string) {
    if (config === "Dep 4L/Land 4R") return ".pdc2 4L";
    else if (config === "Dep 13R/Land 13L") return ".pdc2 13R";
    else if (config === "Dep 22R/Land 22L") return ".pdc2 22R";
    else if (config === "Dep 31L/Land 31R") {
        if (pdc1.substring(0, 6) === ".cjfki") return ".pdc2 31R";
        else return ".pdc2 31L";
    }
    else return "Error with pdc2";
}
