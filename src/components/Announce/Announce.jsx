import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; // Lembre-se de instalar: npm install uuid
import img from "../images/pricing.jpg";
import Back from "../UI/Back";
import SuccessPopup from "../Popups/SuccessPopup";
import FailedPopup from "../Popups/FailedPopup";
import "./Announce.css";

const Announce = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState(""); // "machinery" ou "land"
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Estado para os dados do formulário, com nomes alinhados ao banco de dados
  const [formData, setFormData] = useState({
    // Dados Comuns (Tabela Anuncio)
    titulo: "",
    descricao: "",
    preco: "",
    localizacao: "",
    tipoTransacao: "", // "Venda", "Alugar", "Arrendar"

    // Dados Específicos (Maquinario)
    tipoMaquinario: "",
    marca: "",
    modelo: "",
    anoFabricacao: "",

    // Dados Específicos (Terra)
    areaHectares: "",
    tipoTerra: "",
    recursosNaturais: "", // Usaremos este campo para irrigação, etc.
  });

  const handleMainCategorySelection = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
    // Limpa campos para evitar enviar dados da categoria errada
    setFormData(prev => ({
      ...prev,
      tipoTransacao: "",
      tipoMaquinario: "",
      marca: "",
      modelo: "",
      anoFabricacao: "",
      areaHectares: "",
      tipoTerra: "",
      recursosNaturais: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      preco: "",
      localizacao: "",
      tipoTransacao: "",
      tipoMaquinario: "",
      marca: "",
      modelo: "",
      anoFabricacao: "",
      areaHectares: "",
      tipoTerra: "",
      recursosNaturais: "",
    });
    setSelectedMainCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // 1. Monta o objeto de dados comuns
    const commonData = {
      idAnuncio: uuidv4(),
      idUsuario: "user_placeholder_id", // IMPORTANTE: Substituir pelo ID do usuário logado
      titulo: formData.titulo,
      descricao: formData.descricao,
      preco: parseFloat(formData.preco),
      localizacao: formData.localizacao,
      tipoTransacao: formData.tipoTransacao,
    };

    // 2. Monta o objeto de dados específicos
    let specificData = {};
    if (selectedMainCategory === "machinery") {
      specificData = {
        tipoMaquinario: formData.tipoMaquinario,
        marca: formData.marca,
        modelo: formData.modelo,
        anoFabricacao: formData.anoFabricacao,
      };
    } else if (selectedMainCategory === "land") {
      specificData = {
        areaHectares: parseFloat(formData.areaHectares),
        tipoTerra: formData.tipoTerra,
        recursosNaturais: formData.recursosNaturais,
      };
    }

    // 3. Monta o payload final para a API
    const dataToSend = {
      category: selectedMainCategory,
      commonData,
      specificData,
    };

    try {
      // Corrigido para o endpoint que criamos
      const response = await axios.post("http://localhost:3001/api/anuncios", dataToSend);
      console.log("Anúncio cadastrado com sucesso:", response.data);
      setShowSuccess(true);
      resetForm();
    } catch (error) {
      const msg = error.response?.data?.message || "Erro desconhecido. Tente novamente.";
      setErrorMessage(msg);
      setShowFailed(true);
      console.error("Erro ao cadastrar anúncio:", error);
    }
  };

  return (
    <>
      <section className="announce-page-section">
        <Back name="Cadastrar Anúncio" title="Escolha o Tipo de Anúncio" cover={img} />
        <div className="container">
          {/* Bloco de seleção de categoria (seu código original, está ótimo) */}
          <div className="category-selector">
            <div
              className={`category-card ${selectedMainCategory === "machinery" ? "selected" : ""}`}
              onClick={() => handleMainCategorySelection("machinery")}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/cadastro/cadastrar-maquina.jpg)` }}
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleMainCategorySelection("machinery")}
            >
              <div className="overlay"><button className="category-button">Cadastrar Maquinário</button></div>
            </div>
            <div
              className={`category-card ${selectedMainCategory === "land" ? "selected" : ""}`}
              onClick={() => handleMainCategorySelection("land")}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/cadastro/cadastrar-terra.jpg)` }}
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleMainCategorySelection("land")}
            >
              <div className="overlay"><button className="category-button">Cadastrar Terra</button></div>
            </div>
          </div>

          {/* Formulário de Cadastro */}
          {selectedMainCategory && (
            <form className="announce-form shadow" onSubmit={handleSubmit}>
              <h4>Cadastrar {selectedMainCategory === "machinery" ? "Maquinário" : "Terra"}</h4>

              {/* Campos Comuns */}
              <div className="form-group">
                <label htmlFor="titulo">Título do anúncio*</label>
                <input type="text" id="titulo" name="titulo" placeholder="Ex: Trator John Deere 5078E" required onChange={handleChange} value={formData.titulo} />
              </div>
              <div className="form-group">
                <label htmlFor="descricao">Descrição detalhada*</label>
                <textarea name="descricao" id="descricao" placeholder="Descreva os detalhes do seu item..." rows="7" required onChange={handleChange} value={formData.descricao}></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="preco">Preço (R$)*</label>
                  <input type="number" id="preco" name="preco" placeholder="Ex: 250000" required onChange={handleChange} value={formData.preco} />
                </div>
                <div className="form-group">
                  <label htmlFor="localizacao">Localização (Cidade, UF)*</label>
                  <input type="text" id="localizacao" name="localizacao" placeholder="Ex: Ribeirão Preto, SP" required onChange={handleChange} value={formData.localizacao} />
                </div>
              </div>

              {/* Campos Específicos para Maquinário */}
              {selectedMainCategory === "machinery" && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="tipoTransacao">Tipo de Anúncio*</label>
                      <select name="tipoTransacao" required onChange={handleChange} value={formData.tipoTransacao}>
                        <option value="" disabled>Selecione...</option>
                        <option value="Venda">Venda</option>
                        <option value="Aluguel">Aluguel</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="tipoMaquinario">Tipo de Maquinário*</label>
                      <input type="text" id="tipoMaquinario" name="tipoMaquinario" placeholder="Ex: Trator, Colheitadeira" required onChange={handleChange} value={formData.tipoMaquinario} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="marca">Marca*</label>
                      <input type="text" id="marca" name="marca" placeholder="Ex: John Deere" required onChange={handleChange} value={formData.marca} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="modelo">Modelo*</label>
                      <input type="text" id="modelo" name="modelo" placeholder="Ex: 5078E" required onChange={handleChange} value={formData.modelo} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="anoFabricacao">Ano de Fabricação*</label>
                      <input type="number" id="anoFabricacao" name="anoFabricacao" placeholder="Ex: 2020" required onChange={handleChange} value={formData.anoFabricacao} />
                    </div>
                  </div>
                </>
              )}

              {/* Campos Específicos para Terra */}
              {selectedMainCategory === "land" && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="tipoTransacao">Tipo de Anúncio*</label>
                      <select name="tipoTransacao" required onChange={handleChange} value={formData.tipoTransacao}>
                        <option value="" disabled>Selecione...</option>
                        <option value="Venda">Venda</option>
                        <option value="Arrendamento">Arrendamento</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="areaHectares">Área (em Hectares)*</label>
                      <input type="number" id="areaHectares" name="areaHectares" placeholder="Ex: 150" required onChange={handleChange} value={formData.areaHectares} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="tipoTerra">Tipo de Solo (Opcional)</label>
                      <input type="text" id="tipoTerra" name="tipoTerra" placeholder="Ex: Arenoso, Argiloso" onChange={handleChange} value={formData.tipoTerra} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="recursosNaturais">Detalhes de Irrigação/Recursos (Opcional)</label>
                      <input type="text" id="recursosNaturais" name="recursosNaturais" placeholder="Ex: Pivô Central, Gotejamento" onChange={handleChange} value={formData.recursosNaturais} />
                    </div>
                  </div>
                </>
              )}

              <button type="submit" className="submit-button">Cadastrar Anúncio</button>
            </form>
          )}

          {/* Popups */}
          {showSuccess && <SuccessPopup message="Anúncio cadastrado com sucesso!" onClose={() => setShowSuccess(false)} />}
          {showFailed && <FailedPopup message={errorMessage} onClose={() => setShowFailed(false)} />}
        </div>
      </section>
    </>
  );
};

export default Announce;