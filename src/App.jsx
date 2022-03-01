import { useState, useEffect } from 'react'
import './App.css'
import CalculadoraArticle from './components/CalculadoraArticle'
import styled from 'styled-components'

function App() {
  const [calcList, setCalcList] = useState([])
  const [calcSelected, setCalc] = useState(null)
  const [iFrameLoaded, setStatus] = useState(false)
  const localUrl = 'https://calculadoras-acusticas.herokuapp.com'

  useEffect(() => {
    fetch(localUrl + '/api/calculadoras?populate=*')
        .then(response => response.json())
        .then(resp => setCalcList(resp.data));
  }, []);

  function chooseCalc(calc) {
    setStatus(false);
    setCalc(calc);
  }

  function backHome(){
    setCalc(null);
  }

  return (
    <div className="App">
      <HeaderHome className={calcSelected ? 'hide' : null}>
        <h1>Calculadoras Acústicas <InfoBtn><i className="fa-solid fa-circle-question"></i></InfoBtn></h1>
      </HeaderHome>
      <Container className={calcSelected ? 'top-menu' : null}>
        <BackHome className={calcSelected == null ? 'hide' : null} onClick={() => backHome()}><i class="fa-solid fa-chevron-left"></i></BackHome>
        {calcList.map((calculadora) => (
          <CalcsOptions onClick={() => chooseCalc(calculadora.attributes)} key={'calculadora'+calculadora.id}>
            <CalculadoraArticle atributos={calculadora.attributes} url={localUrl} current={calcSelected} />
          </CalcsOptions>
        ))}
      </Container>
      <FrameContainer className={calcSelected ? 'active' : null}>
        {
          !iFrameLoaded && calcSelected ? <div>Carregando</div> : null
        }
        {
          !calcSelected ? null : 
          <iframe width="100%" style={!iFrameLoaded ? {opacity: 0} : null} onLoad={() => setStatus(true)} height="100%" frameBorder="0" scrolling="no" src={calcSelected.url}></iframe>
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

  & > h1 {
    font-size: 2rem;
    text-align: center;
    margin-top: 1rem;
  }
`

const BackHome = styled.button`
    position: sticky;
    left: 0;
    background: linear-gradient(to right, #f1f1f1,rgba(241,241,241,0));
    border: none;
    outline: none;
    height: 100%;
    cursor: pointer;
    font-size: 2rem;
    padding: 0 1rem;

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
    position: relative;
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

const InfoBtn = styled.button`
    cursor: pointer;
    font-size: 1.25rem;
    color: var(--blue);
    border: unset;
    outline: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`
