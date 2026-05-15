import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePrompts } from '../../context/PromptContext';

const FILTERS = [
  { key: 'all',       label: 'dashboard.filterAll'       },
  { key: 'marketing', label: 'dashboard.filterMarketing' },
  { key: 'design',    label: 'dashboard.filterDesign'    },
  { key: 'coding',    label: 'dashboard.filterCoding'    },
  { key: 'writing',   label: 'dashboard.filterWriting'   },
];

export function FilterTabs() {
  const { t } = useTranslation();
  const { activeCategory, setActiveCategory } = usePrompts();

  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        gap: 4,
        overflowX: 'auto',
        paddingBottom: 2,
      }}
    >
      {FILTERS.map(({ key, label }) => {
        const isActive = activeCategory === key;
        return (
          <motion.button
            key={key}
            role="tab"
            aria-selected={isActive}
            whileHover={{ scale: isActive ? 1 : 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveCategory(key)}
            style={{
              position: 'relative',
              padding: '8px 18px',
              borderRadius: 99,
              border: `1px solid ${isActive ? 'rgba(33,158,188,0.28)' : 'rgba(255,255,255,0.06)'}`,
              background: isActive ? 'rgba(33,158,188,0.1)' : 'transparent',
              cursor: 'pointer',
              outline: 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.22s',
              fontSize: '0.8125rem',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'rgba(142,202,230,0.95)' : 'rgba(255,255,255,0.4)',
              letterSpacing: '-0.005em',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="filterPill"
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 99,
                  background: 'rgba(33,158,188,0.08)',
                  border: '1px solid rgba(33,158,188,0.22)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{t(label)}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
