import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fadeInUp } from '../../utils/animations';
import AnimatedCounter from '../common/AnimatedCounter';

export default function ImpactStats() {
  const { t } = useTranslation();
  const bentoStats = [
    {
      numericValue: 165,
      suffix: 'K+',
      labelKey: 'impact.stats.families',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      gridClass: 'col-span-2 row-span-2' // Large
    },
    {
      numericValue: 22,
      suffix: '+',
      labelKey: 'impact.stats.years',
      badge: t('impact.badge'),
      image: 'https://images.unsplash.com/photo-1609252509229-364936a1d1a2?w=800&q=80',
      gridClass: 'col-span-1 row-span-1' // Small
    },
    {
      numericValue: 14375,
      labelKey: 'impact.stats.shgs',
      image: 'https://images.unsplash.com/photo-1617450365226-9bf28c04e130?w=800&q=80',
      gridClass: 'col-span-1 row-span-1' // Small
    },
    {
      numericValue: 22,
      prefix: '₹',
      suffix: ' Cr+',
      labelKey: 'impact.stats.funds',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
      gridClass: 'col-span-2 row-span-1' // Wide
    },
    {
      numericValue: 18,
      labelKey: 'impact.stats.districts',
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
      gridClass: 'col-span-1 row-span-1' // Small
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-sand-50 via-white to-sand-100 dark:from-[rgb(var(--dark-bg-primary))] dark:via-[rgb(var(--dark-bg-secondary))] dark:to-[rgb(var(--dark-bg-primary))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content with Text and Grid Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-saffron-100 dark:bg-saffron-900/30 text-saffron-600 dark:text-[rgb(var(--dark-accent-saffron))] text-sm font-semibold mb-4 w-fit">
              {t('impact.badge')}
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-indigo-900 dark:text-[rgb(var(--dark-text-primary))] mb-6">
              {t('impact.heading')}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {t('impact.description1')}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {t('impact.description2')}
            </p>
            <div>
              <button className="px-6 py-3 bg-saffron-500 hover:bg-saffron-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg">
                {t('impact.cta')}
              </button>
            </div>
          </motion.div>

          {/* Right: Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-3 auto-rows-[200px] gap-4">
              {bentoStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`${stat.gridClass} group relative overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={stat.image}
                      alt={stat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 dark:from-black/90 dark:via-black/70" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    {/* Badge if exists */}
                    {stat.badge && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                        {stat.badge}
                      </div>
                    )}

                    {/* Stat Value */}
                    <div className="text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg font-display-stats">
                      <AnimatedCounter
                        end={stat.numericValue}
                        duration={2.5}
                        prefix={stat.prefix || ''}
                        suffix={stat.suffix || ''}
                      />
                    </div>

                    {/* Stat Label */}
                    <div className="text-lg md:text-xl font-semibold text-white/90 drop-shadow-md">
                      {t(stat.labelKey)}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-saffron-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
