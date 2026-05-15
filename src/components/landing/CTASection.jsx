import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const { t } = useTranslation();

  return (
    <section style={{ padding: 'clamp(80px,10vw,140px) 0', position: 'relative' }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', marginBottom: 'clamp(60px,8vw,100px)' }} />

      <div className="layout-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', borderRadius: 32, overflow: 'hidden' }}
        >
          {/* Card background */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(2,48,71,0.6) 0%, rgba(4,8,15,0.8) 60%)',
            backdropFilter: 'blur(60px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }} />
          {/* Subtle brand glow */}
          <div style={{
            position: 'absolute', top: -100, right: -100,
            width: 400, height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(33,158,188,0.12) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'relative',
            padding: 'clamp(48px, 6vw, 80px) clamp(32px, 5vw, 72px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
            flexWrap: 'wrap',
          }}>
            <div style={{ maxWidth: 520 }}>
              <h2 className="t-display" style={{ color: 'rgba(255,255,255,0.92)', marginBottom: 16 }}>
                {t('landing.ctaTitle')}
              </h2>
              <p className="t-body" style={{ color: 'rgba(255,255,255,0.42)' }}>
                {t('landing.ctaDesc')}
              </p>
            </div>

            <Link to="/dashboard" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <motion.div
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ fontSize: '1rem', padding: '15px 36px', borderRadius: 14 }}
              >
                {t('landing.ctaButton')}
                <ArrowRight size={18} />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
