import { useState, useEffect } from 'react'
import './App.css'

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
      <section>
        {calcList.map((calculadora) => (
          <article key={'calculadora'+calculadora.id}>
            <h2>{calculadora.attributes.nome} <button>&#9432;</button></h2>
            <img src={localUrl + calculadora.attributes.imagem.data.attributes.url} title={calculadora.attributes.imagem.data.attributes.alternativeText} alt={calculadora.attributes.imagem.data.attributes.alternativeText} />
            <p>{calculadora.attributes.descricao}</p>
            <a href="#">Acessar a calculadora</a>
          </article>
        ))}
      </section>
    </div>
  )
}

export default App
