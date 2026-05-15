// =========================================
// MOTION SYSTEM — PROMPTY
// Philosophy: slow, cinematic, intentional
// =========================================

const ease = [0.16, 1, 0.3, 1]; // Custom cubic bezier — elegant deceleration

// Page-level transitions
export const pageVariants = {
  initial: { opacity: 0, filter: 'blur(12px)' },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease },
  },
  exit: {
    opacity: 0,
    filter: 'blur(8px)',
    transition: { duration: 0.45, ease: 'easeInOut' },
  },
};

// Section reveal on scroll
export const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

// Stagger parent container
export const staggerParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

// Stagger child item
export const staggerChild = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

// Scale in for icons/badges
export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

// Modal backdrop
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit:   { opacity: 0, transition: { duration: 0.35 } },
};

// Modal panel — spring-based
export const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 22,
      mass: 0.9,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    transition: { duration: 0.28, ease: 'easeInOut' },
  },
};

// Card hover — soft lift
export const cardHoverVariants = {
  rest: {
    y: 0,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  hover: {
    y: -5,
    boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

// Sidebar spring
export const sidebarSpring = {
  open:   { width: 270, transition: { type: 'spring', stiffness: 85, damping: 20 } },
  closed: { width: 82,  transition: { type: 'spring', stiffness: 85, damping: 20 } },
};

// Toast notification
export const toastVariants = {
  initial: { opacity: 0, x: 32, scale: 0.95 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
  exit: {
    opacity: 0,
    x: 24,
    scale: 0.95,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
};

// Fade in from nothing
export const fadeVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
};

// Sidebar item hover
export const sidebarItemHover = {
  rest:  { x: 0,   transition: { duration: 0.2, ease: 'easeOut' } },
  hover: { x: 3,   transition: { duration: 0.2, ease: 'easeOut' } },
};
