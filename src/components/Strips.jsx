import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import blankStrip from './FlightStripBlank.png';
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { MdOutlineClear } from "react-icons/md";
import Clearance from './Clearance';


function Strips() {
    const AIRPORTS = require('../components/airports.json');

    const [time, setTime] = useState(new Date());
    const [strips, setStrips] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [airports, setAirports] = useState(new Map());
    const [clearance, setClearance] = useState("");
    const [search, setSearch] = useState("");

    // Handle deleting a strip
    const crossHandle = (strip) => {
        const deletedNew = [...deleted, strip.cid];
        setDeleted(deletedNew);
        localStorage.setItem('deleted', JSON.stringify(deletedNew));
        getStrips();
    };

    useEffect(() => {
        getStrips();
    }, [time])

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
        // Refresh every 5 seconds
        const interval = setInterval(() => {
            setTime(new Date());
        }, 5000);
        getAirports();
        getDeleted();
        getStrips();

        return () => clearInterval(interval);
    }, []);

    // Grab all deleted aircraft from local storage
    const getDeleted = () => {
        let deletedData = localStorage.getItem('deleted');
        if (deletedData === '' || deletedData === null) {
            deletedData = [];
            localStorage.setItem('deleted', JSON.stringify(deletedData));
        }
        else deletedData = JSON.parse(deletedData);
        setDeleted(deletedData);
    }

    // Get all tracked airports from local storage (plus LGA airspace)
    const getAirports = () => {
        let airportMap = new Map();
        var airportConfig; 
        for (const MAJOR of AIRPORTS) {
            airportConfig = localStorage.getItem(MAJOR.icao);
            if (airportConfig != null) airportMap.set(MAJOR.icao, airportConfig);
            for (const MINOR of MAJOR.minors) {
                airportConfig = localStorage.getItem(MINOR.icao);
                if (airportConfig != null) airportMap.set(MINOR.icao, airportConfig);
            }
        }
        setAirports(airportMap);
    }

    // Return if a strip should be shown
    const stripFilter = (flight) => {
        if (!flight.flight_plan) return false;
        const dep = flight.flight_plan.departure;
        if (!airports.has(dep)) return false;
        if (deleted.includes(flight.cid)) return false;
        if (!flight.callsign.includes(search)) return false;
        if (flight.flight_plan.flight_rules !== "I") return false;
        if (flight.callsign === "N51TP") console.log("YAY");
        for (const MAJOR of AIRPORTS){
            if (MAJOR.icao === dep) return flight.altitude < MAJOR.altitude + 50;
            for (const MINOR of MAJOR.minors) {
                if (MINOR.icao === dep) return flight.altitude < MINOR.altitude + 50;
            }
        }
    }

    // Get all strips from vatsim data and filter
    const getStrips = async () => {
        const api = await fetch('https://data.vatsim.net/v3/vatsim-data.json');
        const data = await api.json();
        const stripsData = data.pilots.filter(stripFilter);
        setStrips(stripsData);
    };

    // Clear deleted
    const handleReset = () => {
        localStorage.setItem('deleted', JSON.stringify([]));
        setDeleted([]);
    }

    // Change callsign search and prevent enter
    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value.toUpperCase());
    }

    if (airports.size) {
        return (
            <div>
                <Wrapper>
                    <div className="search">
                        <input key="search" value={search} type="text" placeholder='Enter Partial Callsign' onChange={handleSearchChange}/>
                        <div className='clearSearch'>
                            <button onClick={() => {setSearch("")}}>
                                <MdOutlineClear />
                            </button>
                        </div>
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
                                <div className="checkmark" title='Start Clearance'>
                                    <button onClick={() => setClearance(strip.callsign)}>
                                        <FcCheckmark />
                                    </button>
                                </div>
                                <div className="cross" title='Remove Strip'>
                                    <button onClick={() => crossHandle(strip)}>
                                        <FcCancel />
                                    </button>
                                </div>
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
    } else {
        return (
            <Wrapper>
                <h2 className='noAirports'>No Airport(s) Selected</h2>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    margin: 0rem 5rem;
    background: url("../pages/Empty Strip Bay.png") repeat-y;

    .noAirports {
        width: 100%;
        text-align: center;
        font-family: 'Inconsolata', monospace;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        color: white;
        font-weight: bold;
        font-size: 2vw;
    }

    .search {
        padding: 1rem;
        margin: 1.5rem; 
        display: flex;
        justify-content: center;
        align-items: center;
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

    .clearSearch {
        transform: translate(0, 10%);
    }

    .clearSearch button {
        font-size: 4vw;
        border: none;
        background: none;
        color: #666;
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
        left: 20%;
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
        top: 66%;
        left: 87.9%;
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
        top: 67%;
        left: 94.1%;
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