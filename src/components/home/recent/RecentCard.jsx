import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { MdDelete, MdEdit } from "react-icons/md"
import "./RecentCard.css"

const RecentCard = () => {
  const [ads, setAds] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/api/advertisements")
      .then(response => {
        setAds(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar anúncios:", error)
      })
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/advertisements/${id}`)
      .then(response => {
        setAds(ads.filter(ad => ad.id !== id))
        console.log("Anúncio removido com sucesso:", response.data)
      })
      .catch(error => {
        console.error("Erro ao remover anúncio:", error)
      })
  }

  return (
    <>
      <div className='content grid3 mtop'>
        {ads.map((val, index) => {
          const { id, category_id, location, title, price, type, description, brand, model, year, landDetails, machineryDetails } = val
          const cover = category_id === 1 
          ? "https://maxmaq.com.br/wp-content/uploads/2019/09/colheitadeira_s660_campo1_large_7d29a0524951fda410ad584d8bb04bda839e9af5-1.jpg"
          : category_id === 2 
          ? "https://sobrevivencialismo.com/wp-content/uploads/2019/01/soyfields.jpg?w=860"
          : "https://via.placeholder.com/300"
          const category = landDetails ? landDetails.category : machineryDetails ? machineryDetails.category : null

          return (
            <div className='box-card shadow' key={index}>
              <Link to={`/anuncio/${id}`} className='img'>
                <img src={cover} alt='' />
              </Link>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: "#2E8B57", color: "#fff" }}>{category}</span>
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
                <button className='btn2'>R$ {Number(price).toFixed(2)}</button>
                </div>
                <div className='actions'>
                  <Link to={`/editar-anuncio/${id}`} className='btn-edit'><MdEdit /></Link>
                  <button className='btn-delete' onClick={() => handleDelete(id)}><MdDelete /></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
