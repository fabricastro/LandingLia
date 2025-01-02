import React, { useState, useEffect, useRef } from "react";
import prev from "../assets/images/prev-button.svg";
import next from "../assets/images/next-button.svg";
import curaduria from "../assets/images/botella-1.svg";
import eventos from "../assets/images/copa.svg";
import asesorias from "../assets/images/trigo.svg";
import encuentros from "../assets/images/libros.svg";
import membresia from "../assets/images/reina.svg";
import "./Slider.css";
const cards = [
  { title: "CURADURÍA", icon: curaduria, imageSize: "132px", backTitle: "CURADURÍA", description: "Con mi metodología personalizada te asesoro en la selección de vinos para restaurantes, bares, eventos, cavas privadas y maridajes. Mi objetivo es resaltar calidad, identidad y armonía." },
  { title: "EXPERIENCIAS", icon: eventos, imageSize: "120px", backTitle: "EXPERIENCIAS", description: "Degustaciones divertidas y sensoriales donde te invito a explorar el vino de una manera única. Un ambiente exclusivo y lleno de sorpresas, pensado para que disfrutes con todos los sentidos." },
  { title: "ASESORÍA", icon: asesorias, imageSize: "120px", backTitle: "ASESORÍA", description: "Te ayudo a capacitar a tu equipo para mejorar el servicio, aumentar las ventas y entender lo esencial sobre vinos y sommellerie. Todo lo que necesitás para que tu negocio brille." },
  { title: "ENCUENTROS", icon: encuentros, imageSize: "108px", backTitle: "ENCUENTROS", description: "Sesiones interactivas para aprender, compartir y descubrir lo último sobre el mundo del vino. Abierto a todos, desde aficionados hasta profesionales, siempre con un toque divertido." },
  { title: "MEMBRESÍA", icon: membresia, imageSize: "144px", backTitle: "MEMBRESÍA", description: "Accedé a degustaciones mensuales, selecciones especiales de etiquetas, contenido exclusivo y muchos más beneficios. Ideal para los que buscan algo único en su experiencia con el vino." },
];

const Slider = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    window.addEventListener("resize", updateSlidesToShow);
    updateSlidesToShow();

    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  const moveSlider = (index) => {
    const slider = sliderRef.current;
    if (slider) {
      const percentage = -(index * (100 / slidesToShow));
      slider.style.transform = `translateX(${percentage}%)`;
    }
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % (cards.length - slidesToShow + 1);
    moveSlider(newIndex);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + (cards.length - slidesToShow + 1)) % (cards.length - slidesToShow + 1);
    moveSlider(newIndex);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-[-1rem] lg:left-[-3rem] -translate-y-1/2 z-20 p-2"
      >
        <img src={prev.src} alt="Flecha izquierda" className="w-6 h-6 md:w-8 md:h-[50px] hover:scale-110 transition-transform" />
      </button>

      <div className="overflow-hidden">
        <div ref={sliderRef} className="flex transition-transform">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 p-4"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <div className="relative w-full aspect-square group perspective cursor-pointer">
                <div className="card-front absolute w-full h-full bg-primary-default text-white flex flex-col items-center justify-center pt-8 shadow-md backface-hidden transform transition-transform duration-700">
                  <div className="flex items-center justify-center text-center min-h-[150px]">
                    <img
                      className=""
                      src={card.icon.src}
                      alt={card.title}
                      style={{
                        height: card.imageSize || '80px',
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-center text-center min-h-[100px]">
                    <h3 className="text-lg sm:text-lg font-regular tracking-widest text-secondary-default">
                      {card.title}
                    </h3>
                  </div>
                </div>

                <div className="card-back absolute w-full h-full bg-secondary-claro flex flex-col items-center justify-center shadow-md backface-hidden transform rotate-y-180 transition-transform duration-700 group-hover:rotate-y-0 px-4 sm:px-6">
                  <h3 className="text-sm sm:text-lg font-regular uppercase text-secondary-oscuro tracking-widest">
                    {card.backTitle}
                  </h3>
                  <p className="text-[14px] sm:text-[18px] font-textos text-center mt-4 text-primary-default">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="absolute top-1/2 right-[-1rem] lg:right-[-3rem] -translate-y-1/2 z-20 p-2"
      >
        <img src={next.src} alt="Flecha derecha" className="w-6 h-6 md:w-8 md:h-[50px] hover:scale-110 transition-transform" />
      </button>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: cards.length - slidesToShow + 1 }).map((_, index) => (
          <button
            key={index}
            className={`dot w-2 h-2 md:w-3 md:h-3 rounded-full ${currentIndex === index ? "bg-secondary-default" : "bg-transparent"
              } border-secondary-default border-[1px] hover:bg-secondary-default transition-colors`}
            onClick={() => moveSlider(index)}
          ></button>
        ))}
      </div>
    </div>
  );

};



export default Slider;