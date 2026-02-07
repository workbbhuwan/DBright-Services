export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

export const fadeInDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

export const fadeInLeft = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
};

export const fadeInRight = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};

export const staggerFast = {
    animate: {
        transition: {
            staggerChildren: 0.08
        }
    }
};
