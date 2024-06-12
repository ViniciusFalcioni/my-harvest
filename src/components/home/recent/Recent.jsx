import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Anúncios em Destaque' subtitle='Encontre as melhores oportunidades de arrendamento de terras e aluguel de máquinas agrícolas em um só lugar. Simplifique sua busca e maximize sua produtividade com nossa plataforma fácil de usar.' />
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Recent
