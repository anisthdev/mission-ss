// Framer Motion animation configurations

export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition
  }
};

export const slideInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition
  }
};

export const cardHover = {
  scale: 1.02,
  y: -5,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20
  }
};

export const buttonTap = {
  scale: 0.95,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 17
  }
};
