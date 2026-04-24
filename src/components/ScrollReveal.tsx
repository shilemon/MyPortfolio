import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

const ScrollReveal = ({ children, direction = 'up', delay = 0 }: Props) => {
  const variants = {
    up:    { initial: { opacity: 0, y: 80 },    animate: { opacity: 1, y: 0 } },
    down:  { initial: { opacity: 0, y: -80 },   animate: { opacity: 1, y: 0 } },
    left:  { initial: { opacity: 0, x: -80 },   animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 80 },    animate: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      initial={variants[direction].initial}
      whileInView={variants[direction].animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;