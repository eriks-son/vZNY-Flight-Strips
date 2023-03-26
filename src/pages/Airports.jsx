import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LGAairspace } from '../components/airports/KLGA';

function Airports() {
    const AIRPORTS = require('../components/airports.json');

    const [airports, setAirports] = useState(new Map());

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        for (const MAJOR of AIRPORTS) {
            if (document.getElementById(MAJOR.icao + "_tracked").checked) {
                localStorage.setItem(MAJOR.icao, document.getElementById(MAJOR.icao + "_config").value);
                if (MAJOR.icao === "KLGA") {
                    console.log(document.getElementById("KLGA_airspace").value)
                    localStorage.setItem("KLGA_airpsace", document.getElementById("KLGA_airspace").value)
                }
            }
            else localStorage.removeItem(MAJOR.icao);
        }
        //alert("Saved!");
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
        }
        setAirports(airportMap);
    }

    return (
      <FormStyle className="airportsForm" onSubmit={submitHandler}>
        <h1>Airports:</h1>
        {AIRPORTS.map((major) => {
            return (
                <ul className='majorList' id={major.icao + "_list"}>
                    <li>
                        <input type="checkbox" key={major.icao + "_tracked"} id={major.icao + "_tracked"} {...setTracked(major.icao)}/>
                        <h3>{major.icao} Config:</h3>
                        <select id={major.icao + "_config"}>
                            {major.configs.map((config) => {
                                return <option id={major + config} value={config}>{config}</option>;
                            })}
                        </select>
                        {LGAairspace(major.icao)}
                    </li>
                </ul>
            )
        })}
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
        justify-content: space-around;
        align-items: center;
        display: flex;
        width: 100%;
        margin: 0;
        padding: 0;
    }
    .majorList li {
        margins: 1rem;
        align-items: center;
        display: flex;
    }
    .majorList h3 {
        padding: 1rem;
        display: flex;
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;
        color: white;
    }

    .majorList input {
        -webkit-appearance: none;
        background-color: none;
        border: 1px solid #333;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
        padding: 9px;
        border-radius: 3px;
        display: inline-block;
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
