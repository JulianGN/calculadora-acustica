import { useState, useEffect } from 'react'
import './App.css'
import CalculadoraArticle from './components/CalculadoraArticle'
import styled from 'styled-components'

function App() {
  const [calcList, setCalcList] = useState([])
  const [calcSelected, setCalc] = useState(null)
  const localUrl = 'http://localhost:1337'

  useEffect(() => {
    fetch(localUrl + '/api/calculadoras?populate=*')
        .then(response => response.json())
        .then(resp => setCalcList(resp.data));
  }, []);

  function chooseCalc(calc) {
    setCalc(calc);
  }

  return (
    <div className="App">
      <HeaderHome className={calcSelected ? 'hide' : null}>
        <h1>Calculadoras para Acústica</h1>
        <address>- Francisco Martins Nunes</address>
      </HeaderHome>
      <Container className={calcSelected ? 'top-menu' : null}>
        {calcList.map((calculadora) => (
          <CalcsOptions onClick={() => chooseCalc(calculadora.attributes)} key={'calculadora'+calculadora.id}>
            <CalculadoraArticle atributos={calculadora.attributes} url={localUrl} current={calcSelected} />
          </CalcsOptions>
        ))}
      </Container>
      <FrameContainer className={calcSelected ? 'active' : null}>
        {
          !calcSelected ? null : 
          <iframe width="100%" height="100%" frameBorder="0" scrolling="no" src={calcSelected.url}></iframe>
        }
      </FrameContainer>
    </div>
  )
}

export default App

const HeaderHome = styled.header`
  &.hide{
    display: none;
  }
`

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: auto;

  &.top-menu{
    flex-wrap: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
    height: 20vh;
  }
`

const CalcsOptions = styled.article`
  flex: 50%;
  padding: 1rem;
  min-width: 240px;
`

const FrameContainer = styled.section`
  width: 100vw;
  height: 0;
  transition: .5s;

  &.active{
    height: 80vh;
    transition: 1s;
  }
`
