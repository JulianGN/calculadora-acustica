import { useState, useEffect } from 'react'
import styled from 'styled-components'

function CalculadoraArticle({atributos, url, current}) {
    const [classes, setClasses] = useState('');

    useEffect(() => {
        if(!current) {
            setClasses('');
            return
        }

        if(current?.createdAt == atributos.createdAt)
            setClasses('top-menu-item active')
        else
            setClasses('top-menu-item')  

    }, [current])

    return (
        <ContainerItem className={classes}>
            <img
                src={atributos.imagem}
                title={atributos.nome}
                alt={atributos.nome} 
            />
            <HeaderTitle>{atributos.nome}</HeaderTitle>
            {/* <p>{atributos.descricao}</p> */}
            {/* <a href="#">Acessar a calculadora</a> */}
        </ContainerItem>
    )
}

export default CalculadoraArticle;

const HeaderTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: 2rem;
`

const ContainerItem = styled.div`
    background-color: var(--white);
    padding: 1rem;
    border-radius: .5rem;
    box-shadow: 0px 4px 10px 0px rgb(0 0 0 / 15%);
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    height: 35vh;

    &.top-menu-item {
        height: 110%;
    }

    & > img {
        width: 120px;
    }

    &.top-menu-item > img {
        width: 30%;
    }

    &.top-menu-item > ${HeaderTitle} {
        font-size: 1rem;
        gap: 0;
    }

    &.top-menu-item > a, &.top-menu-item p {
        display: none;
    }

    &.active {
        background-color: var(--blue);
        color: var(--white);
    }
`