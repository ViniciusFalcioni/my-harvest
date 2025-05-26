import React from "react";
import Heading from "../../../components/UI/Heading";
import { team } from "../../../data/mockData";
import "./team.css";

const Team = () => {
  return (
    <>
      <section className='team background'>
        <div className='container'>
          <Heading title='Nossos Parceiros' subtitle='Explore nossa ampla gama de anúncios de terras e máquinas agrícolas. Nossos parceiros oferecem as melhores opções para atender às suas necessidades no campo.' />

          <div className='content mtop grid3'>
            {team.map((val, index) => (
              <div className='box' key={index}>
                <div className='img'>
                  <img src={val.cover} alt={val.name} />
                </div>
                <div className='details'>
                  <h4>{val.name}</h4>
                  <p>{val.list} anúncios cadastrados</p>
                  <div>  <button className='btn3 small-button'>Ver Anúncios</button></div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
