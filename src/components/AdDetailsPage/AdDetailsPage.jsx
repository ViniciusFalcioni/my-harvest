import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./AdDetailsPage.css";

const AdDetailsPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/api/advertisements/${id}`)
      .then(response => {
        const adData = response.data;
        setAd(adData);
        const cover = adData.category_id === 1 
          ? "https://maxmaq.com.br/wp-content/uploads/2019/09/colheitadeira_s660_campo1_large_7d29a0524951fda410ad584d8bb04bda839e9af5-1.jpg"
          : adData.category_id === 2 
          ? "https://sobrevivencialismo.com/wp-content/uploads/2019/01/soyfields.jpg?w=860"
          : "https://via.placeholder.com/300";
        setSelectedImage(cover);
      })
      .catch(error => {
        console.error("Erro ao buscar anúncio:", error);
      });
  }, [id]);

  if (!ad) {
    return <div>Anúncio não encontrado</div>;
  }

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const defaultCenter = {
    lat: -14.235004, // Latitude do Brasil
    lng: -51.92528  // Longitude do Brasil
  };

  return (
    <div className="container">
      <div className='ad-details'>
        <div className='main-image'>
          <img src={selectedImage} alt={ad.title} />
        </div>
        <div className='details'>
          <h2>{ad.title}</h2>
          <p>{ad.description}</p>
          <p><i className='fa fa-location-dot'></i> {ad.location}</p>
          {ad.brand && ad.model && ad.year && (
            <p><i className='fa fa-tractor'></i> {ad.brand} - {ad.model} - {ad.year}</p>
          )}
          <p>Preço: {ad.price}</p>
          <div className='additional-details'>
            {ad.category_id === 1 && ad.machineryDetails && (
              <>
               <p><strong>Categoria:</strong> {ad.machineryDetails.category}</p>
                <p><strong>Tipo de Maquinário: </strong>{ad.machineryDetails.machine_type}</p>
                <p><strong>Marca: </strong>{ad.machineryDetails.brand}</p>
                <p><strong>Modelo: </strong>{ad.machineryDetails.model}</p>
                <p><strong>Ano de Fabricação: </strong>{ad.machineryDetails.year}</p>
              </>
            )}
            {ad.category_id === 2 && ad.landDetails && (
              <>
                 <p><strong>Categoria:</strong> {ad.landDetails.category}</p>
                <p><strong>Tamanho da Terra:</strong> {ad.landDetails.land_size} {ad.landDetails.land_size_type}</p>
                <p><strong>Tipo de Solo: </strong>{ad.landDetails.soil_type}</p>
                <p><strong>Detalhes de Irrigação: </strong>{ad.landDetails.irrigation}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='map'>
        <LoadScript googleMapsApiKey="AIzaSyANkah7OPpB2gzePw_8Vp0bgBSdOZO8VaI">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={5}
            center={defaultCenter}
          >
            <Marker position={defaultCenter} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default AdDetailsPage;
