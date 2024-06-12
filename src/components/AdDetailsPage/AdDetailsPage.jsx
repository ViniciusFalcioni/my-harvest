import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { list } from "../data/Data" // Caminho atualizado
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import "./AdDetailsPage.css"

const AdDetailsPage = () => {
  const { id } = useParams()
  const ad = list.find(ad => ad.id === parseInt(id))

  const [selectedImage, setSelectedImage] = useState(ad.cover)

  if (!ad) {
    return <div>Ad not found</div>
  }

  const mapStyles = {
    height: "400px",
    width: "100%"
  }

  const defaultCenter = {
    lat: ad.latitude,
    lng: ad.longitude
  }

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
          <p>Preço {ad.price}</p>
          <p><strong>Categoria:</strong> {ad.type}</p>
          <div className='image-gallery'>
            {[ad.cover, ...ad.images].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index}`}
                onClick={() => setSelectedImage(image)}
                className={selectedImage === image ? 'selected' : ''}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='map'>
        <LoadScript googleMapsApiKey="AIzaSyANkah7OPpB2gzePw_8Vp0bgBSdOZO8VaI">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          >
            <Marker position={defaultCenter} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  )
}

export default AdDetailsPage
