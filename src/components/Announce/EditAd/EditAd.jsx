import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import img from "../../images/pricing.jpg";
import Back from "../../common/Back";
import SuccessPopup from "../../Popups/SuccessPopup";
import FailedPopup from "../../Popups/FailedPopup";
import "../Announce.css";

const EditAd = () => {
  const { id } = useParams();
  const history = useHistory();
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

  useEffect(() => {
    axios.get(`http://localhost:3001/api/advertisements/${id}`)
      .then(response => {
        const ad = response.data;
        setCategory(ad.category_id === 1 ? "machinery" : "land");
        setFormData({
          title: ad.title || "",
          description: ad.description || "",
          price: ad.price || "",
          location: ad.location || "",
          category: ad.category || "",
          machine_type: ad.machineryDetails?.machine_type || "",
          brand: ad.machineryDetails?.brand || "",
          model: ad.machineryDetails?.model || "",
          year: ad.machineryDetails?.year || "",
          land_size: ad.landDetails?.land_size || "",
          land_size_type: ad.landDetails?.land_size_type || "",
          soil_type: ad.landDetails?.soil_type || "",
          irrigation: ad.landDetails?.irrigation || ""
        });
      })
      .catch(error => {
        console.error("Erro ao buscar anúncio:", error);
        setShowFailed(true);
      });
  }, [id]);


  const getCategoryID = () => {
    if (category === "machinery") return 1; // ID para Máquinas Agrícolas
    if (category === "land") return 2; // ID para Terras
    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryID = getCategoryID();
    const data = { ...formData, category_id: categoryID };

    try {
      await axios.put(`http://localhost:3001/api/advertisements/${id}`, data);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        history.push("/meus-anuncios");
      }, 1000);
    } catch (error) {
      console.error("Erro ao atualizar anúncio:", error);
      setShowFailed(true);
    }
  };

  return (
    <>
      <section className="contact mb">
        <Back name="Editar Anúncio" title="Atualize as Informações do Anúncio" cover={img} />
        <div className="container">
         
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
              <button type="submit">Atualizar Anúncio</button>
            </form>
          )}
          {showSuccess && <SuccessPopup message="Anúncio atualizado com sucesso!" onClose={() => setShowSuccess(false)} />}
          {showFailed && <FailedPopup message="Erro ao atualizar anúncio!" onClose={() => setShowFailed(false)} />}
        </div>
      </section>
    </>
  );
};

export default EditAd;
