import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layers, Search, BarChart3, Globe } from 'lucide-react';
import { staggerParent, staggerChild } from '../../animations/variants';

const featureData = [
  { icon: Layers,   titleKey: 'landing.feature1Title', descKey: 'landing.feature1Desc', iconColor: 'rgba(142,202,230,0.7)' },
  { icon: Search,   titleKey: 'landing.feature2Title', descKey: 'landing.feature2Desc', iconColor: 'rgba(33,158,188,0.8)' },
  { icon: BarChart3,titleKey: 'landing.feature3Title', descKey: 'landing.feature3Desc', iconColor: 'rgba(255,183,3,0.7)' },
  { icon: Globe,    titleKey: 'landing.feature4Title', descKey: 'landing.feature4Desc', iconColor: 'rgba(74,222,128,0.7)' },
];

export function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section id="features" style={{ padding: 'clamp(80px,12vw,140px) 0', position: 'relative' }}>
      {/* Top rule */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', marginBottom: 'clamp(60px,8vw,100px)' }} />

      <div className="layout-container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(142,202,230,0.6)',
            marginBottom: 16,
          }}>
            {t('landing.features')}
          </p>
          <h2 className="t-display" style={{ color: 'rgba(255,255,255,0.92)', maxWidth: 520 }}>
            {t('landing.featuresSubtitle')}
          </h2>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {featureData.map(({ icon: Icon, titleKey, descKey, iconColor }, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="surface-2 surface-inset"
              style={{ borderRadius: 22, padding: '32px 28px', cursor: 'default', position: 'relative', overflow: 'hidden' }}
            >
              {/* Subtle top highlight on hover */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.025) 0%, transparent 50%)',
                borderRadius: 22,
                pointerEvents: 'none',
              }} />

              <div style={{
                width: 48, height: 48,
                borderRadius: 14,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 28,
              }}>
                <Icon size={22} color={iconColor} />
              </div>

              <h3 className="t-subheading" style={{ color: 'rgba(255,255,255,0.88)', marginBottom: 12 }}>
                {t(titleKey)}
              </h3>
              <p className="t-small" style={{ color: 'rgba(255,255,255,0.38)', lineHeight: 1.7 }}>
                {t(descKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
