import React from "react"
import Heading from "../../../components/UI/Heading"
import "./price.css"
import PriceCard from "./PriceCard"

const Price = () => {
  return (
    <>
      <section className='price padding'>
        <div className='container'>
          <Heading title='Escolha seu Plano' subtitle='Escolha o plano ideal para você e tenha acesso às melhores ofertas de terras e máquinas agrícolas. Aproveite nossas opções personalizadas para atender às suas necessidades.' />
          <PriceCard />
        </div>
      </section>
    </>
  )
}

export default Price
