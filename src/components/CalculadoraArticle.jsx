import styled from 'styled-components'

function CalculadoraArticle({atributos, url}) {
    return (
        <article>
            <HeaderTitle>{atributos.nome} <InfoBtn>&#9432;</InfoBtn></HeaderTitle>
            <img src={url + atributos.imagem.data.attributes.url} title={atributos.imagem.data.attributes.alternativeText} alt={atributos.imagem.data.attributes.alternativeText} />
            <p>{atributos.descricao}</p>
            <a href="#">Acessar a calculadora</a>
        </article>
    )
}

export default CalculadoraArticle;

const HeaderTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: 2rem;
`

const InfoBtn = styled.button`
    cursor: pointer;
    font-size: .75rem;
    background-color: black;
    color: white;
    border: unset;
    outline: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
`