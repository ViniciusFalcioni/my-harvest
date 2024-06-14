import React, { useState } from "react";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import "./Announce.css";

const Announce = () => {
  const [category, setCategory] = useState("");

  const handleCategorySelection = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const getCategoryID = () => {
    if (category === "machinery") return 1; // ID para Máquinas Agrícolas
    if (category === "land") return 2; // ID para Terras
    return null;
  };

  return (
    <>
      <section className="contact mb">
        <Back name="Cadastrar Anúncio" title="Escolha o Tipo de Anúncio" cover={img} />
        <div className="container">
          <div className="card-group">
            <div
              className={`card ${category === "machinery" ? "selected" : ""}`}
              onClick={() => handleCategorySelection("machinery")}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/cadastro/cadastrar-maquina.jpg)` }}
            >
              <div className="overlay">
                <button>Cadastrar Maquinário</button>
              </div>
            </div>
            <div
              className={`card ${category === "land" ? "selected" : ""}`}
              onClick={() => handleCategorySelection("land")}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/cadastro/cadastrar-terra.jpg)` }}
            >
              <div className="overlay">
                <button>Cadastrar Terra</button>
              </div>
            </div>
          </div>
          {category !== "" && (
            <form className="shadow">
              <h4>Preencha as Informações</h4> <br />
              <input type="text" placeholder="Título do anúncio" required />
              <textarea placeholder="Descrição detalhada do anúncio" cols="30" rows="10" required></textarea>
              <input type="number" placeholder="Preço em R$" required />
              <input type="text" placeholder="Localização do anúncio" required />
              <input type="hidden" value={getCategoryID()} />
              {category === "machinery" && (
                <>
                  <select required>
                    <option value="" disabled selected>Categoria do maquinário</option>
                    <option value="venda">Venda</option>
                    <option value="alugar">Alugar</option>
                  </select>
                  <input type="text" placeholder="Tipo de Maquinário (ex: Trator, Colheitadeira)" required />
                  <input type="text" placeholder="Marca do Maquinário" required />
                  <input type="text" placeholder="Modelo do Maquinário" required />
                  <input type="number" placeholder="Ano de Fabricação" required />
                </>
              )}
              {category === "land" && (
                <>
                  <select required>
                    <option value="" disabled selected>Categoria da terra</option>
                    <option value="venda">Venda</option>
                    <option value="arrendar">Arrendar</option>
                  </select>
                  <input type="text" placeholder="Tamanho da Terra (hectares)" required />
                  <input type="text" placeholder="Tipo de Solo (ex: Arenoso, Argiloso)" required />
                  <input type="text" placeholder="Detalhes de Irrigação (ex: Sistema de Gotejamento)" required />
                </>
              )}
              <input type="file" multiple />
              <button type="submit">Cadastrar Anúncio</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Announce;
