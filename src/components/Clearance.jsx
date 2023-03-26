import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import blankStrip from './ClearanceStripBlank.png';
import { FcCheckmark, FcUndo } from "react-icons/fc"; 
import logoImage from './ZNY-transparent-black-1000x1000px.png';
import { FaRoute } from "react-icons/fa";
import * as KJFK from "./airports/KJFK.js";
import * as types from "./airports/types";

function Clearance({strip, clearance, onClearanceChange, deleted, onDeletedChange, config}) {
    console.log(strip);
    const airport = require('./airports/' + strip.flight_plan.departure + ".js");

    const handleClearanceFinal = useCallback(event => {
        onClearanceChange("");
        onDeletedChange(strip);
    })

    const handleCancel = useCallback(event => {
        onClearanceChange("");
    })

    const handleDpChange = () => {
        setDp(document.getElementById("dp-select").value);
    }

    const handleTypeChange = () => {
        setType(document.getElementById("type-select").value);
    }
    const [alt, setAlt] = useState("");

    const [dp, setDp] = useState("");

    const [type, setType] = useState("");

    const [pdc1, setPdc1] = useState("");

    const [pdc2, setPdc2] = useState("");

    const getDp = () => {
        setDp(airport.getDP(strip, config, type));
    }

    const getPdc1 = () => {
        setPdc1(airport.getPDC1(strip, config, dp, type) + " " + localStorage.getItem('freq'));
    }

    const getPdc2 = () => {
        setPdc2(airport.getPDC2(config, pdc1));
    }

    const getType = () => {
        if (types.PROPS.includes(strip.flight_plan.aircraft_short)) setType("prop");
        else if (types.TURBOPROPS.includes(strip.flight_plan.aircraft_short)) setType("turboprop");
        else setType("jet");
    }

    const getAlt = () => {
        setAlt(strip.flight_plan.altitude);
    }

    const cleanRoute = () => {
        let cleaned = strip.flight_plan.route.replace("+", "");
        for (const dp of airport.DPs) cleaned = cleaned.replace(dp, "");
        return cleaned.slice(0, 130) + ((130 < strip.flight_plan.route.length) ? "..." : "");
    }

    useEffect(() => {
        getType();
        getDp();
        getAlt();
        getPdc1();
        getPdc2();
    }, []);

    useEffect(() => {
        getDp();
        getPdc1();
        getPdc2();
    }, [type]);

    useEffect(() => {
        getPdc1();
        getPdc2();
    }, [dp]);

    useEffect(() => {
        getPdc2();
    }, [pdc1]);
    
    if (strip.callsign === clearance) {
  return (
    <div>
        <NewStrip key={strip.cid}>
            <img src={blankStrip} alt={strip.callsign}></img>
            <div className="callsign"><p>CLEARANCE:</p></div>
            <div className="type-label"><p>TYPE:</p></div>
            <div className="type">
                <select id="type-select" value={type} onChange={handleTypeChange}>
                    <option value="jet">JET</option>
                    <option value="turboprop">TURBOPROP</option>
                    <option value="prop">PROP</option>
                </select>
            </div>
            <div className="squawk"><p>{strip.flight_plan.assigned_transponder}</p></div>
            <div className="cruise"><input value={alt} onChange={(e) => setAlt(e.target.value)} type="text"></input></div>
            <div className="dp-label"><p>DP:</p></div>
            <div className="dp">
                <select id="dp-select" value={dp} onChange={handleDpChange}>
                    {KJFK.DPs.map((departureProcedure) => {
                        return <option id={departureProcedure} value={departureProcedure}>{departureProcedure}</option>
                    })}
                </select>
            </div>
            <div className="route">
                <p>
                    {dp + " " + cleanRoute()}
                </p>
            </div>
            <div className="pdc1">
                <button onClick={() => {navigator.clipboard.writeText(pdc1)}}>
                    {pdc1}
                </button>
            </div>
            <div className="pdc2">
                <button onClick={() => {navigator.clipboard.writeText(pdc2)}}>
                    {pdc2}
                </button>
            </div>
            <div className="prd"><button onClick={() => window.open("http://nyartcc.org/prd?from=" + strip.flight_plan.departure + "&to=" + strip.flight_plan.arrival, "_blank")}>
                <FaRoute />
            </button></div>
            <div className="sop"><button onClick={() => window.open("https://wiki.nyartcc.org/index.php?title=" + strip.flight_plan.departure.substring(1, 4) + "_SOP", "_blank")}>
                <img className="logo" src={logoImage} alt="NYARTCC Logo"></img>
            </button></div>
            <div className="checkmark"><button onClick={handleClearanceFinal}><FcCheckmark /></button></div>
            <div className="cross"><button onClick={handleCancel}><FcUndo /></button></div>
        </NewStrip>
    </div>
  )
  }
}

