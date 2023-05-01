import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {airportData} from "../airportData";

type LGAAirspace = "none" | "coney" | "belmont" | "both";

function LGAAirspaceSelect(airspace: LGAAirspace, setAirspace: (airspace: LGAAirspace) => void) {
    return (
      <select value={airspace} onChange={(e) => {setAirspace(e.target.value as LGAAirspace)}}>
          <option id="none" value="none">None</option>
          <option id="coney" value="coney">Coney</option>
          <option id="belmont" value="belmont">Belmont</option>
          <option id="both" value="both">Both</option>
      </select>
    );
}

function Airports() {
    const [lgaAirspace, setLgaAirspace] = useState<LGAAirspace>("none");
    const [trackedAirports, setTrackedAirports] = useState<string[]>([]);

    const navigate = useNavigate();

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("trackedAirports", JSON.stringify(trackedAirports));
        navigate('/');
    }

    useEffect(() => {
        const _trackedAirports = JSON.parse(localStorage.getItem("trackedAirports") ?? "[]");
        const airspace = localStorage.getItem("KLGA_airspace") ?? "";
        if (Array.isArray(_trackedAirports)) {
            setTrackedAirports(_trackedAirports);
        } else {
            setTrackedAirports([]);
            localStorage.removeItem("trackedAirports");
        }
        if (airspace === "none" || airspace === "belmont" || airspace === "coney" || airspace === "both") {
            setLgaAirspace(airspace);
        } else {
            setLgaAirspace("none");
            localStorage.removeItem("KLGA_airspace");
        }
    }, []);

    const airportChangeHandler = (e: React.ChangeEvent, icao: string) => {
        setTrackedAirports((prev) => prev.includes(icao) ? prev.filter((airport) => airport !== icao) : [...prev, icao]);
    }

    return (
      <StyledForm className="airportsForm" onSubmit={submitHandler}>
          <h1>Airports:</h1>
          <ul className='majorList'>
              {airportData.map((major) => {
                  return (
                    <li key={major.icao}>
                        <input type="checkbox" id={major.icao + "_tracked"} onChange={(e) => airportChangeHandler(e,  major.icao)} checked={trackedAirports.includes(major.icao)}/>
                        <h3>{major.icao}</h3>
                        <select id={major.icao + "_config"}>
                            {major.configs.map((config) => {
                                return <option key={config} id={major + config} value={config}>{config}</option>;
                            })}
                        </select>
                        {major.icao === "KLGA" ? LGAAirspaceSelect(lgaAirspace, setLgaAirspace) : null}
                    </li>
                  )
              })}
              {airportData.map((major) => {
                  return (
                    <div className={major + "_minors"}>
                        <li>
                            <input type="checkbox" key={major.icao} id={major.icao + "minors_tracked"}/>
                            <h3>{major.icao} Minors:</h3>
                        </li>
                        {major.minors.map((minor) => {
                            return (
                              <li>
                                  <input type="checkbox" key={minor.icao} id={minor.icao + "_tracked"} onChange={(e) => airportChangeHandler(e,  minor.icao)} checked={trackedAirports.includes(minor.icao)}/>
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
      </StyledForm>
    )
}

const StyledForm = styled.form`
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
        margin: 1rem;
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
        border: 1px solid #333;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
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
