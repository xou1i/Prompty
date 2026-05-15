import { motion } from 'framer-motion';
import { pageVariants } from '../../animations/variants';
import { HeroSection }     from '../../components/landing/HeroSection';
import { FeaturesSection } from '../../components/landing/FeaturesSection';
import { StatsSection }    from '../../components/landing/StatsSection';
import { CTASection }      from '../../components/landing/CTASection';
import { Footer }          from '../../components/landing/Footer';

export default function LandingPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </motion.div>
  );
}
