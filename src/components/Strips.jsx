import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import blankStrip from './FlightStripBlank.png';
import { FcCheckmark, FcCancel } from "react-icons/fc"; 
import Clearance from './Clearance';


function Strips() {
    const AIRPORTS = require('../components/airports.json');

    const [strips, setStrips] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [airports, setAirports] = useState(new Map());
    const [clearance, setClearance] = useState("");
    const [search, setSearch] = useState("");

    const crossHandle = (strip) => {
        const deletedNew = [...deleted, strip.cid];
        setDeleted(deletedNew);
        localStorage.setItem('deleted', JSON.stringify(deletedNew));
        getStrips();
    };

    useEffect(() => {
        getStrips();
    }, [search]);

    useEffect(() => {
        getStrips();
    }, [deleted]);

    useEffect(() => {
        getStrips();
    }, [airports]);

    useEffect(() => {
        getAirports();
        getDeleted();
        getStrips();
    }, []);

    const getDeleted = () => {
        let deletedData = localStorage.getItem('deleted');
        if (deletedData === '' || deletedData === null) {
            deletedData = [];
            localStorage.setItem('deleted', JSON.stringify(deletedData));
        }
        else deletedData = JSON.parse(deletedData);
        setDeleted(deletedData);
    }

    const getAirports = () => {
        let airportMap = new Map();
        var airportConfig; 
        for (const MAJOR of AIRPORTS) {
            airportConfig = localStorage.getItem(MAJOR.icao);
            if (airportConfig != null) airportMap.set(MAJOR.icao, airportConfig);
        }
        setAirports(airportMap);
    }

    const getStrips = async () => {
        console.log(airports);
        const api = await fetch('https://data.vatsim.net/v3/vatsim-data.json');
        const data = await api.json();
        const stripsData = data.pilots.filter(function (flight) {
            return flight.flight_plan 
            && airports.has(flight.flight_plan.departure)
            && flight.altitude < 50
            && !deleted.includes(flight.cid)
            && flight.callsign.includes(search)
            && flight.flight_plan.flight_rules === "I";
        });
        setStrips(stripsData);
    };

    const handleReset = () => {
        localStorage.setItem('deleted', JSON.stringify([]));
        setDeleted([]);
    }

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value.toUpperCase());
    }

    return (
        <div>
            <Wrapper>
                <div className="search">
                <input key="search" value={search} type="text" placeholder='Enter Partial Callsign' onChange={handleSearchChange}/>
                </div>
                {strips.sort((f1, f2) => (f1.callsign > f2.callsign) ? 1 : (f1.callsign < f2.callsign) ? -1 : 0).map((strip) => {
                    return (
                        <div key={strip.cid}>
                        <Strip key={strip.cid}>
                            <img src={blankStrip} alt={strip.callsign}></img>
                            <div className="callsign"><p>{strip.callsign}</p></div>
                            <div className="type"><p>{strip.flight_plan.aircraft_faa}</p></div>
                            <div className="cid"><p>{strip.cid}</p></div>
                            <div className="squawk"><p>{strip.flight_plan.assigned_transponder}</p></div>
                            <div className="ETD"><p>P{strip.flight_plan.deptime}</p></div>
                            <div className="cruise"><p>{strip.flight_plan.altitude}</p></div>
                            <div className="departure"><p>{strip.flight_plan.departure}</p></div>
                            <div className="arrival"><p>{strip.flight_plan.arrival}</p></div>
                            <div className="route">
                                <p>
                                    {strip.flight_plan.route.slice(0, 120) + ((120 < strip.flight_plan.route.length) ? "..." : "")}
                                </p>
                            </div>
                            <div className="checkmark"><button onClick={() => setClearance(strip.callsign)}><FcCheckmark /></button></div>
                            <div className="cross"><button onClick={() => crossHandle(strip)}><FcCancel /></button></div>
                        </Strip>
                        <Clearance strip={strip} clearance={clearance} onClearanceChange={setClearance}
                         onDeletedChange={crossHandle} config={airports.get(strip.flight_plan.departure)}/>
                        </div>
                        )
                })}
                <div className='reset'>
                    <button onClick={handleReset}>Reset</button>
                </div>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    margin: 0rem 5rem;
    background: url("../pages/Empty Strip Bay.png") repeat-y;

    .search {
        padding: 1rem;
        margin: 1.5rem;
        display: flex;
        justify-content: space-around;
    }

    .search input { 
        width: 50%;
        height: 10vh;
        text-align: center;
        font-family: 'Inconsolata', monospace;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        background: #333;
        color: white;
        font-weight: bold;
        font-size: 2vw;
    }

    .reset {
        padding: 1rem;
        display: flex;
        justify-content: space-around;
        width: rem;
        height: 4rem;
    }

    .reset button {
        text-align: center;
        font-family: 'Inconsolata', monospace;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        background: #333;
        color: white;
        font-weight: bold;
        font-size: 3vw;
        width: 12%;
    }

    button:hover {
        cursor: pointer;
    }
`;

const Strip = styled.div`
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
        color: black;
        font-size: 3vw;
        top: -17%;
        left: 1%;
    }

    .type {
        position: absolute;
        text-align: center;
        z-index: 10;
        color: black;
        display: flex;
        font-size: 3vw;
        top: 16%;
        left: 1%;
    }

    .cid {
        position: absolute;
        text-align: center;
        z-index: 10;
        color: black;
        display: flex;
        font-size: 3vw;
        top: 49%;
        left: 1%;
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
        top: 49%;
        left: 20.5%;
    }

    .departure {
        position: absolute;
        text-align: center;
        z-index: 10;
        color: black;
        display: flex;
        font-size: 3vw;
        top: -17%;
        left: 31%;
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
`;

export default Strips