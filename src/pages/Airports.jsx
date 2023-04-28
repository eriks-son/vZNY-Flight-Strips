import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LGAairspace } from '../components/airports/KLGA';

function Airports() {
    const AIRPORTS = require('../components/airports.json');

    const [airports, setAirports] = useState(new Map());
    const [airspace_lga, setAirspace_lga] = useState("");

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        for (const MAJOR of AIRPORTS) {
            if (document.getElementById(MAJOR.icao + "_tracked").checked) {
                localStorage.setItem(MAJOR.icao, document.getElementById(MAJOR.icao + "_config").value);
                if (MAJOR.icao === "KLGA") {
                    localStorage.setItem("KLGA_airspace", document.getElementById("KLGA_airspace").value)
                }
            }
            else localStorage.removeItem(MAJOR.icao);
            for (const MINOR of MAJOR.minors) {
                if (document.getElementById(MINOR.icao + "_tracked").checked) {
                    localStorage.setItem(MINOR.icao, document.getElementById(MINOR.icao + "_config").value)
                } else localStorage.removeItem(MINOR.icao);
            }
        }
        navigate('/');
    }
    
    useEffect(() => {
        getAirports();
    }, [])

    const setTracked = (icao) => {
        if (airports.has(icao)) {
            document.getElementById(icao + "_tracked").checked = true;
            document.getElementById(icao + "_config").value = airports.get(icao);
        }
    }

    const getAirports = async () => {
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
        var airspace = localStorage.getItem("KLGA_airspace");
        setAirspace_lga(airspace);
        setAirports(airportMap);
    }

    const minorsButtonHandler = (e) => {
        const major = e.target.id.substring(0, 4);
        const isChecked = document.getElementById(e.target.id).checked;
        for (const MAJOR of AIRPORTS) {
            if (MAJOR.icao === major) {
                for (const MINOR of MAJOR.minors) {
                    document.getElementById(MINOR.icao + "_tracked").checked = isChecked;
                }
            }
        }
    }

    return (
      <FormStyle className="airportsForm" onSubmit={submitHandler}>
        <h1>Airports:</h1>
        <ul className='majorList'>
        {AIRPORTS.map((major) => {
            return (
                    <li>
                        <input type="checkbox" key={major.icao + "_tracked"} id={major.icao + "_tracked"} {...setTracked(major.icao)}/>
                        <h3>{major.icao}</h3>
                        <select id={major.icao + "_config"}>
                            {major.configs.map((config) => {
                                return <option id={major + config} value={config}>{config}</option>;
                            })}
                        </select>
                        {major.icao === "KLGA" ? LGAairspace(airspace_lga, setAirspace_lga) : NaN}
                    </li>
            )
        })}
        {AIRPORTS.map((major) => {
            return (
                <div className={major + "_minors"}>
                    <li>
                        <input type="checkbox" onClick={minorsButtonHandler} key={major.icao + "_minors_tracked"} id={major.icao + "minors_tracked"}/>
                        <h3>{major.icao} Minors:</h3>
                    </li>
                    {major.minors.map((minor) => {
                        return (
                            <li>
                                <input type="checkbox" key={minor.icao + "_tracked"} id={minor.icao + "_tracked"} {...setTracked(minor.icao)}/>
                                <h3>{minor.icao}</h3>
                                <select id={minor.icao + "_config"}>
                                {minor.configs.map((config) => {
                                    return <option id={minor + config} value={config}>{config}</option>;
                                })}
                                </select>
                            </li>
                        )
                    })}
                </div>
            )
        })}
        </ul>
        <div className='submit'><input type="submit"></input></div>
      </FormStyle>
    )
}

const FormStyle = styled.form`
    h1 {
        text-align:center;
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;
    }
    .majorList {
        align-items: center;
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0;
        padding: 0;
    }
    .majorList li {
        justify-content: space-around;
        margins: 1rem;
        align-items: center;
        display: flex;
        width: 4rem;
    }
    .majorList h3 {
        padding: 2rem;
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
        color: white;
        font-size: 2rem;
    }

    .majorList input {
        -webkit-appearance: none;
        background-color: none;
        border: 1px solid #333;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
        padding: 9px;
        border-radius: 3px;
        -ms-transform: scale(2); /* IE */
        -moz-transform: scale(2); /* FF */
        -webkit-transform: scale(2); /* Safari and Chrome */
        -o-transform: scale(2); /* Opera */
        transform: scale(2);
        padding: 10px;
    }

    .majorList input:checked {
        background-color: white;
        border: 1px solid #333;
        color: #99a1a7;
    }

    .majorList select {
        height: 2rem;
        text-align: center;
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;
        background-color: #333;
        color: white;
    }

    .majorList option {
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;
        color: white;
    }

    .KLGA_airspace select {
        height: 2rem;
        text-align: center;
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;
        background-color: #333;
        color: white;
    }

    .KLGA_airspace option {
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;
        color: white;
    }
    
    .submit {
        justify-content: space-around;
        display: flex;
        text-align: center;
        height: 2rem;
        padding: 1rem;
    }

    .submit input{
        background: none;
        border-color: white;
        color: white;
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;

    }
`

export default Airports
