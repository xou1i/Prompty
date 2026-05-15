import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePrompts } from '../../context/PromptContext';
import { FileText, Heart, TrendingUp, Zap } from 'lucide-react';
import { staggerParent, staggerChild } from '../../animations/variants';

const WIDGETS = [
  { labelKey: 'dashboard.totalPrompts', icon: FileText, valueKey: 'total',            accent: 'rgba(33,158,188,0.6)'   },
  { labelKey: 'dashboard.favorites',    icon: Heart,     valueKey: 'favorites',        accent: 'rgba(248,113,113,0.6)'  },
  { labelKey: 'dashboard.mostUsed',     icon: TrendingUp,valueKey: 'mostUsedCategory', accent: 'rgba(255,183,3,0.6)'    },
  { labelKey: 'dashboard.weeklyActivity',icon: Zap,      valueKey: 'weeklyActivity',   accent: 'rgba(74,222,128,0.6)'   },
];

export function AnalyticsWidgets() {
  const { t } = useTranslation();
  const { getAnalytics } = usePrompts();
  const data = getAnalytics();

  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      animate="visible"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: 14,
      }}
    >
      {WIDGETS.map(({ labelKey, icon: Icon, valueKey, accent }) => (
        <motion.div
          key={labelKey}
          variants={staggerChild}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.055)',
            borderRadius: 18,
            padding: '24px 22px',
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top highlight for depth */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          }} />

          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20,
          }}>
            <Icon size={17} color={accent} />
          </div>

          <div style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 4,
            lineHeight: 1,
          }}>
            {data[valueKey]}
          </div>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.32)',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
          }}>
            {t(labelKey)}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
