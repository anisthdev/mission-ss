import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeading from '../common/SectionHeading';
import { featuredInitiatives } from '../../data/programsData';
import { fadeInUp } from '../../utils/animations';

export default function FeaturedInitiatives() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-white via-sand-50/30 to-white dark:from-[rgb(var(--dark-bg-primary))] dark:via-[rgb(var(--dark-bg-secondary))] dark:to-[rgb(var(--dark-bg-primary))] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-hope-100/10 dark:bg-hope-900/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-nurture-100/10 dark:bg-nurture-900/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          subtitle={t('initiatives.badge')}
          title={t('initiatives.heading')}
          centered
          className="mb-16"
        />

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredInitiatives.map((initiative, index) => (
            <motion.div
              key={initiative.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-sand-50 dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 overflow-hidden pb-6"
            >
              {/* Image - rounded top corners, smooth arch at bottom */}
              <div className="relative w-full overflow-hidden">
                <div className="relative" style={{
                  clipPath: 'polygon(0 0, 0 70%, 1% 73%, 2% 75%, 3% 77%, 4% 78%, 5% 79%, 10% 81%, 15% 82%, 20% 82.5%, 25% 83%, 30% 83%, 35% 83%, 40% 83%, 45% 83%, 50% 83%, 55% 83%, 60% 83%, 65% 83%, 70% 83%, 75% 82.5%, 80% 82.5%, 85% 82%, 90% 81%, 95% 79%, 96% 78%, 97% 77%, 98% 75%, 99% 73%, 100% 70%, 100% 0)',
                }}>
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700 rounded-t-3xl"
                  />
                </div>
              </div>

              {/* Content - Center Aligned */}
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                  {t(initiative.titleKey)}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  {t(initiative.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
