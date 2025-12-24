import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  className = ''
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="text-sm font-semibold tracking-wider uppercase text-hope-400 dark:text-[rgb(var(--dark-accent-hope))] mb-2"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        variants={fadeInUp}
        className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-600 dark:text-[rgb(var(--dark-text-primary))]"
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}
