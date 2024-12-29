import React, { useState, useRef, useEffect } from "react";

const ReviewSlider = () => {
  const reviews = [
    {
      name: "JOSE ALMERÍCH",
      text: "La experiencia fue muy especial. Se nota que fue dedicada, con muchos detalles y mucho amor. Hiciste la diferencia con esas sutilezas. Me emocioné. Quiero volver y vivirlo nuevamente con mis amigas.",
      rating: 5,
    },
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
      text: "La mejor degustación a la que fui. Un viaje sensorial que te da las herramientas para poder expresarte sobre lo que te provoca cada vino de manera muy simple! Conducido por Lía, una anfitriona increíble que trasmite una vibra hermosa, súper detallista y gran maestra para embarcarse en este mundo espectacular del vino.",
      rating: 5,
    },
    {
      name: "Cande Álvarez",
      text: "Ir a tu lugar es un mimo al alma. Se nota tu amor, pasión, dedicación, esfuerzo, superación y perfección. ¡Un lujo, una joyita!.",
      rating: 5,
    },
  ];

  const slidesToShow = 3; // Cantidad de slides visibles
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const totalSlides = reviews.length;

  const moveSlider = (index) => {
    const slider = sliderRef.current;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${(index * 100) / slidesToShow}%)`;
  };

  const handleNext = () => {
    if (currentIndex < totalSlides - slidesToShow) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Vuelve al inicio
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(totalSlides - slidesToShow); // Va al final ajustado a lo visible
    }
  };

  useEffect(() => {
    moveSlider(currentIndex);
  }, [currentIndex]);

  return (
    <section className="flex flex-col items-center py-24 bg-primary-default text-white" id="sensaciones">
      <h2 className="text-[60px] font-medium text-center mb-8 tracking-widest uppercase text-secondary-texto">Sus Experiencias</h2>
      <div className="relative w-full max-w-6xl">
        {/* Botón anterior */}
        <button
          className="absolute top-1/2 left-[-6rem] -translate-y-1/2 z-20 p-2"
          onClick={handlePrev}
        >
          <img src="./prev-button.svg" className="h-[60px]" alt="anterior" />
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
                className="flex-shrink-0 w-1/3 p-4"
              >
                <p className="italic text-[20px] mb-4 leading-relaxed text-center text-secondary-texto font-textos">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center justify-center mt-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <img src="./estrella.png" alt="estrella" className="h-4 mr-1" key={i} />
                  ))}
                </div>
                <p className="text-center mt-4 font-regular text-[20px] uppercase text-secondary-texto">
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Botón siguiente */}
        <button
          className="absolute top-1/2 right-[-6rem] -translate-y-1/2 z-20 p-2"
          onClick={handleNext}
        >
          <img src="./next-button.svg" className="h-[60px]" alt="siguiente" />
        </button>
      </div>
    </section>
  );
};

export default ReviewSlider;
