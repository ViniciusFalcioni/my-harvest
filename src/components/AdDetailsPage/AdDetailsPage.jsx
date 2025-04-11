import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./AdDetailsPage.css";

const AdDetailsPage = () => {
  const ad = {
    id: 1,
    title: "Trator John Deere 5078E",
    description: "Trator em ótimo estado, pouco uso, manutenção em dia.",
    location: "São Paulo, SP",
    brand: "John Deere",
    model: "5078E",
    year: 2020,
    price: "R$ 250.000,00",
    category_id: 1,
    machineryDetails: {
      category: "Maquinário Agrícola",
      machine_type: "Trator",
      brand: "John Deere",
      model: "5078E",
      year: 2020
    }
  };

  const selectedImage =
    "https://maxmaq.com.br/wp-content/uploads/2019/09/colheitadeira_s660_campo1_large_7d29a0524951fda410ad584d8bb04bda839e9af5-1.jpg"
;

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const defaultCenter = {
    lat: -14.235004, // Latitude do Brasil
    lng: -51.92528 // Longitude do Brasil
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
          <p><i className='fa fa-tractor'></i> {ad.brand} - {ad.model} - {ad.year}</p>
          <p>Preço: {ad.price}</p>
          <div className='additional-details'>
            <p><strong>Categoria:</strong> {ad.machineryDetails.category}</p>
            <p><strong>Tipo de Maquinário:</strong> {ad.machineryDetails.machine_type}</p>
            <p><strong>Marca:</strong> {ad.machineryDetails.brand}</p>
            <p><strong>Modelo:</strong> {ad.machineryDetails.model}</p>
            <p><strong>Ano de Fabricação:</strong> {ad.machineryDetails.year}</p>
          </div>
          <button className='contact-button'>Entrar em contato</button>
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
};

export default AdDetailsPage;
