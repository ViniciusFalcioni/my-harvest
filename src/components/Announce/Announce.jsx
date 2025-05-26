import React, { useState } from "react";
import axios from "axios";
import img from "../images/pricing.jpg"; // Imagem para o componente Back
import Back from "../common/Back"; // Seu componente de cabeçalho/banner
import SuccessPopup from "../Popups/SuccessPopup"; // Seu popup de sucesso
import FailedPopup from "../Popups/FailedPopup";   // Seu popup de falha
import "./Announce.css"; // O novo CSS que te enviei

const Announce = () => {
  // Estado para controlar qual categoria principal está selecionada (maquinário ou terra)
  const [selectedMainCategory, setSelectedMainCategory] = useState(""); // "machinery" ou "land"

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    listing_type: "", // Novo campo para "Venda", "Alugar", "Arrendar"
    machine_type: "",
    brand: "",
    model: "",
    year: "",
    land_size: "",
    land_size_type: "",
    soil_type: "",
    irrigation: "",
    // Adicione um campo para arquivos se for implementar o upload
    // images: null,
  });

  // Define a categoria principal e limpa campos específicos da outra categoria
  const handleMainCategorySelection = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
    // Limpa campos da categoria anterior e o tipo de listagem ao trocar de categoria principal
    setFormData(prevFormData => ({
      ...prevFormData, // Mantém os campos comuns
      listing_type: "", // Reseta o tipo de listagem
      // Limpa campos de maquinário se a nova categoria não for machinery
      machine_type: mainCategory === "machinery" ? prevFormData.machine_type : "",
      brand: mainCategory === "machinery" ? prevFormData.brand : "",
      model: mainCategory === "machinery" ? prevFormData.model : "",
      year: mainCategory === "machinery" ? prevFormData.year : "",
      // Limpa campos de terra se a nova categoria não for land
      land_size: mainCategory === "land" ? prevFormData.land_size : "",
      land_size_type: mainCategory === "land" ? prevFormData.land_size_type : "",
      soil_type: mainCategory === "land" ? prevFormData.soil_type : "",
      irrigation: mainCategory === "land" ? prevFormData.irrigation : "",
    }));
  };

  // Mapeia a categoria principal para o ID numérico
  const getCategoryID = () => {
    if (selectedMainCategory === "machinery") return 1; // ID para Máquinas Agrícolas
    if (selectedMainCategory === "land") return 2; // ID para Terras
    return null;
  };

  // Manipulador genérico para a maioria dos campos de formulário
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      // Para o input de arquivo, você pegaria os arquivos aqui
      // Por enquanto, não estamos adicionando ao formData para não quebrar a submissão atual
      // setFormData({ ...formData, [name]: files });
      console.log("Arquivos selecionados:", files); // Apenas para demonstração
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Reseta o formulário e a seleção de categoria principal
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      location: "",
      listing_type: "",
      machine_type: "",
      brand: "",
      model: "",
      year: "",
      land_size: "",
      land_size_type: "",
      soil_type: "",
      irrigation: "",
    });
    setSelectedMainCategory(""); // Reseta a categoria principal
  };

  // Manipulador para a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryID = getCategoryID();
    // Prepara os dados para enviar. Remova campos vazios específicos de categoria se desejar.
    const dataToSend = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      location: formData.location,
      category_id: categoryID, // ID da categoria principal (maquinário/terra)
      listing_type: formData.listing_type, // Venda, Alugar, Arrendar
    };

    if (selectedMainCategory === "machinery") {
      dataToSend.machine_type = formData.machine_type;
      dataToSend.brand = formData.brand;
      dataToSend.model = formData.model;
      dataToSend.year = formData.year;
    } else if (selectedMainCategory === "land") {
      dataToSend.land_size = formData.land_size;
      dataToSend.land_size_type = formData.land_size_type;
      dataToSend.soil_type = formData.soil_type;
      dataToSend.irrigation = formData.irrigation;
    }
    // NOTA: O upload de arquivos (formData.images) requer tratamento especial (geralmente FormData API)
    // e não está incluído neste dataToSend simples.

    try {
      const response = await axios.post("http://localhost:3001/api/advertisements", dataToSend);
      console.log("Anúncio cadastrado com sucesso:", response.data);
      setShowSuccess(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao cadastrar anúncio:", error.response ? error.response.data : error.message);
      setShowFailed(true);
    }
  };

  return (
    <>
      <section className="announce-page-section"> {/* Classe principal da seção */}
        <Back name="Cadastrar Anúncio" title="Escolha o Tipo de Anúncio" cover={img} />
        <div className="container">
          {/* Seleção de Categoria Principal */}
          <div className="category-selector">
            <div
              className={`category-card ${selectedMainCategory === "machinery" ? "selected" : ""}`}
              onClick={() => handleMainCategorySelection("machinery")}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/cadastro/cadastrar-maquina.jpg)` }}
              tabIndex={0} // Para acessibilidade (foco com teclado)
              onKeyPress={(e) => e.key === 'Enter' && handleMainCategorySelection("machinery")} // Para acessibilidade
            >
              <div className="overlay">
                <button className="category-button">Cadastrar Maquinário</button>
              </div>
            </div>
            <div
              className={`category-card ${selectedMainCategory === "land" ? "selected" : ""}`}
              onClick={() => handleMainCategorySelection("land")}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/cadastro/cadastrar-terra.jpg)` }}
              tabIndex={0} // Para acessibilidade
              onKeyPress={(e) => e.key === 'Enter' && handleMainCategorySelection("land")} // Para acessibilidade
            >
              <div className="overlay">
                <button className="category-button">Cadastrar Terra</button>
              </div>
            </div>
          </div>

          {/* Formulário de Cadastro (aparece após selecionar a categoria principal) */}
          {selectedMainCategory !== "" && (
            <form className="announce-form shadow" onSubmit={handleSubmit}>
              <h4>
                Cadastrar {selectedMainCategory === "machinery" ? "Maquinário" : "Terra"}
              </h4>

              <div className="form-group">
                <label htmlFor="title">Título do anúncio*</label>
                <input type="text" id="title" name="title" placeholder="Ex: Trator John Deere 5078E em ótimo estado" required onChange={handleChange} value={formData.title} />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descrição detalhada*</label>
                <textarea name="description" id="description" placeholder="Descreva os detalhes do seu item..." cols="30" rows="7" required onChange={handleChange} value={formData.description}></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Preço (R$)*</label>
                  <input type="number" id="price" name="price" placeholder="Ex: 250000" required onChange={handleChange} value={formData.price} />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Localização (Cidade, UF)*</label>
                  <input type="text" id="location" name="location" placeholder="Ex: Ribeirão Preto, SP" required onChange={handleChange} value={formData.location} />
                </div>
              </div>

              {/* Campos específicos para Maquinário */}
              {selectedMainCategory === "machinery" && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="machinery_listing_type">Tipo de Anúncio*</label>
                      <select id="machinery_listing_type" name="listing_type" required onChange={handleChange} value={formData.listing_type}>
                        <option value="" disabled>Selecione...</option>
                        <option value="Venda">Venda</option>
                        <option value="Alugar">Alugar</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="machine_type">Tipo de Maquinário*</label>
                      <input type="text" id="machine_type" name="machine_type" placeholder="Ex: Trator, Colheitadeira" required onChange={handleChange} value={formData.machine_type} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="brand">Marca*</label>
                      <input type="text" id="brand" name="brand" placeholder="Ex: John Deere" required onChange={handleChange} value={formData.brand} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="model">Modelo*</label>
                      <input type="text" id="model" name="model" placeholder="Ex: 5078E" required onChange={handleChange} value={formData.model} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="year">Ano de Fabricação*</label>
                      <input type="number" id="year" name="year" placeholder="Ex: 2020" min="1900" max={new Date().getFullYear() + 1} required onChange={handleChange} value={formData.year} />
                    </div>
                  </div>
                </>
              )}

              {/* Campos específicos para Terra */}
              {selectedMainCategory === "land" && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="land_listing_type">Tipo de Anúncio*</label>
                      <select id="land_listing_type" name="listing_type" required onChange={handleChange} value={formData.listing_type}>
                        <option value="" disabled>Selecione...</option>
                        <option value="Venda">Venda</option>
                        <option value="Arrendar">Arrendar</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="land_size">Tamanho da Terra*</label>
                      <input type="number" id="land_size" name="land_size" placeholder="Ex: 100" required onChange={handleChange} value={formData.land_size} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="land_size_type">Unidade de Medida*</label>
                      <select id="land_size_type" name="land_size_type" required onChange={handleChange} value={formData.land_size_type}>
                        <option value="" disabled>Selecione...</option>
                        <option value="Hectares">Hectares</option>
                        <option value="Alqueires">Alqueires</option>
                        <option value="Acres">Acres</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="soil_type">Tipo de Solo (Opcional)</label>
                      <input type="text" id="soil_type" name="soil_type" placeholder="Ex: Arenoso, Argiloso" onChange={handleChange} value={formData.soil_type} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="irrigation">Detalhes de Irrigação (Opcional)</label>
                      <input type="text" id="irrigation" name="irrigation" placeholder="Ex: Pivô Central, Gotejamento" onChange={handleChange} value={formData.irrigation} />
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="images">Fotos do Anúncio (Opcional)</label>
                <input type="file" id="images" name="images" multiple onChange={handleChange} accept="image/*" />
                <small style={{ display: 'block', marginTop: '5px', color: '#777' }}>Selecione uma ou mais imagens. O upload real de arquivos não está implementado neste exemplo.</small>
              </div>

              <button type="submit" className="submit-button">
                Cadastrar Anúncio de {selectedMainCategory === "machinery" ? "Maquinário" : "Terra"}
              </button>
            </form>
          )}

          {/* Popups de Sucesso/Falha */}
          {showSuccess && <SuccessPopup message="Anúncio cadastrado com sucesso!" onClose={() => setShowSuccess(false)} />}
          {showFailed && <FailedPopup message="Erro ao cadastrar anúncio. Verifique os dados ou tente novamente." onClose={() => setShowFailed(false)} />}
        </div>
      </section>
    </>
  );
};

export default Announce;