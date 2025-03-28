import React from "react";
import Heading from "../../common/Heading";
import "./hero.css";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <Heading title="Conectando Produtores e Recursos" subtitle="Arrende terras, Encontre seu maquinário" />

          <form className="flex">
            {/* Select para Cidade */}
            <div className="box">
              <span>Cidade</span>
              <select>
                <option value="">Selecione a cidade</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="Belo Horizonte">Belo Horizonte</option>
                <option value="Curitiba">Curitiba</option>
              </select>
            </div>

            {/* Select para Categoria */}
            <div className="box">
              <span>Categoria</span>
              <select>
                <option value="">Selecione a categoria</option>
                <option value="Tratores">Tratores</option>
                <option value="Colheitadeiras">Colheitadeiras</option>
                <option value="Implementos">Implementos</option>
                <option value="Terras">Terras</option>
              </select>
            </div>

            {/* Input para Preço */}
            <div className="box">
              <span>Preço</span>
              <input type="text" placeholder="Preço" />
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
