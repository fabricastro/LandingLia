import React, { useState, useRef, useEffect } from "react";

const ReviewSlider = () => {
  const reviews = [
    {
      name: "JAZ VIVES",
      text: "Ya desde la entrada, no solo tu hermosa energía, sino la de tu hermoso espacio, el grupo y hasta la de los objetos. Tu manera de explicarnos cada cosita, cada detalle, la elección particular de los vinos, la experiencia sensorial, fue todo realmente sublime. Participaría de cada una de tus degus, de hecho quisiera hacerme vitalicia! No solo por el enorme caudal de info que manejás, sino por lo lindo que es escucharte y aprender de todo ese mundo hermoso.",
      rating: 5,
    },
    {
      name: "EMILIA CATANZARO",
      text: "Fue una experiencia súper original, enriquecedora y divertida. Desde el ambiente acogedor, cómodo, hasta el sabor único y distinto de cada vino. Me divertí y aprendí mucho. Los detalles hicieron que la experiencia se sintiera única y en todo momento sentí ganas de volver, ganas de saber más!",
      rating: 5,
    },
    {
      name: "Paula Valent",
      text: "La mejor degustación a la que fui. Un viaje sensorial que te da las herramientas para poder expresarte sobre lo que te provoca cada vino de manera muy simple! Conducido por Lía, una anfitriona increíble que trasmite una vibra hermosa, súper detallista y gran maestra para embarcarse en este mundo espectacular del vino.",
      rating: 5,
    },
    {
      name: "Michi Vatteroni",
      text: "Gracias Lía por una noche tan maravillosa. De sensaciones, de conectar, de aprender! Quiero la próxima URGENTE!",
      rating: 5,
    },
    {
      name: "Cande Álvarez",
      text: "Ir a tu lugar es un mimo al alma. Se nota tu amor, pasión, dedicación, esfuerzo, superación y perfección. ¡Un lujo, una joyita!.",
      rating: 5,
    },
    {
      name: "JOSE ALMERÍCH",
      text: "La experiencia fue muy especial. Se nota que fue dedicada, con muchos detalles y mucho amor. Hiciste la diferencia con esas sutilezas. Me emocioné. Quiero volver y vivirlo nuevamente con mis amigas.",
      rating: 5,
    },
  ];

  const [slidesToShow, setSlidesToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const totalSlides = reviews.length;

  // Ajusta el número de slides según el tamaño de pantalla
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
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${(index * 100) / slidesToShow}%)`;
  };

  // Control automático del slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < totalSlides - slidesToShow ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides, slidesToShow]);

  // Mueve el slider cuando cambia el índice
  useEffect(() => {
    moveSlider(currentIndex);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalSlides - slidesToShow ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : totalSlides - slidesToShow
    );
  };

  return (
    <section
      className="flex flex-col items-center py-24 bg-primary-default text-white"
      id="sensaciones"
    >
      <h2 className="md:text-[60px] text-[35px] font-medium text-center mb-8 tracking-widest uppercase text-secondary-texto">
        Sus Sensaciones
      </h2>
      <div className="relative w-full max-w-[1440px]">
        {/* Botón anterior */}
        <button
          className="absolute top-1/2 2xl:left-[-3rem] left-0 -translate-y-1/2 z-20 p-2"
          onClick={handlePrev}
        >
          <img src="./prev-button.svg" className="md:h-[60px] h-[30px]" alt="anterior" />
        </button>

        {/* Contenedor del slider */}
        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="slider-track flex transition-transform"
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 py-6 px-16"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <p className="italic text-[20px] mb-4 leading-relaxed text-center text-secondary-texto font-textos">
                  &quot;{review.text}&quot;
                </p>
                <p className="text-center mt-12 font-regular text-[20px] uppercase text-secondary-texto">
                  {review.name}
                </p>
                <div className="flex items-center justify-center mt-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <img
                      src="./estrella.png"
                      alt="estrella"
                      className="h-5 mr-1"
                      key={i}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón siguiente */}
        <button
          className="absolute top-1/2 2xl:right-[-3rem] right-0 -translate-y-1/2 z-20 p-2"
          onClick={handleNext}
        >
          <img src="./next-button.svg" className="md:h-[60px] h-[30px]" alt="siguiente" />
        </button>
      </div>
    </section>
  );
};

export default ReviewSlider;
