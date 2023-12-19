import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "100vh",
    scale: 0.8,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: "-100vh",
    scale: 1,
  },
};

const pageVariantsAboutPage = {
  initial: {
    opacity: 0,
    y: "100%",
    scale: 0.8,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: "-100%",
    scale: 1.2,
  },
};

const pageTransition = {
  duration: 0.6,
  type: "linear",
  ease: "anticipate",
};

const transition = (OgComponent) => {
  return () => (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <OgComponent />
      </motion.div>
    </>
  );
};

export default transition;
