import React, { useState } from "react";
import axios from "axios";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import SuccessPopup from "../Popups/SuccessPopup";
import FailedPopup from "../Popups/FailedPopup";
import "./Announce.css";

const Announce = () => {
  const [category, setCategory] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    category: "",
    machine_type: "",
    brand: "",
    model: "",
    year: "",
    land_size: "",
    land_size_type: "",
    soil_type: "",
    irrigation: ""
  });

  const handleCategorySelection = (selectedCategory) => {
    setCategory(selectedCategory);
    setFormData({ ...formData, category: selectedCategory });
  };

  const getCategoryID = () => {
    if (category === "machinery") return 1; // ID para Máquinas Agrícolas
    if (category === "land") return 2; // ID para Terras
    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      location: "",
      category: "",
      machine_type: "",
      brand: "",
      model: "",
      year: "",
      land_size: "",
      land_size_type: "",
      soil_type: "",
      irrigation: ""
    });
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryID = getCategoryID();
    const data = { ...formData, category_id: categoryID };

    try {
      const response = await axios.post("http://localhost:3001/api/advertisements", data);
      console.log("Anúncio cadastrado com sucesso:", response.data);
      setShowSuccess(true);
      resetForm(); // Limpar o formulário após a submissão bem-sucedida
    } catch (error) {
      console.error("Erro ao cadastrar anúncio:", error);
      setShowFailed(true);
    }
  };

  return (
    <>
      <section className="contact mb">
        <Back name="Cadastrar Anúncio" title="Escolha o Tipo de Anúncio" cover={img} />
        <div className="container">
          <div className="card-group">
            <div
              className={`card R${category === "machinery" ? "selected" : ""}`}
              onClick={() => handleCategorySelection("machinery")}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/cadastro/cadastrar-maquina.jpg)` }}
            >
              <div className="overlay">
                <button>Cadastrar Maquinário</button>
              </div>
            </div>
            <div
              className={`card R${category === "land" ? "selected" : ""}`}
              onClick={() => handleCategorySelection("land")}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/cadastro/cadastrar-terra.jpg)` }}
            >
              <div className="overlay">
                <button>Cadastrar Terra</button>
              </div>
            </div>
          </div>
          {category !== "" && (
            <form className="shadow" onSubmit={handleSubmit}>
              <h4>Preencha as Informações</h4> <br />
              <input type="text" name="title" placeholder="Título do anúncio" required onChange={handleChange} value={formData.title} />
              <textarea name="description" placeholder="Descrição detalhada do anúncio" cols="30" rows="10" required onChange={handleChange} value={formData.description}></textarea>
              <input type="number" name="price" placeholder="Preço em R$" required onChange={handleChange} value={formData.price} />
              <input type="text" name="location" placeholder="Localização do anúncio" required onChange={handleChange} value={formData.location} />
              <input type="hidden" name="category_id" value={getCategoryID()} />
              {category === "machinery" && (
                <>
                  <select name="category" required onChange={handleChange} value={formData.category}>
                    <option value="" disabled>Categoria do maquinário</option>
                    <option value="Venda">Venda</option>
                    <option value="Alugar">Alugar</option>
                  </select>
                  <input type="text" name="machine_type" placeholder="Tipo de Maquinário (ex: Trator, Colheitadeira)" required onChange={handleChange} value={formData.machine_type} />
                  <input type="text" name="brand" placeholder="Marca do Maquinário" required onChange={handleChange} value={formData.brand} />
                  <input type="text" name="model" placeholder="Modelo do Maquinário" required onChange={handleChange} value={formData.model} />
                  <input type="number" name="year" placeholder="Ano de Fabricação" required onChange={handleChange} value={formData.year} />
                </>
              )}
              {category === "land" && (
                <>
                  <select name="category" required onChange={handleChange} value={formData.category}>
                    <option value="" disabled>Categoria da terra</option>
                    <option value="Venda">Venda</option>
                    <option value="Arrendar">Arrendar</option>
                  </select>
                  <input type="text" name="land_size" placeholder="Tamanho da Terra (hectares)" required onChange={handleChange} value={formData.land_size} />
                  <select name="land_size_type" required onChange={handleChange} value={formData.land_size_type}>
                    <option value="" disabled>Tipo de Medida da Terra</option>
                    <option value="Hectares">Hectares</option>
                    <option value="Alqueires">Alqueires</option>
                    <option value="Acres">Acres</option>
                  </select>
                  <input type="text" name="soil_type" placeholder="Tipo de Solo (ex: Arenoso, Argiloso)" onChange={handleChange} value={formData.soil_type} />
                  <input type="text" name="irrigation" placeholder="Detalhes de Irrigação (ex: Sistema de Gotejamento)" onChange={handleChange} value={formData.irrigation} />
                </>
              )}
              <input type="file" multiple />
              <button type="submit">Cadastrar Anúncio</button>
            </form>
          )}
          {showSuccess && <SuccessPopup message="Anúncio cadastrado com sucesso!" onClose={() => setShowSuccess(false)} />}
          {showFailed && <FailedPopup message="Erro ao cadastrar anúncio!" onClose={() => setShowFailed(false)} />}
        </div>
      </section>
    </>
  );
};

export default Announce;
