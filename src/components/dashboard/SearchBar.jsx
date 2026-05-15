import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePrompts } from '../../context/PromptContext';
import { Search, X } from 'lucide-react';

export function SearchBar() {
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery } = usePrompts();
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <motion.div
        animate={{
          boxShadow: focused
            ? '0 0 0 2px rgba(33,158,188,0.3), 0 8px 24px rgba(0,0,0,0.15)'
            : '0 1px 3px rgba(0,0,0,0.1)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: focused ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
          border: `1px solid ${focused ? 'rgba(33,158,188,0.35)' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: 14,
          gap: 0,
          transition: 'background 0.25s, border-color 0.25s',
        }}
      >
        <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center' }}>
          <Search size={17} style={{ color: focused ? 'rgba(33,158,188,0.8)' : 'rgba(255,255,255,0.28)', transition: 'color 0.25s' }} />
        </div>

        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={t('common.search')}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '14px 0',
            fontSize: '0.9375rem',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: 'inherit',
            letterSpacing: '-0.01em',
          }}
        />

        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={() => setSearchQuery('')}
              style={{
                width: 36, height: 36, marginRight: 8, borderRadius: 9,
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', outline: 'none',
                flexShrink: 0,
              }}
            >
              <X size={14} color="rgba(255,255,255,0.45)" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
