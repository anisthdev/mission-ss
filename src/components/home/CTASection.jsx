import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Users, Briefcase, Heart } from 'lucide-react';
import Button from '../common/Button';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export default function CTASection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-hope-500 via-hope-600 to-hope-500 dark:from-[rgb(var(--dark-accent-hope))] dark:via-hope-600 dark:to-hope-500 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-heading font-bold mb-6"
          >
            {t('cta.heading')}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl mb-12 text-white/90"
          >
            {t('cta.description')}
          </motion.p>

          {/* Options */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
            >
              <Users size={40} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('cta.options.volunteer.title')}</h3>
              <p className="text-white/80 text-sm">
                {t('cta.options.volunteer.description')}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
            >
              <Briefcase size={40} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('cta.options.partner.title')}</h3>
              <p className="text-white/80 text-sm">
                {t('cta.options.partner.description')}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
            >
              <Heart size={40} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('cta.options.donate.title')}</h3>
              <p className="text-white/80 text-sm">
                {t('cta.options.donate.description')}
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/get-involved')}
              className="bg-white hover:bg-sand-100 text-hope-600 dark:text-slate-600 font-bold shadow-xl group"
            >
              {t('cta.cta')}
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
      />
    </section>
  );
}
