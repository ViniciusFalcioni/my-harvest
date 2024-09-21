import React from "react"
import { Link } from "react-router-dom"
import "./RecentCard.css"

const RecentCard = () => {
  // Anúncios fixos pré-definidos
  const ads = [
    {
      id: 1,
      category_id: 1,
      title: "Trator John Deere 5055E",
      price: "120000",
      location: "São Paulo, SP",
      description: "Trator John Deere 5055E em ótimo estado. Perfeito para grandes áreas agrícolas.",
      brand: "John Deere",
      model: "5055E",
      year: "2020",
      machineryDetails: {
        category: "Venda"
      },
      landDetails: null
    },
    {
      id: 2,
      category_id: 2,
      title: "Fazenda de Soja - 300 hectares",
      price: "5000000",
      location: "Mato Grosso, MT",
      description: "Excelente fazenda de soja com irrigação automática e solo argiloso.",
      landDetails: {
        category: "Venda"
      },
      machineryDetails: null
    },
    {
      id: 3,
      category_id: 1,
      title: "Colheitadeira S660",
      price: "850000",
      location: "Goiás, GO",
      description: "Colheitadeira S660 em perfeito estado, ideal para colheita de grandes volumes.",
      brand: "John Deere",
      model: "S660",
      year: "2018",
      machineryDetails: {
        category: "Venda"
      },
      landDetails: null
    },
    {
      id: 4,
      category_id: 2,
      title: "Sítio - 50 hectares",
      price: "2000000",
      location: "Minas Gerais, MG",
      description: "Sítio bem localizado com plantação de café e infraestrutura completa.",
      landDetails: {
        category: "Venda"
      },
      machineryDetails: null
    },
    {
      id: 5,
      category_id: 1,
      title: "Plantadeira Massey Ferguson 5200",
      price: "400000",
      location: "Paraná, PR",
      description: "Plantadeira Massey Ferguson 5200 em excelente estado para plantio de grandes áreas.",
      brand: "Massey Ferguson",
      model: "5200",
      year: "2019",
      machineryDetails: {
        category: "Venda"
      },
      landDetails: null
    },
    {
      id: 6,
      category_id: 2,
      title: "Fazenda de Milho - 150 hectares",
      price: "3500000",
      location: "Bahia, BA",
      description: "Fazenda de milho com sistema de irrigação eficiente e solo fértil.",
      landDetails: {
        category: "Venda"
      },
      machineryDetails: null
    }
  ]

  const handleDelete = (id) => {
    // Simular exclusão de anúncio
    console.log(`Anúncio com ID ${id} excluído.`)
  }

  return (
    <>
      <div className='content grid3 mtop'>
        {ads.map((val, index) => {
          const { id, category_id, location, title, price, description, brand, model, year, landDetails, machineryDetails } = val
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

              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