const NewStrip = styled.div`
    overflow-wrap: break-word;
    font-family: 'Inconsolata', monospace;
    font-weight: 900;
    position: relative;
    width: 100%;
    height: auto;

    img {
        z-index: 3;
        display: block;
        margin-left: auto;
        margin-right: auto;
        height: 100%;
        width: 100%;
        left: 0;
        object-fit: cover;
        align-items: center;
    }

    .callsign {
        position: absolute;
        text-align: center;
        z-index: 10;
        color: red;
        font-size: 3vw;
        top: -17%;
        left: 1%;
    }

    .type-label {
        position: absolute;
        text-align: center;
        z-index: 10;
        color: black;
        display: flex;
        font-size: 3vw;
        top: 16%;
        left: 1%;
    }

    .type select {
        position: absolute;
        text-align: center;
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;
        background: none;
        border: none;
        z-index: 10;
        color: red;
        font-size: 2vw;
        width: 15vw;
        top: 70%;
        left: 1%;
    }

    .majorList option {
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 2vw;
        color: red;
    }

    .squawk {
        position: absolute;
        text-align: center;
        z-index: 10;
        color: black;
        display: flex;
        font-size: 3vw;
        top: -17%;
        left: 21%;
    }

    .ETD {
        position: absolute;
        text-align: center;
        z-index: 10;
        color: black;
        display: flex;
        font-size: 3vw;
        top: 16%;
        left: 20.2%;
    }

    .cruise {
        position: absolute;
        text-align: center;
        z-index: 10;
        color: black;
        display: flex;
        font-size: 3vw;
        top: 70%;
        left: 19.4%;
    }

    .cruise input {
        position: absolute;
        text-align: center;
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;
        border: none;
        background: none;
        font-size: 3vw;
        border: none;
        border-radius 1rem;
        outline: none;
        width: 8vw;
    }

    .dp-label {
        position: absolute;
        text-align: center;
        z-index: 10;
        color: black;
        display: flex;
        font-size: 3vw;
        top: -17%;
        left: 33%;
    }

    .dp select {
        position: absolute;
        text-align: center;
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;
        background: none;
        border: none;
        z-index: 10;
        color: red;
        font-size: 2vw;
        width: 9vw;
        height: 9vh;
        top: 35%;
        left: 30.3%;
        overflow-wrap: break;
        font-size: 2vw;
    }

    .arrival {
        position: absolute;
        text-align: center;
        z-index: 10;
        color: black;
        display: flex;
        font-size: 3vw;
        top: 49%;
        left: 31%;
    }

    .route {
        inline-size: 38%;
        overflow-wrap: break-word;
        position: absolute;
        z-index: 10;
        color: black;
        display: flex;
        top: -7.5%;
        left: 42%;
    }

    .route p {
        font-size: 2vw;
    }
    
    .checkmark {
        position: absolute;
        top: 68%;
        left: 88%;
    }

    .checkmark button {
        font-size: 4vw;
        border: none;
        background: none;
        opacity: 50%;
    }

    .checkmark button:hover {
        opacity: 100%;
        cursor: pointer;
    }
    
    .cross {
        position: absolute;
        top: 69%;
        left: 94.5%;
    }

    .cross button {
        font-size: 4vw;
        border: none;
        background: none;
        opacity: 50%;
    }

    .cross button:hover {
        opacity: 100%;
        cursor: pointer;
    }
    
    .sop {
        position: absolute;
        top: 68%;
        left: 81.7%;
        width: 4.5vw;
    }

    .sop button {
        font-size: 4vw;
        border: none;
        background: none;
        opacity: 50%;
    }

    .sop button:hover {
        opacity: 100%;
        cursor: pointer;
    }
    
    .prd {
        z-index: 12;
        position: absolute;
        top: 69%;
        left: 76%;
    }

    .prd button {
        z-index: 12;
        font-size: 3vw;
        border: none;
        background: none;
        opacity: 50%;
    }

    .prd button:hover {
        opacity: 100%;
        cursor: pointer;
    }

    .pdc1 {
        z-index: 12;
        position: absolute;
        top: 12%;
        left: 81%;
    }

    .pdc1 button {
        background: none;
        border: none;
        opacity: 50%;
        font-family: 'Inconsolata', monospace;
        font-weight: 900;
        font-size: 1.2vw;
    }

    .pdc1 button:hover {
        opacity: 100%;
        cursor: pointer;
    }

    .pdc2 {
        z-index: 12;
        position: absolute;
        top: 46%;
        left: 81%;
    }

    .pdc2 button {
        background: none;
        border: none;
        opacity: 50%;
        font-family: 'Inconsolata', monospace;
        font-weight: 900;
        font-size: 1.2vw;
    }

    .pdc2 button:hover {
        opacity: 100%;
        cursor: pointer;
    }
`;

export default Clearance
