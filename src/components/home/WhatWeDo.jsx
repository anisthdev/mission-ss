import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { fadeInUp } from '../../utils/animations';

export default function WhatWeDo() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const programs = [
    {
      id: 1,
      titleKey: 'programs.livelihood.title',
      descriptionKey: 'programs.livelihood.description',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
      slug: 'livelihood',
      gridClass: 'row-span-2'
    },
    {
      id: 2,
      titleKey: 'programs.women.title',
      descriptionKey: 'programs.women.description',
      image: 'https://images.unsplash.com/photo-1617450365226-9bf28c04e130?w=800&q=80',
      slug: 'women-empowerment',
      gridClass: 'row-span-1'
    },
    {
      id: 3,
      titleKey: 'programs.education.title',
      descriptionKey: 'programs.education.description',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      slug: 'education',
      gridClass: 'row-span-2'
    },
    {
      id: 4,
      titleKey: 'programs.health.title',
      descriptionKey: 'programs.health.description',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      slug: 'health',
      gridClass: 'row-span-1'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-nurture-500 to-nurture-600 dark:from-nurture-900 dark:to-nurture-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {t('programs.heading')}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('programs.subheading')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-max gap-4 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/programs/${program.slug}`)}
              className={`${program.gridClass} group flex flex-col bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 overflow-hidden`}
            >
              {/* Image with frame padding */}
              <div className="p-4 bg-gray-50 dark:bg-slate-700 flex-shrink-0 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-40 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between p-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-nurture-700 dark:text-white mb-2">
                    {t(program.titleKey)}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {t(program.descriptionKey)}
                  </p>
                </div>
                <div className="flex items-center text-nurture-600 dark:text-nurture-400 font-semibold text-sm group-hover:gap-3 gap-2 transition-all opacity-0 group-hover:opacity-100">
                  {t('programs.learnMore')}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/programs')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-nurture-600 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            {t('programs.exploreMore')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
