import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '../UI/Heading';
import SingleAdCard from '../SingleCard/SingleAdCard';

const MeusAnuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        // Faz a requisição para a API que criamos no back-end
        const response = await axios.get('http://localhost:3001/api/anuncios');
        setAnuncios(response.data); // Armazena os dados no estado
      } catch (err) {
        setError('Não foi possível carregar os anúncios.');
        console.error(err);
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchAnuncios();
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez

  if (loading) {
    return <div className='meus-anuncios-container'><p>Carregando anúncios...</p></div>;
  }

  if (error) {
    return <div className='meus-anuncios-container'><p>{error}</p></div>;
  }

  return (
    <section className='meus-anuncios-container'>
      <Heading title='Meus Anúncios' subtitle='Veja, edite ou exclua seus anúncios cadastrados.' />

      <div className='content'>
        {anuncios.length > 0 ? (
          anuncios.map((anuncio) => (
            <SingleAdCard
              key={anuncio.idAnuncio}
              id={anuncio.idAnuncio}
              title={anuncio.titulo}
              price={anuncio.preco}
            // Adapte os outros props conforme o componente SingleAdCard espera
            // Ex: location, images, etc. que virão de outras tabelas no futuro
            />
          ))
        ) : (
          <p>Você ainda não cadastrou nenhum anúncio.</p>
        )}
      </div>
    </section>
  );
};

export default MeusAnuncios;