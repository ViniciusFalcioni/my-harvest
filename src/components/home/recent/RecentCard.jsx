import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { list } from "../../data/Data" // Caminho atualizado

const RecentCard = () => {
  const [ads, setAds] = useState([])

  useEffect(() => {
    // Simula a busca de anúncios do backend
    setAds(list)
  }, [])

  return (
    <>
      <div className='content grid3 mtop'>
        {ads.map((val, index) => {
          const { id, cover, category, location, title, price, type, description, brand, model, year } = val
          return (
            <Link to={`/anuncio/${id}`} className='box shadow' key={index}>
              <div className='img'>
                <img src={cover} alt='' />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: category === "Venda" ? "#25b5791a" : "#ff98001a", color: category === "Arrendar" ? "#25b579" : "#ff9800" }}>{category}</span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{title}</h4>
                <p>{description}</p>
                {brand && model && year && (
                  <p>
                    <i className='fa fa-tractor'></i> {brand} - {model} - {year}
                  </p>
                )}
                <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{price}</button> <label htmlFor=''>/sqft</label>
                </div>
                <span>{type}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
