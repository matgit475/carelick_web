import * as React from "react";
import { motion, useInView } from "framer-motion";

type EaseFadeProps = {
  children: React.ReactElement;
  delay?: number;
};

const Animate = ({ children, delay = 0 }: EaseFadeProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default Animate;
