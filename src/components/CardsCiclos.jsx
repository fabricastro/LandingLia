import React, { useState } from 'react';
import cardData from '../data/cardData';

const CardCiclos = () => {
    const [visibleCards, setVisibleCards] = useState(3);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

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
        }, 500);
    };

    const loadMoreCards = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setVisibleCards(cardData.length);
            setIsAnimating(false);
        }, 300);
    };

    const showLessCards = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setVisibleCards(3);
            setIsAnimating(false);
        }, 300);
    };

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
                    <h2 className="text-3xl text-center lg:text-[48px] tracking-widest font-medium text-secondary-default mt-48 mb-14">{titles[groupIndex]}</h2>
                    {/* Tarjetas del grupo */}
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl transition-opacity duration-300 ${isAnimating ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
                    >
                        {group.map((card) => (
                            <div
                                key={card.id}
                                className="flex flex-col border border-gray-300 overflow-hidden shadow-md min-h-[786px] transition-transform duration-300"
                                style={{ backgroundColor: card.bgColor, color: card.textColor }}>
                                <img src={card.imgSrc} alt={card.title} className="min-h-[280px] w-full object-cover" />
                                <div className="p-4 flex flex-col justify-between flex-1 py-6">
                                    <div className='items-center flex flex-col'>
                                        <img src={card.iconSrc} alt='estrella' className='max-h-[30px] mb-6' />
                                        <h3 className="text-[22px] text-center uppercase tracking-widest mb-6">{card.title}</h3>
                                        <div
                                            className="text-[18px] font-textos text-center mt-2"
                                            dangerouslySetInnerHTML={{ __html: card.shortDescription }}
                                        />
                                    </div>
                                    <button
                                        className="mt-4 py-2 px-4 text-[18px] font-normal underline"
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
                        className="py-2 text-primary-default px-4 text-base font-normal uppercase underline text-[20px]"
                        style={{ textUnderlineOffset: '6px' }}
                        onClick={loadMoreCards}>
                        Ver todos los ciclos
                    </button>
                )}
                {visibleCards > 3 && (
                    <button
                        className="py-2 px-4 text-primary-default text-base font-normal uppercase underline text-[20px]"
                        style={{ textUnderlineOffset: '6px' }}
                        onClick={showLessCards}>
                        Ver menos
                    </button>
                )}
            </div>

            {/* Modal */}
            {selectedCard && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible && !isExiting ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div
                        className={`md:p-0 shadow-lg w-full h-[90vh] lg:h-auto overflow-auto max-w-xs sm:max-w-[44rem] md:max-w-[4xl] lg:max-w-4xl xl:max-w-6xl relative transform transition-transform duration-300 ${isVisible && !isExiting ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
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
                                <button
                                    className="absolute top-2 right-2 sm:top-4 sm:right-4 text-lg font-bold"
                                    style={{ color: selectedCard.textColor }}
                                    onClick={closeModal}
                                >
                                    &times;
                                </button>

                                <div style={{ color: selectedCard.textColor }}>
                                    <h4 className="font-semibold text-lg sm:text-xl">{selectedCard.popupContent.header}</h4>
                                    <p className="font-textos text-sm sm:text-base mb-4 italic">{selectedCard.popupContent.intro}</p>
                                    <h5 className="font-semibold text-lg sm:text-xl">{selectedCard.popupContent.question}</h5>

                                    <div
                                        className="font-textos text-sm sm:text-base"
                                        dangerouslySetInnerHTML={{ __html: selectedCard.popupContent.description }}
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-textos">
                                        {selectedCard.popupContent.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 pl-4"
                                            >
                                                <h4 className="text-lg sm:text-[28px] font-bold" style={{ color: selectedCard.textColor }}>
                                                    {item.number}
                                                </h4>
                                                <div
                                                    className="border-l-2 pl-4 flex-1"
                                                    style={{ borderColor: selectedCard.textColor }}
                                                >
                                                    <p className="font-textos text-sm sm:text-base">
                                                        <strong>{item.title}</strong> <br /> {item.content}
                                                    </p>
                                                </div>
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
