import React from 'react'
import Strips from '../components/Strips'
import styled from 'styled-components'

function Home() {
  return (
    <div>
        <Bay>
            <Strips />
        </Bay>
    </div>
  )
}

const Bay = styled.div`
    margin: 0 0;
`

export default Home
