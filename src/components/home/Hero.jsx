import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { heroSlides } from '../../data/placeholders';

export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const slide = heroSlides[currentSlide];

  // Slide animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Image Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 35 },
            opacity: { duration: 0.5 }
          }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.tagline}
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 dark:from-black/90 dark:via-black/70 dark:to-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative h-full z-10 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="space-y-6"
              >
                {/* Organization name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-block px-5 py-2 rounded-full bg-saffron-500/20 dark:bg-saffron-400/20 border border-saffron-400/30 text-saffron-300 dark:text-saffron-200 text-sm font-semibold tracking-wide backdrop-blur-sm shadow-lg">
                    Hope Foundation • Engross, Enable, Empower
                  </span>
                </motion.div>

                {/* Tagline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight drop-shadow-2xl"
                >
                  {slide.tagline}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl text-gray-200 dark:text-gray-100 max-w-2xl leading-relaxed drop-shadow-lg"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Impact Stats - shown on all slides */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-8 pt-4"
                >
                  <div className="backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-xl px-6 py-4 border border-white/20 shadow-2xl">
                    <div className="text-4xl font-bold font-mono text-white">22+</div>
                    <div className="text-sm text-gray-200">Years of Impact</div>
                  </div>
                  <div className="backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-xl px-6 py-4 border border-white/20 shadow-2xl">
                    <div className="text-4xl font-bold font-mono text-white">165K+</div>
                    <div className="text-sm text-gray-200">Families Empowered</div>
                  </div>
                  <div className="backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-xl px-6 py-4 border border-white/20 shadow-2xl">
                    <div className="text-4xl font-bold font-mono text-white">12</div>
                    <div className="text-sm text-gray-200">Zones Reached</div>
                  </div>
                </motion.div>

                {/* CTAs - only on first slide */}
                {slide.showCTA && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => navigate('/impact')}
                      className="group shadow-2xl"
                    >
                      Explore Our Impact
                      <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate('/get-involved')}
                      className="border-white text-white hover:bg-white hover:text-indigo-900 shadow-2xl backdrop-blur-sm"
                    >
                      Get Involved
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between max-w-4xl">
            {/* Dots Navigation */}
            <div className="flex gap-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? 'w-12 h-3 bg-saffron-400 shadow-lg shadow-saffron-400/50'
                      : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Navigation */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="text-white" size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="text-white" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/80"
        >
          <span className="text-sm tracking-wider">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
