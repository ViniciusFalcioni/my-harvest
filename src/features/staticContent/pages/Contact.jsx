import React from "react"
import img from "../../../components/images/pricing.jpg"
import Back from "../../../components/UI/Back"
import "./contact.css"

const Contact = () => {
  return (
    <>
      <section className='contact mb'>
        <Back name='Contato' title='Entre em contato conosco!' cover={img} />
        <div className='container'>
          <form className='shadow'>
            <h4>Entre em contato!</h4> <br />
            <div>
              <input type='text' placeholder='Nome' />
              <input type='text' placeholder='E-mail' />
            </div>
            <input type='text' placeholder='Assunto' />
            <textarea cols='30' rows='10'></textarea>
            <button>Enviar</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
