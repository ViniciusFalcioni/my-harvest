// src/components/common/SingleAdCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import './SingleAdCard.css'
// Função para formatar o valor em Reais (BRL)
const formatCurrency = (value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        console.warn("Valor de preço inválido para formatação:", value);
        return "Preço a consultar"; // Ou algum placeholder
    }
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(numValue);
};

const SingleAdCard = ({ ad }) => {
    // Desestruturação cuidadosa, verificando se 'ad' existe
    if (!ad) {
        return null; // Ou algum fallback se o 'ad' for undefined
    }

    const {
        id,
        category_id,
        location,
        title,
        price,
        description = "Descrição não disponível.", // Valor padrão para descrição
        brand,
        model,
        year,
        landDetails,
        machineryDetails,
        coverImage, // Espera-se que 'coverImage' venha no objeto 'ad'
    } = ad;

    // Lógica para determinar a imagem de capa
    // Prioriza 'coverImage' do objeto 'ad', depois fallback para genéricas
    const displayCoverImage = coverImage ||
        (category_id === 1
            ? "https://maxmaq.com.br/wp-content/uploads/2019/09/colheitadeira_s660_campo1_large_7d29a0524951fda410ad584d8bb04bda839e9af5-1.jpg" // Maquinário
            : category_id === 2
                ? "https://sobrevivencialismo.com/wp-content/uploads/2019/01/soyfields.jpg?w=860" // Terra
                : "https://via.placeholder.com/400x300.png?text=Imagem+Indispon%C3%ADvel"); // Placeholder

    // Determina a categoria para exibição (Venda/Alugar/Arrendar)
    const listingCategory = landDetails?.category || machineryDetails?.category || "N/A";

    const shortDescription = description.length > 100 ? description.substring(0, 97) + "..." : description;

    return (
        <div className="box-card shadow">
            <Link to={`/anuncio/${id}`} className="img-link"> {/* Renomeado para img-link para clareza */}
                <img src={displayCoverImage} alt={title || "Anúncio"} />
            </Link>
            <div className="text-content"> {/* Renomeado para text-content */}
                <div className="category-flex"> {/* Renomeado para category-flex */}
                    <span className="listing-type-badge" style={{ background: "#2E8B57", color: "#fff" }}>
                        {listingCategory}
                    </span>
                    <button className="favorite-button" aria-label="Adicionar aos favoritos">
                        <i className="fa fa-heart"></i>
                    </button>
                </div>
                <h4>{title || "Título Indisponível"}</h4>
                <p className="description-text">{shortDescription}</p>
                {category_id === 1 && brand && model && year && (
                    <p className="details-text">
                        <i className="fa fa-tractor"></i> {brand} - {model} - {year}
                    </p>
                )}
                <p className="details-text">
                    <i className="fa fa-location-dot"></i> {location || "Localização Indisponível"}
                </p>
            </div>
            <div className="price-button-flex">
                <div>
                    <button className="btn2 price-tag">{formatCurrency(price)}</button>
                </div>
            </div>
        </div>
    );
};

export default SingleAdCard;