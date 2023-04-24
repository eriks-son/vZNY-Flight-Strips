import React, { useEffect, useState } from 'react';
import { IoIosRadio } from 'react-icons/io'
import styled from 'styled-components';

function Freq() {
    const [freq, setFreq] = useState("");
    const [hidden, setHidden] = useState("");
    
    useEffect(() => {
        getFreq();
    }, []);

    useEffect(() => {
        getFreq();
    }, [hidden]);

    const submitHandler = (e) => {
        if (e instanceof Object) e.preventDefault();
        localStorage.setItem('freq', freq);
        setHidden("freq");
    };

    const getFreq = async () => {
        let frequency = localStorage.getItem('freq');
        if (frequency === null) {
            frequency = "125.325";
            localStorage.setItem('freq', frequency);
        }
        setFreq(frequency);
    };

    const clickHandler = () => {
        if (hidden === "") {
            submitHandler(NaN);
        } else {
            setHidden("");
        }
    }

  return (
    <div>
        <Button onClick={clickHandler}>Frequency</Button>
      <FormStyle className={hidden === "freq" ? 'hidden' : ''} onSubmit={submitHandler}>
        <div className={hidden === "freq" ? 'hidden' : ''}>
            <IoIosRadio></IoIosRadio>
            <input value={freq} onChange={(e) => setFreq(e.target.value)} type="text"/>
        </div>
      </FormStyle>
    </div>
  )
}

const FormStyle = styled.form`
    letter-spacing: 0.1rem;
    font-family: 'Inconsolata', monospace;
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    
    .hidden {
        display: none;
        justify-content: space-around;
        align-items: center;
    }

    div {
        position: relative;
        color: white;
    }

    input {
        position: absolute;
        letter-spacing: 0.1rem;
        font-family: 'Inconsolata', monospace;
        text-transform: uppercase;
        font-weight: bold;
        border: none;
        background: #333;
        font-size: 3vw;
        color: white;
        border: none;
        border-radius 1rem;
        outline: none;
        width: 15vw;
    }
`

const Button = styled.button`
    font-family: 'Inconsolata', monospace;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    display: flex;
    background: #333;
    color: white;
    font-weight: bold;
    font-size: 3vw;
    border: none;

    :hover {
        cursor: pointer;
      }
`

export default Freq
