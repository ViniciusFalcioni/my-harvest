import React from "react"
import Heading from "../../components/UI/Heading"
import { location } from "../../data/mockData"
import "./Location.css"

const Location = () => {
  return (
    <>
      <section className='location padding'>
        <div className='container'>
          <Heading title='Encontre o anúncio por região' subtitle='Encontre Anúncios Localizados: Descubra Oportunidades na Sua Região' />

          <div className='content grid3 mtop'>
            {location.map((item, index) => (
              <div className='box' key={index}>
                <img src={item.cover} alt='' />
                <div className='overlay'>
                  <h5>{item.name}</h5>
                  <p>
                    <label>{item.Villas}</label>
                    <label>{item.Offices}</label>
                    <label>{item.Apartments}</label>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Location
