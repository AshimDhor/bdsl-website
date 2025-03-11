import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  url: string;
  alt: string;
}

const photos: Photo[] = [
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "Lab Team Working"
  },
  {
    url: "https://images.unsplash.com/photo-1581091226825-c6a89f4742a5",
    alt: "Research Discussion"
  }
];

export default function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % photos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((current) => (current + 1) % photos.length);
  const prev = () => setCurrentIndex((current) => (current - 1 + photos.length) % photos.length);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={photos[currentIndex].url}
          alt={photos[currentIndex].alt}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}