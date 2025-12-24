import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { fadeInUp } from '../../utils/animations';

export default function PartnersStrip() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const partners = [
    {
      name: 'NABARD',
      logo: 'https://www.nabard.org/image/nabard_logo.png',
      fallback: '🏦'
    },
    {
      name: 'Government of India',
      logo: 'https://upload.wikimedia.org/wikipedia/en/4/41/Emblem_of_India.svg',
      fallback: '🇮🇳'
    },
    {
      name: 'Government of Odisha',
      logo: 'https://odisha.gov.in/documents/20143/21819/Odisha+logo.png',
      fallback: '🏛️'
    },
    {
      name: 'KVIC',
      logo: 'https://kvic.org.in/en/images/header-logo.png',
      fallback: '🧵'
    },
    {
      name: 'Ministry of MSME',
      logo: 'https://msme.gov.in/sites/default/files/logo_0.png',
      fallback: '🏢'
    },
    {
      name: 'Reserve Bank of India',
      logo: 'https://www.rbi.org.in/commonrbi/images/rbi_logo.png',
      fallback: '💰'
    },
    {
      name: 'National Health Mission',
      logo: 'https://nhm.gov.in/images/nhm_logo.png',
      fallback: '⚕️'
    },
    {
      name: 'EDII',
      logo: 'https://www.ediindia.org/images/logo.png',
      fallback: '📚'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-sand-50 via-sand-100 to-sand-50 dark:from-[rgb(var(--dark-bg-primary))] dark:via-[rgb(var(--dark-bg-secondary))] dark:to-[rgb(var(--dark-bg-primary))] border-y-2 border-sand-200/50 dark:border-[rgb(var(--dark-border))] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-hope-200/20 to-transparent dark:from-hope-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-nurture-200/20 to-transparent dark:from-nurture-400/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          subtitle={t('partners.badge')}
          title={t('partners.heading')}
          centered
          className="mb-12"
        />

        {/* Partners Grid */}
        <div className="mb-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative group cursor-pointer"
                title={partner.name}
              >
                <div className="flex items-center justify-center p-6 rounded-xl min-h-[140px]
                           bg-white dark:bg-[rgb(var(--dark-bg-secondary))]
                           border-2 border-sand-200/70 dark:border-[rgb(var(--dark-border))]
                           hover:border-hope-400 dark:hover:border-[rgb(var(--dark-accent-hope))]
                           shadow-lg hover:shadow-xl
                           transition-all duration-300
                           overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-hope-50/50 to-transparent dark:from-hope-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex flex-col items-center justify-center gap-2">
                    {/* Logo */}
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 w-auto max-w-[100px] object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {/* Fallback text */}
                    <span className="text-sm text-center font-semibold text-gray-700 dark:text-[rgb(var(--dark-text-secondary))] group-hover:text-hope-600 dark:group-hover:text-[rgb(var(--dark-accent-hope))] transition-colors">
                      {partner.name}
                    </span>
                  </div>
                </div>

                {/* Shadow layer */}
                <div className="absolute inset-0 -z-10 bg-hope-200/20 dark:bg-hope-900/10 blur-lg rounded-xl transform translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/partners')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
              bg-white dark:bg-[rgb(var(--dark-bg-secondary))]
              border-2 border-hope-400 dark:border-[rgb(var(--dark-accent-hope))]
              text-hope-600 dark:text-[rgb(var(--dark-accent-hope))]
              font-semibold hover:gap-3 hover:bg-hope-50 dark:hover:bg-[rgb(var(--dark-bg-tertiary))]
              shadow-lg hover:shadow-xl
              transition-all group"
          >
            {t('partners.viewAll')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div
            whileHover={{ y: -4 }}
            className="relative group text-center p-8 rounded-2xl
              bg-gradient-to-br from-hope-50 to-white dark:from-hope-900/20 dark:to-[rgb(var(--dark-bg-secondary))]
              border-2 border-hope-200 dark:border-hope-800/30
              shadow-xl hover:shadow-2xl
              transition-all duration-300">
            <div className="text-5xl font-bold font-mono text-hope-600 dark:text-[rgb(var(--dark-accent-hope))] mb-3">
              119
            </div>
            <div className="text-sm font-semibold text-gray-700 dark:text-[rgb(var(--dark-text-secondary))]">
              {t('partners.stats.government')}
            </div>
            {/* Decorative accent */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-hope-500 rounded-full shadow-lg" />
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="relative group text-center p-8 rounded-2xl
              bg-gradient-to-br from-nurture-50 to-white dark:from-nurture-900/20 dark:to-[rgb(var(--dark-bg-secondary))]
              border-2 border-nurture-200 dark:border-nurture-800/30
              shadow-xl hover:shadow-2xl
              transition-all duration-300">
            <div className="text-5xl font-bold font-mono text-nurture-600 dark:text-[rgb(var(--dark-accent-nurture))] mb-3">
              36
            </div>
            <div className="text-sm font-semibold text-gray-700 dark:text-[rgb(var(--dark-text-secondary))]">
              {t('partners.stats.foundation')}
            </div>
            {/* Decorative accent */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-nurture-500 rounded-full shadow-lg" />
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="relative group text-center p-8 rounded-2xl
              bg-gradient-to-br from-radiance-50 to-white dark:from-radiance-900/20 dark:to-[rgb(var(--dark-bg-secondary))]
              border-2 border-radiance-200 dark:border-radiance-800/30
              shadow-xl hover:shadow-2xl
              transition-all duration-300">
            <div className="text-5xl font-bold font-mono text-radiance-600 dark:text-[rgb(var(--dark-accent-radiance))] mb-3">
              17
            </div>
            <div className="text-sm font-semibold text-gray-700 dark:text-[rgb(var(--dark-text-secondary))]">
              {t('partners.stats.corporate')}
            </div>
            {/* Decorative accent */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-radiance-500 rounded-full shadow-lg" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
