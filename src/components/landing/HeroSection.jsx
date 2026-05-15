import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, Copy, Heart } from 'lucide-react';
import { staggerParent, staggerChild, scaleReveal } from '../../animations/variants';

/* Small mock prompt card for the floating preview */
function PreviewCard({ title, tag, tagColor, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(40px)',
        borderRadius: 18,
        padding: '20px 22px',
        minWidth: 220,
      }}
    >
      <div style={{
        fontSize: '0.8125rem',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 8,
        letterSpacing: '-0.01em',
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.35)',
        marginBottom: 14,
        lineHeight: 1.6,
      }}>
        Write a comprehensive, SEO-optimized post...
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: 6,
          background: tagColor,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.02em',
        }}>
          {tag}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Copy size={12} color="rgba(255,255,255,0.35)" />
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Heart size={12} color="rgba(255,255,255,0.35)" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* Floating analytics widget */
function StatPill({ label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(40px)',
        borderRadius: 12,
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={{ fontSize: '1rem', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
        {value}
      </span>
      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
        {label}
      </span>
    </motion.div>
  );
}

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 120,
        paddingBottom: 80,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle center radial */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(33,158,188,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="layout-narrow">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center' }}
        >
          {/* Eyebrow badge */}
          <motion.div variants={scaleReveal} style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              borderRadius: 99,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
            }}>
              <Sparkles size={13} color="rgba(255,183,3,0.8)" />
              <span style={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.01em',
              }}>
                {t('common.tagline')}
              </span>
            </div>
          </motion.div>

          {/* Hero heading */}
          <motion.h1 variants={staggerChild} className="t-hero" style={{ marginBottom: 28 }}>
            <span className="text-shine">{t('landing.heroTitle')}</span>
            <br />
            <span className="text-brand">{t('landing.heroTitleHighlight')}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={staggerChild}
            className="t-body"
            style={{
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 560,
              margin: '0 auto 52px',
            }}
          >
            {t('landing.heroSubtitle')}
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={staggerChild}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}
          >
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <motion.div
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('landing.getStarted')}
                <ArrowRight size={17} />
              </motion.div>
            </Link>
            <motion.button
              className="btn-ghost"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('landing.learnMore')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating UI Preview — below the text */}
      <div
        className="layout-container"
        style={{ marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
      >
        {/* Stat pills row */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 8 }}>
          <StatPill value="12K+" label="Users" delay={1.1} />
          <StatPill value="850K+" label="Prompts" delay={1.2} />
          <StatPill value="2" label="Languages" delay={1.3} />
        </div>

        {/* Preview cards */}
        <div
          style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: 780,
          }}
        >
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <PreviewCard title="SEO Blog Post Generator" tag="Marketing" tagColor="rgba(139,92,246,0.2)" delay={1.4} />
          </motion.div>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
            <PreviewCard title="React Component Builder" tag="Coding" tagColor="rgba(6,182,212,0.2)" delay={1.55} />
          </motion.div>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}>
            <PreviewCard title="Brand Identity Guidelines" tag="Design" tagColor="rgba(236,72,153,0.2)" delay={1.7} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
