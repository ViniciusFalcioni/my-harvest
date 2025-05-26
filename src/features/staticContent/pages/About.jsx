import React from "react"
import Back from "../../../components/UI/Back"
import Heading from "../../../components/UI/Heading"
import img from "../../../components/images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='Sobre nos' title='Conheça a Nossa História e Missão' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Sobre nos' subtitle='Conheça a Nossa História e Missão' />

            <p>O My Harvest é uma plataforma dedicada a conectar o setor agrícola em todo o país. Facilitamos o acesso a oportunidades de trabalho, aluguel de máquinas agrícolas e áreas disponíveis para arrendamento. Nossa missão é impulsionar o crescimento da agricultura brasileira, oferecendo soluções acessíveis e eficientes para produtores, trabalhadores e investidores do campo. Acreditamos que, quando nos unimos, o campo prospera e todos colhemos melhores resultados.</p>
          </div>
          <div className='right row'>
            <img src={img} alt='Imagem Sobre' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About