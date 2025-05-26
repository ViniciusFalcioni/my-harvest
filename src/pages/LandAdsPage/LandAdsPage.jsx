// src/pages/LandAdsPage.jsx
import React from "react";
import SingleAdCard from '../../components/Card/SingleAdCard'
import Back from "../components/common/Back"; // Componente de banner/título da página
import img from "../images/pricing.jpg"; // Imagem para o Back (ou uma específica para terras)

// Dados mockados - Em um projeto real, isso viria de uma API
// Você pode mover isso para um arquivo src/data/mockAds.js e importar aqui e no RecentCard.jsx
const allAds = [
    {
        id: 1,
        category_id: 1, // 1 para Maquinário
        title: "Trator John Deere 5055E",
        price: "120000",
        location: "São Paulo, SP",
        description: "Trator John Deere 5055E em ótimo estado. Perfeito para grandes áreas agrícolas e trabalhos pesados no campo.",
        brand: "John Deere",
        model: "5055E",
        year: "2020",
        machineryDetails: { category: "Venda" },
        landDetails: null,
        // coverImage: "url_da_imagem_especifica_do_trator.jpg"
    },
    {
        id: 2,
        category_id: 2, // 2 para Terra
        title: "Fazenda de Soja - 300 hectares",
        price: "5000000",
        location: "Mato Grosso, MT",
        description: "Excelente fazenda de soja com irrigação automática e solo argiloso, pronta para plantio e alta produtividade.",
        landDetails: { category: "Venda" },
        machineryDetails: null,
        // coverImage: "url_da_imagem_especifica_da_fazenda.jpg"
    },
    {
        id: 3,
        category_id: 1,
        title: "Colheitadeira S660",
        price: "850000",
        location: "Goiás, GO",
        description: "Colheitadeira S660 em perfeito estado, ideal para colheita de grandes volumes de grãos com eficiência.",
        brand: "John Deere",
        model: "S660",
        year: "2018",
        machineryDetails: { category: "Venda" },
        landDetails: null,
    },
    {
        id: 4,
        category_id: 2,
        title: "Sítio Produtivo - 50 hectares",
        price: "2000000",
        location: "Minas Gerais, MG",
        description: "Sítio bem localizado com plantação de café maduro e infraestrutura completa para moradia e produção.",
        landDetails: { category: "Venda" },
        machineryDetails: null,
    },
    {
        id: 5,
        category_id: 1,
        title: "Plantadeira Massey Ferguson 5200",
        price: "400000",
        location: "Paraná, PR",
        description: "Plantadeira Massey Ferguson 5200 em excelente estado para plantio de grandes áreas com precisão.",
        brand: "Massey Ferguson",
        model: "5200",
        year: "2019",
        machineryDetails: { category: "Alugar" },
        landDetails: null,
    },
    {
        id: 6,
        category_id: 2,
        title: "Fazenda de Milho Irrigada - 150 ha",
        price: "3500000",
        location: "Bahia, BA",
        description: "Fazenda de milho com sistema de irrigação eficiente e solo fértil, ótima oportunidade de investimento.",
        landDetails: { category: "Arrendar" },
        machineryDetails: null,
    },
    // Adicione mais anúncios de terra aqui para testar
    {
        id: 7,
        category_id: 2,
        title: "Chácara para Lazer - 5 hectares",
        price: "750000",
        location: "Interior de São Paulo, SP",
        description: "Linda chácara com casa sede, piscina, pomar e área verde preservada. Ideal para fins de semana.",
        landDetails: { category: "Venda" },
        machineryDetails: null,
    },
];


const LandAdsPage = () => {
    // Filtrar anúncios para mostrar apenas terras (category_id === 2)
    const landAds = allAds.filter(ad => ad.category_id === 2);

    // Você pode usar uma imagem de banner específica para a página de terras
    const landCoverImage = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"; // Exemplo

    return (
        <>
            <Back name="Terras" title="Encontre a Terra Ideal para Seu Negócio ou Lazer" cover={landCoverImage} />
            <section className="land-ads-page recent padding"> {/* Adicione classes para estilização específica da página e layout */}
                <div className="container">
                    {landAds.length > 0 ? (
                        <div className="content grid3 mtop"> {/* Reutilizando a classe de grid para consistência */}
                            {landAds.map((adItem) => (
                                <SingleAdCard key={adItem.id} ad={adItem} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '50px 0' }}>
                            <h3>Nenhum anúncio de terra encontrado no momento.</h3>
                            <p>Por favor, verifique novamente mais tarde.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default LandAdsPage;