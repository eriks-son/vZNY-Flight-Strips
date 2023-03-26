import React from 'react';
import Home from './Home';
import Airports from './Airports';
import styled from 'styled-components';
import { Link, Route, Routes } from 'react-router-dom';
import logoImage from './ZNY-transparent-16x9.png';
import Freq from '../components/Freq';

function Pages() {

  return (
    <div>
    <Topbar>
        <nav>
          <ul className='nav-links'>
            <li>
              <Link to={"/"}>
                <img className="logo" src={logoImage} alt="NYARTCC Logo"></img>
              </Link>
            </li>
            <li><Freq /></li>
            <li><Link to={"/airports"}>Airports</Link></li>
          </ul>
        </nav>
      </Topbar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/airports" element={<Airports />} />
    </Routes>
    </div>
  )
}

const Topbar = styled.div`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    overflow: wrap;
  }

  nav {
    display: flex;
    font-weight: bold;
    justify-content: space-around;
    align-items: center;
    background-color: #333;
    font-size: 3vw;
    min-height: 8vh;
    letter-spacing: 0.1rem;
    font-family: 'Inconsolata', monospace;
    text-transform: uppercase;
  }

  img {
    color: white;
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
  }

  .nav-links {
    justify-content: space-around;
    align-items: center;
    display: flex;
    width: 100%;
    height: 100%;
  }

  .nav-links li {
    list-style: none;
    width: 15%;
    height: 100%;
    color: white;
  }

  a {
    text-decoration: none;
    color: white;
  }
`


export default Pages
