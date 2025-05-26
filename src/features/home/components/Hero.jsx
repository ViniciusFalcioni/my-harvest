import React from "react";
import Heading from "../../../components/UI/Heading"; // Certifique-se que este caminho está correto
import "./hero.css";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <Heading title="Conectando Produtores e Recursos" subtitle="Arrende terras, Encontre seu maquinário" />

          {/* Adicionada a classe 'hero-search-form' para escopo */}
          <form className="hero-search-form">
            <div className="box">
              <span>Cidade</span> {/* Considere usar <label> para acessibilidade */}
              <select>
                <option value="">Selecione a cidade</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="Belo Horizonte">Belo Horizonte</option>
                <option value="Curitiba">Curitiba</option>
                {/* Adicione mais cidades conforme necessário */}
              </select>
            </div>

            <div className="box">
              <span>Categoria</span> {/* Considere usar <label> */}
              <select>
                <option value="">Selecione a categoria</option>
                <option value="Tratores">Tratores</option>
                <option value="Colheitadeiras">Colheitadeiras</option>
                <option value="Implementos">Implementos</option>
                <option value="Terras">Terras</option>
                {/* Adicione mais categorias */}
              </select>
            </div>

            <div className="box">
              <span>Preço</span> {/* Considere usar <label> */}
              <input type="text" placeholder="Faixa de Preço" /> {/* Placeholder mais descritivo */}
            </div>

            <button className="btn1">
              <i className="fa fa-search"></i> Buscar
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;