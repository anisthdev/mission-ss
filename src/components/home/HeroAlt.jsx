import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RoughNotation } from "react-rough-notation";
import Button from "../common/Button";

export default function HeroAlt() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sand-50 via-white to-hope-50 dark:from-[rgb(var(--dark-bg-primary))] dark:via-[rgb(var(--dark-bg-secondary))] dark:to-[rgb(var(--dark-bg-tertiary))]">
      {/* SVG Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1.5" fill="#E07B39" />
              <circle cx="25" cy="25" r="1" fill="#3D8F7A" />
              <circle cx="75" cy="75" r="1" fill="#4A9B8C" />
              <path d="M25 50 L75 50" stroke="#E5A835" strokeWidth="0.5" opacity="0.3" />
              <path d="M50 25 L50 75" stroke="#E5A835" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-hope-200/20 dark:bg-hope-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-nurture-200/20 dark:bg-nurture-400/10 rounded-full blur-3xl" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:pr-12"
          >
            {/* Organization Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block px-5 py-2 rounded-full bg-hope-100 dark:bg-[rgb(var(--dark-bg-tertiary))] border border-hope-200 dark:border-[rgb(var(--dark-border))] text-hope-600 dark:text-[rgb(var(--dark-accent-hope))] text-sm font-semibold tracking-wide shadow-md">
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-slate-600 dark:text-[rgb(var(--dark-text-primary))] leading-tight">
                {t('hero.headline.part1')}{" "}
                <span className="relative inline-block">
                  <RoughNotation
                    type="underline"
                    show={true}
                    color="#E07B39"
                    strokeWidth={3}
                    animationDelay={1200}
                    animationDuration={800}
                  >
                    <span className="relative z-10 text-hope-500 dark:text-[rgb(var(--dark-accent-hope))]">
                      {t('hero.headline.families')}
                    </span>
                  </RoughNotation>
                </span>
                <br />
                {t('hero.headline.part2')}
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-700 dark:text-[rgb(var(--dark-text-secondary))] max-w-2xl leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/impact")}
                className="group shadow-xl"
              >
                {t('hero.cta')}
                <ArrowRight
                  className="inline-block ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/get-involved")}
                className="shadow-lg"
              >
                {t('hero.ctaSecondary')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Decorative background circle */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-[1100px] h-[1100px] lg:w-[1250px] lg:h-[1250px] xl:w-[1400px] xl:h-[1400px] rounded-full bg-gradient-to-br from-hope-200 to-nurture-200 dark:from-hope-900/20 dark:to-nurture-900/20 blur-3xl opacity-50" />
            </div>

            {/* Main Image */}
            <div className="relative z-10">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -15, 0],
                }}
                transition={{
                  scale: { duration: 0.8, delay: 0.5 },
                  opacity: { duration: 0.8, delay: 0.5 },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }
                }}
                src="/images/hero.png"
                alt="Student empowerment"
                className="max-h-[900px] lg:max-h-[1000px] xl:max-h-[1100px] w-auto object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500 dark:text-[rgb(var(--dark-text-muted))]"
        >
          <span className="text-sm tracking-wider">{t('hero.scroll')}</span>
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-[rgb(var(--dark-border))] rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gray-500 dark:bg-[rgb(var(--dark-text-muted))] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
