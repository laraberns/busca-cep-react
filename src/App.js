import './App.css';
import { useState } from 'react';

function App() {

  const [endereco, setEndereco] = useState({})

  function manipularEndereco(evento) {

    const cep = evento.target.value

    setEndereco({
      cep
    })
  }

  function atualizaDados(evento) {
    evento.preventDefault()

    if (endereco.cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${endereco.cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
          setEndereco({
            cep: dados.cep,
            rua: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf,
            ddd: dados.ddd
          })
        })
    } else {
      alert("CEP inválido. Tente novamente! Digite sem caracteres especiais, por favor")
    }
  }


  return (
    <div className="App">
      <h2>Busca CEP</h2>
      <input placeholder='Digite o CEP - 8 dígitos' onChange={manipularEndereco}></input>
      <ul className='Lista'>
        <li>
          CEP: <span>{endereco.cep} </span>
        </li>
        <li>
          Bairro: <span>{endereco.bairro}</span>
        </li>
        <li>
          Cidade: <span>{endereco.cidade}</span>
        </li>
        <li>
          Estado: <span>{endereco.estado}</span>
        </li>
        <li>
          DDD:<span>{endereco.ddd} </span>
        </li>
      </ul>
      <button
        onClick={(evento) => atualizaDados(evento)}
        className='botao'
      >
        Buscar
      </button>
    </div>
  );
}

export default App;
