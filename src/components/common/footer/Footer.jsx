import React from "react";
import { footer } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <section className="footerContact">
        <div className="container">
          <h1>Você tem dúvidas?</h1>
          <p>Vamos ajudar você a crescer seu negócio.</p>
          <button className="btn5">Entre em contato</button>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="box logo">
            <h2>Receba Novidades</h2>
            <p>Fique por dentro das atualizações e ofertas exclusivas.</p>
            <div className="input">
              <input type="email" placeholder="Seu e-mail" />
              <button>Inscreva-se</button>
            </div>
          </div>

          {footer.map((val, index) => (
            <div className="box" key={index}>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items, idx) => (
                  <li key={idx}>{items.list}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      <div className="legal">
        <span>My Harvest - 2025</span>
      </div>
    </>
  );
};

export default Footer;
