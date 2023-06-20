import { useState, useEffect } from "react";
import "./App.css";
import CalculadoraArticle from "./components/CalculadoraArticle";
import styled from "styled-components";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function App() {
  const [calcList, setCalcList] = useState([]);
  const [calcSelected, setCalc] = useState(null);
  const [iFrameLoaded, setStatus] = useState(false);
  const localUrl = "https://api-accalc.glitch.me/";

  useEffect(() => {
    mustApprove()
      .then(async () => {
        await loadList();
      })
      .catch(() => {
        // User rejected, show a fallback UI or redirect to another page
        console.log("User rejected");
      });
  }, []);

  async function loadList() {
    await fetch(
      localUrl +
        "api?id=1v51SITbRLPjj7pt0UM0v5v0f0YUPFHQXUIR9duSwwn0&sheet=Calculadoras"
    )
      .then((response) => response.json())
      .then((resp) => {
        setCalcList(resp.rows);
      });
  }

  function chooseCalc(calc) {
    setStatus(false);
    setCalc(calc);
  }

  function backHome() {
    setCalc(null);
  }

  function alertInfo() {
    Swal.fire({
      title: "Sobre a utilização",
      text: "Essa planilha foi criada por Francisco Martins Nunes na Universidade Federal de Minas Gerais. 2021-2023. Material destinado exclusivamente para uso educacional.",
    });
  }

  async function mustApprove() {
    const { value: accept } = await Swal.fire({
      title: "Termos de uso",
      input: "checkbox",
      text: "Essa planilha foi criada por Francisco Martins Nunes na Universidade Federal de Minas Gerais. 2021-2023. Material destinado exclusivamente para uso educacional.",
      inputValue: 0,
      inputPlaceholder: "Concordo em utilizar apenas para fins acadêmicos.",
      confirmButtonText: 'Continuar <i class="fa fa-arrow-right"></i>',
      showCancelButton: false,
      showCloseButton: false,
      showDenyButton: false,
      allowOutsideClick: false,
      inputValidator: (result) => {
        return (
          !result && "Você precisa aceitar os termos de uso para continuar"
        );
      },
    });

    if (accept) {
      Toast.fire({
        icon: "success",
        title: "Agradecemos a compreensão!",
      });
    } else {
      throw new Error("ops");
    }
  }

  return (
    <div className="App">
      <HeaderHome className={calcSelected ? "hide" : null}>
        <h1>
          Calculadoras Acústicas
          <InfoBtn onClick={() => alertInfo()}>
            <i className="fa-solid fa-circle-question"></i>
          </InfoBtn>
        </h1>
      </HeaderHome>
      <Container className={calcSelected ? "top-menu" : null}>
        <BackHome
          className={calcSelected == null ? "hide" : null}
          onClick={() => backHome()}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </BackHome>
        {calcList.length > 0 ? (
          calcList.map((calculadora, i) => (
            <CalcsOptions
              onClick={() => chooseCalc(calculadora)}
              key={"calculadora-" + i}
            >
              <CalculadoraArticle
                atributos={calculadora}
                current={calcSelected}
              />
            </CalcsOptions>
          ))
        ) : (
          <AbsoluteCenter className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </AbsoluteCenter>
        )}
      </Container>
      <FrameContainer className={calcSelected ? "active" : null}>
        {!iFrameLoaded && calcSelected ? (
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : null}
        {!calcSelected ? null : (
          <iframe
            width="100%"
            style={!iFrameLoaded ? { opacity: 0 } : null}
            onLoad={() => setStatus(true)}
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={calcSelected.url}
          ></iframe>
        )}
      </FrameContainer>
    </div>
  );
}

export default App;

const HeaderHome = styled.header`
  &.hide {
    display: none;
  }

  & > h1 {
    font-size: 2rem;
    text-align: center;
    margin-top: 1rem;
  }
`;

const BackHome = styled.button`
  position: sticky;
  left: 0;
  background: linear-gradient(to right, #f1f1f1, rgba(241, 241, 241, 0));
  border: none;
  outline: none;
  height: 100%;
  cursor: pointer;
  font-size: 2rem;
  padding: 0 1rem;

  &.hide {
    display: none;
  }
`;

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: auto;

  &.top-menu {
    position: relative;
    flex-wrap: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
    height: 20vh;
  }
`;

const CalcsOptions = styled.article`
  flex: 50%;
  padding: 1rem;
  min-width: 240px;
`;

const FrameContainer = styled.section`
  width: 100vw;
  height: 0;
  transition: 0.5s;

  &.active {
    height: 80vh;
    transition: 1s;
  }
`;

const AbsoluteCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const InfoBtn = styled.button`
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--blue);
  border: unset;
  outline: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
`;

const LoadingArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--lighter-blue);
`;
