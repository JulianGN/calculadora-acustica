import { useState, useEffect } from 'react'
import './App.css'
import CalculadoraArticle from './components/CalculadoraArticle'
import styled from 'styled-components'

function App() {
  const [calcList, setCalcList] = useState([])
  const localUrl = 'http://localhost:1337'

  useEffect(() => {
    fetch(localUrl + '/api/calculadoras?populate=*')
        .then(response => response.json())
        .then(resp => setCalcList(resp.data));
  }, []);

  return (
    <div className="App">
      <header className="App-header" onClick={() => console.log(calcList)}>
        <h1>Calculadoras para Acústica</h1>
        <address>- Francisco Martins Nunes</address>
      </header>
      <Container>
        {calcList.map((calculadora) => (
          <CalculadoraArticle atributos={calculadora.attributes} url={localUrl} key={'calculadora'+calculadora.id} />
        ))}
      </Container>
    </div>
  )
}

export default App

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  gap: 2rem;
  max-width: 1400px;
  margin: auto;
`
