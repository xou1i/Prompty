import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { staggerParent, staggerChild } from '../../animations/variants';

const stats = [
  { key: 'stat1', value: '12K+' },
  { key: 'stat2', value: '850K+' },
  { key: 'stat3', value: '40+' },
  { key: 'stat4', value: '2' },
];

export function StatsSection() {
  const { t } = useTranslation();

  return (
    <section style={{ padding: 'clamp(60px,9vw,120px) 0', position: 'relative' }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', marginBottom: 'clamp(48px,6vw,80px)' }} />

      <div className="layout-container">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
          }}
        >
          {stats.map(({ key, value }, i) => (
            <motion.div
              key={key}
              variants={staggerChild}
              className="surface-1"
              style={{
                borderRadius: 20,
                padding: 'clamp(24px, 3vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <span style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1,
              }}>
                {value}
              </span>
              <span style={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {t(`landing.${key}`)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
