import type { Variants, Transition } from "framer-motion";

export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeInOutExpo: Transition["ease"] = [0.87, 0, 0.13, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
  mass: 0.8,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.6,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 1,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, willChange: "transform, opacity" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30, willChange: "transform, opacity" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.92, willChange: "transform, opacity" },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60, willChange: "transform, opacity" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60, willChange: "transform, opacity" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, willChange: "transform, opacity" },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const lineGrow: Variants = {
  hidden: { scaleX: 0, originX: 0, willChange: "transform" },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: easeOutExpo },
  },
};

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)", willChange: "transform, opacity, filter" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const fadeSlideDown: Variants = {
  hidden: { opacity: 0, y: -40, filter: "blur(4px)", willChange: "transform, opacity, filter" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const fadeSlideLeft: Variants = {
  hidden: { opacity: 0, x: 60, filter: "blur(4px)", willChange: "transform, opacity, filter" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const fadeSlideRight: Variants = {
  hidden: { opacity: 0, x: -60, filter: "blur(4px)", willChange: "transform, opacity, filter" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const scaleBlurIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)", willChange: "transform, opacity, filter" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: easeOutExpo },
  },
};

export const staggerReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};
