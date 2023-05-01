import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PilotData } from "./Strips";

type PRDProps = {
    strip: PilotData;
    setRoute: (route: string) => void;
}

// not working due to CORS
function PRD({strip, setRoute}: PRDProps) {
    const [prdData, setPrdData] = useState<any>({});

    const handleRouteSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRoute(e.target.value);
    }

    const replaceHTML = (text: string) => {
        let newText = text.replaceAll("&EQUALS;", "=");
        newText = newText.replaceAll("&GT;", ">");
        newText = newText.replaceAll("&LT;", "<");
        return newText;
    }

    useEffect(() => {
        const getRoutes = async () => {
            const api = await fetch(`https://5n1v87j7va.execute-api.us-east-1.amazonaws.com/Prod/route?from=${strip.flight_plan.departure.substring(1)}&to=${strip.flight_plan.arrival.substring(1)}`);
            const data = await api.json();
            data.body.routes.reverse(); // Reverse so that "green" routes are first
            setPrdData(data);
        }
        void getRoutes();
    }, []);


    if (!prdData.hasOwnProperty("statusCode")) {
        return (
            <PRDNone>
                <h2>
                    LOADING
                </h2>
            </PRDNone>
        )
    }

    if (prdData.statusCode != 200) {
        return (
            <PRDNone>
                <h2>
                    Error with PRD
                </h2>
            </PRDNone>
        )
    }

    else if (prdData.body.routes.length == 0) {
        return (
            <PRDNone>
                <h2>
                    No PRD routes
                </h2>
            </PRDNone>
        )
    }

    else if (prdData.body.routes[0].dst_ctr !== "ZNY"
    && prdData.body.routes[0].dst_ctr !== "ZBW"
    && prdData.body.routes[0].dst_ctr !== "ZOB"
    && prdData.body.routes[0].dst_ctr !== "ZDC"
    && strip.flight_plan.arrival !== "CYYZ") {
        return (
            <PRDNone>
                <h2>
                    Not a Tier 1 ARTCC
                </h2>
            </PRDNone>
        )
    }

    else {
        return (
            <PRDSelect>
                <select id="prdRouteSelect" onChange={handleRouteSelect}>
                    <option value={strip.flight_plan.route}>
                        As Filed
                    </option>
                    {(prdData.body.routes as any[]).map((route: any, i) => {
                        return (
                            <option key={i} value={route.route} className={route.pref == 1 ? "preferred" : "faa"}>
                                Area: {route.area.length > 0 ? route.area : "None"} |
                                Altitude: {route.alt.length > 0 ? replaceHTML(route.alt): "None"} |
                                Aircraft: {route.aircraft.length > 0 ? replaceHTML(route.aircraft) : "None"}
                            </option>
                        )
                    })}
                </select>
            </PRDSelect>
        )
    }
}

export default PRD


const PRDSelect = styled.div`
    margin: 0.1rem 0.2rem;

    .preferred {
        background: rgba(200,255,200,1);
    }

    select {
        font-family: 'Inconsolata', monospace;
        font-size: 1.2em;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        font-weight: bold;
        height: 4vh;
        width: 100%;
        text-align: center;
        background: white;
    }
`


const PRDNone = styled.div`
    margin: 0 0.2rem;
    padding: 0;

    h2 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.3rem 0;
        font-family: 'Inconsolata', monospace;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1.2em;
        height: 4vh;
        width: 100%;
        text-align: center;
        background: white;
    }
`
