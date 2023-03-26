export const DPs = ["LGA7", "TNNIS6", "GLDMN8", "NTHNS5", "JUTES3", "HOPEA3"]

export function getDP(strip, config, type) {
    const route = strip.flight_plan.route;
    const airspace = localStorage.getItem("KLGA_airspace");
    if (config === "Dep 4/Land Any") return DPs[0];
    else if (config === "Dep 13/Land 22"
    || config === "Dep 13/Land 4") {
        if (airspace === "none") {
            if (type === "prop") return DPs[0];
            else return DPs[1];
        } else if (airspace === "belmont") return DPs[0];
        else if (airspace === "coney") {
            if (route.includes("GREKI")
            || route.includes("MERIT")
            || route.includes("BAYYS")
            || route.includes("BDR")
            || route.includes("CMK")) {
                if (type === "prop") return DPs[0];
                else return DPs[1];
            } else if (route.includes("DPK")
                || route.includes("SHIPP")
                || route.includes("WAVEY")
                || route.includes("DIXIE")
                || route.includes("WHITE")) {
                if (type === "jet") return DPs[3];
                else return DPs[0];
            } else {
                if (config === "Dep 13/Land 4") {
                    if (type === "prop") return DPs[0];
                    else return DPs[1];
                } else {
                    if (type === "jet") return DPs[2];
                    else return DPs[0];
                }
            }
        } else if (airspace === "both") return DPs[0];
    } else if (config === "Dep 22/Land 22") {
        if ((route.includes("DPK")
        || route.includes("SHIPP")
        || route.includes("WAVEY")
        || route.includes("DIXIE")
        || route.includes("WHITE"))
        && (airspace === "coney" 
        || airspace === "both")
        && type === "jet") return DPs[5];
        else if (type === "prop") return DPs[0];
        else return DPs[4];
    } else return DPs[0];
}

export function getPDC1(strip, config, dp, type) {
    const airspace = localStorage.getItem("KLGA_airspace");
    const route = strip.flight_plan.route;
    if (dp === DPs[5]) return ".chopea";
    else if (dp === DPs[4]) return ".cjutes";
    else if (dp === DPs[3]) return ".cnthns";
    else if (dp === DPs[2]) return ".cgldmn";
    else if (dp === DPs[1]) return ".ctnnis";
    else if (dp === DPs[0]) {
        if (config === "Dep 4/Land Any") {
            if (route.includes("NEWEL")
            || route.includes("ELIOT")
            || route.includes("ZIMMZ")
            || route.includes("PARKE")
            || route.includes("LANNA")
            || route.includes("BIGGY")) return ".clgab";
            else if (route.includes("WHITE")
            && type === "jet") return ".clgab";
            else return ".clgap";
        } else if (config === "Dep 13/Land 22"
        || config === "Dep 13/Land 4") {
            if (airspace === "belmont") return ".clgaw";
            else if (airspace === "coney") {
                if (route.includes("GREKI")
                || route.includes("MERIT")
                || route.includes("BAYYS")
                || route.includes("BDR")
                || route.includes("CMK")) return ".clgaf";
                else if (route.includes("DPK")
                || route.includes("SHIPP")
                || route.includes("WAVEY")
                || route.includes("DIXIE")
                || route.includes("WHITE")) return ".clgac";
                else return ".clgam";
            } else if (airspace === "none") return ".clgaf";
            else if (airspace === "both") {
                if (route.includes("DPK")
                || route.includes("SHIPP")
                || route.includes("WAVEY")
                || route.includes("DIXIE")
                || route.includes("WHITE")) return ".clgac";
                else return ".clgaw";
            }
        } else if (config === "Dep 22/Land 22") return ".clga";
        else if (config === "Dep 31/Land Any") {
            if (route.includes("NEWEL")
            || route.includes("ELIOT")
            || route.includes("ZIMMZ")
            || route.includes("PARKE")
            || route.includes("LANNA")
            || route.includes("BIGGY")
            || (route.includes("WHITE")
            && type === "jet")) return ".clgah 340";
            else return ".clgah 360";
        } else return "Error with pdc1";
    }
}

export function getPDC2(config, pdc1) {
    if (config === "Dep 4/Land Any") return ".pdc2 4";
    else if (config === "Dep 13/Land 22"
    || config === "Dep 13/Land 4") return ".pdc2 13";
    else if (config === "Dep 22/Land 22") return ".pdc2 22";
    else if (config === "Dep 31/Land Any") return ".pdc2 31";
    else return "Error with pdc2";
}

export function LGAairspace(airport) {
    if (airport === "KLGA") {
        return (
            <select id="KLGA_airspace">
                <option value="none">None</option>
                <option value="coney">Coney</option>
                <option value="belmont">Belmont</option>
                <option value="both">Both</option>
            </select>
        );
    }
}