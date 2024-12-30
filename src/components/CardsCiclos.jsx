import React, { useState } from 'react';
import cardData from '../data/cardData';

const CardCiclos = () => {
    const [visibleCards, setVisibleCards] = useState(3);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const openModal = (card) => {
        setSelectedCard(card);
        setIsExiting(false);
        setTimeout(() => setIsVisible(true), 10);
    };

    const closeModal = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            setSelectedCard(null);
        }, 300);
    };

    const loadMoreCards = () => setVisibleCards((prev) => prev + 3);
    const showLessCards = () => setVisibleCards(3);

    const groupedCards = cardData.slice(0, visibleCards).reduce((result, card, index) => {
        const groupIndex = Math.floor(index / 3);
        if (!result[groupIndex]) {
            result[groupIndex] = [];
        }
        result[groupIndex].push(card);
        return result;
    }, []);

    const titles = ["¡VINO LA LUZ!", "EXPLORADORES", "COUP DE CŒUR"];

    return (
        <section className="flex flex-col items-center justify-center">
            {groupedCards.map((group, groupIndex) => (
                <div key={groupIndex} className="w-full px-[25px]">
                    {/* Título para el grupo */}
                    <h2 className="text-4xl text-center lg:text-[60px] tracking-widest font-medium text-secondary-default mt-24 mb-14 font-sathu">{titles[groupIndex]}</h2>
                    {/* Tarjetas del grupo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl">
                        {group.map((card) => (
                            <div
                                key={card.id}
                                className="flex flex-col border border-gray-300 overflow-hidden shadow-md min-h-[750px]"
                                style={{ backgroundColor: card.bgColor, color: card.textColor }}>
                                <img src={card.imgSrc} alt={card.title} className="min-h-[280px] w-full object-cover" />
                                <div className="p-4 flex flex-col justify-between flex-1 py-6 gap-6">
                                    <div className='items-center flex flex-col'>
                                        <img src={card.iconSrc} alt='estrella' className='max-h-[30px] mb-6' />
                                        <h3 className="text-[28px] text-center uppercase tracking-widest">{card.title}</h3>
                                        <div
                                            className="text-[20px] font-textos text-center mt-2"
                                            dangerouslySetInnerHTML={{ __html: card.shortDescription }}
                                        />
                                    </div>
                                    <button
                                        className="mt-4 py-2 px-4 text-[20px] font-normal underline"
                                        style={{
                                            color: card.textColor,
                                            textUnderlineOffset: '6px',
                                        }}
                                        onClick={() => openModal(card)}>
                                        MÁS INFO
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Botones "Ver más" y "Ver menos" */}
            <div className="mt-6 flex gap-4">
                {visibleCards < cardData.length && (
                    <button
                        className="py-2 px-4 text-md font-normal uppercase underline text-[20px]"
                        style={{ textUnderlineOffset: '6px' }}
                        onClick={loadMoreCards}>
                        Ver más
                    </button>
                )}
                {visibleCards > 3 && (
                    <button
                        className="py-2 px-4 text-md font-normal uppercase underline text-[20px]"
                        style={{ textUnderlineOffset: '6px' }}
                        onClick={showLessCards}>
                        Ver menos
                    </button>
                )}
            </div>

            {/* Modal */}
            {selectedCard && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 flex items-center align-middle justify-center z-50 transition-opacity duration-300 ${isVisible && !isExiting ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div
                        className={`md:p-0 shadow-lg w-full h-[90vh] md:h-auto overflow-auto max-w-xs sm:max-w-[44rem] lg:max-w-4xl relative transform transition-transform duration-300 ${isVisible && !isExiting ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                            }`}
                        style={{ backgroundColor: selectedCard.bgColor }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 h-full">
                            {/* Imagen a la izquierda */}
                            <div className="relative w-full h-full">
                                <img
                                    src={selectedCard.popupContent.img}
                                    alt="Imagen del popup"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Contenido del popup */}
                            <div className="relative p-4 flex flex-col justify-between">
                                {/* Botón de cerrar */}
                                <button
                                    className="absolute top-2 right-2 sm:top-4 sm:right-4 text-lg font-bold"
                                    style={{ color: selectedCard.textColor }}
                                    onClick={closeModal}
                                >
                                    &times;
                                </button>

                                <div style={{ color: selectedCard.textColor }}>
                                    {/* Contenido del encabezado */}
                                    <h4 className="font-semibold text-lg sm:text-xl">{selectedCard.popupContent.header}</h4>
                                    <p className="font-textos text-sm sm:text-md">{selectedCard.popupContent.intro}</p>
                                    <h5 className="font-semibold text-lg sm:text-xl">{selectedCard.popupContent.question}</h5>

                                    {/* Descripción HTML */}
                                    <div
                                        className="font-textos text-sm sm:text-md"
                                        dangerouslySetInnerHTML={{ __html: selectedCard.popupContent.description }}
                                    />

                                    {/* Elementos en columnas */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-textos">
                                        {selectedCard.popupContent.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="border-l-4 pl-4"
                                                style={{ borderColor: selectedCard.textColor }}
                                            >
                                                <h4 className="text-lg sm:text-[28px]">{item.number}</h4>
                                                <p className="font-textos text-sm sm:text-md">
                                                    <strong>{item.title}</strong> {item.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default CardCiclos;
