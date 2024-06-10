import React, { useState } from "react"
import img from "../images/pricing.jpg"
import Back from "../common/Back"
import "./Announce.css"

const Announce = () => {
    const [category, setCategory] = useState("");

    const handleCategorySelection = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    return (
        <>
            <section className='contact mb'>
                <Back name='Cadastrar Anúncio' title='Escolha o Tipo de Anúncio' cover={img} />
                <div className='container'>
                    <div className='button-group'>
                        <button
                            className={category === "machinery" ? "selected" : ""}
                            onClick={() => handleCategorySelection("machinery")}
                        >
                            Cadastrar Maquinário
                        </button>
                        <button
                            className={category === "land" ? "selected" : ""}
                            onClick={() => handleCategorySelection("land")}
                        >
                            Cadastrar Terra
                        </button>
                    </div>
                    {category !== "" && (
                        <form className='shadow'>
                            <h4>Preencha as Informaçöes</h4> <br />
                            <input type='text' placeholder='Título' required />
                            <textarea placeholder='Descrição' cols='30' rows='10' required></textarea>
                            {category === "machinery" && (
                                <>
                                    <input type='text' placeholder='Tipo de Maquinário' required />
                                    <input type='text' placeholder='Marca' required />
                                    <input type='text' placeholder='Modelo' required />
                                    <input type='number' placeholder='Ano' required />
                                </>
                            )}
                            {category === "land" && (
                                <>
                                    <input type='text' placeholder='Tamanho da Terra (hectares)' required />
                                    <input type='text' placeholder='Tipo de Solo' required />
                                    <input type='text' placeholder='Detalhes de Irrigação' required />
                                </>
                            )}
                            <input type='number' placeholder='Preço' required />
                            <input type='text' placeholder='Localização' required />
                            <button type='submit'>Enviar Solicitação</button>
                        </form>
                    )}
                </div>
            </section>
        </>
    )
}

export default Announce
