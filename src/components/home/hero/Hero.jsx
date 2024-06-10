import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Search Your Next Home ' subtitle='Find new & featured property located in your local city.' />

          <form className='flex'>
            <div className='box'>
              <span>Cidade</span>
              <input type='text' placeholder='Cidade' />
            </div>
            <div className='box'>
              <span>Categoria</span>
              <input type='text' placeholder='Categoria' />
            </div>
            <div className='box'>
              <span>Preço</span>
              <input type='text' placeholder='Preço' />
            </div>
            <div className='box'>
              <h4>Advance Filter</h4>
            </div>
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
