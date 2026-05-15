import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Heart, Copy, Pencil, Trash2, Check } from 'lucide-react';
import { cardHoverVariants } from '../../animations/variants';
import { truncate } from '../../lib/utils';

const CATEGORY_ACCENT = {
  Marketing: { bg: 'rgba(139,92,246,0.12)', color: 'rgba(196,181,253,0.8)',  border: 'rgba(139,92,246,0.2)'  },
  Design:    { bg: 'rgba(236,72,153,0.1)',  color: 'rgba(249,168,212,0.8)',  border: 'rgba(236,72,153,0.18)' },
  Coding:    { bg: 'rgba(6,182,212,0.1)',   color: 'rgba(103,232,249,0.8)',  border: 'rgba(6,182,212,0.18)'  },
  Writing:   { bg: 'rgba(245,158,11,0.1)',  color: 'rgba(252,211,77,0.75)',  border: 'rgba(245,158,11,0.18)' },
};

const DEFAULT_ACCENT = { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.1)' };

/* Small action icon button */
function IconAction({ icon: Icon, onClick, title, danger = false }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: danger ? 'rgba(248,113,113,0.1)' : 'rgba(255,255,255,0.07)' }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      title={title}
      style={{
        width: 32, height: 32, borderRadius: 9,
        background: 'transparent',
        border: '1px solid transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', outline: 'none',
        transition: 'all 0.18s ease',
      }}
    >
      <Icon size={14} color={danger ? 'rgba(248,113,113,0.65)' : 'rgba(255,255,255,0.35)'} />
    </motion.button>
  );
}

export function PromptCard({ prompt, onEdit, onDelete, onToggleFavorite, onCopy }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const accent = CATEGORY_ACCENT[prompt.category] || DEFAULT_ACCENT;

  const handleCopy = () => {
    onCopy(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.article
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      layout
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.055)',
        borderRadius: 20,
        padding: '26px 24px',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 220,
      }}
    >
      {/* Top inset highlight */}
      <div style={{
        position: 'absolute', top: 0, left: 24, right: 24, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
        <h3 style={{
          fontSize: '0.9375rem',
          fontWeight: 600,
          letterSpacing: '-0.015em',
          color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.35,
          flex: 1,
        }}>
          {prompt.title}
        </h3>

        {/* Favorite */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.88 }}
          onClick={() => onToggleFavorite(prompt.id)}
          style={{
            background: 'none', border: 'none',
            cursor: 'pointer', outline: 'none',
            padding: 4, flexShrink: 0,
          }}
        >
          <Heart
            size={17}
            style={{
              color: prompt.isFavorite ? 'rgba(248,113,113,0.9)' : 'rgba(255,255,255,0.2)',
              fill: prompt.isFavorite ? 'rgba(248,113,113,0.9)' : 'none',
              transition: 'all 0.2s',
            }}
          />
        </motion.button>
      </div>

      {/* Content preview */}
      <p style={{
        fontSize: '0.8125rem',
        color: 'rgba(255,255,255,0.32)',
        lineHeight: 1.7,
        flex: 1,
        marginBottom: 20,
      }}>
        {truncate(prompt.content, 130)}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Category badge */}
        <span style={{
          display: 'inline-block',
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.03em',
          padding: '4px 10px',
          borderRadius: 7,
          background: accent.bg,
          color: accent.color,
          border: `1px solid ${accent.border}`,
        }}>
          {prompt.category}
        </span>

        {/* Actions — appear on hover via CSS opacity trick via group */}
        <div style={{ display: 'flex', gap: 2 }}>
          <IconAction
            icon={copied ? Check : Copy}
            onClick={handleCopy}
            title={copied ? t('common.copied') : t('common.copy')}
          />
          <IconAction icon={Pencil} onClick={() => onEdit(prompt)} title={t('common.edit')} />
          <IconAction icon={Trash2} onClick={() => onDelete(prompt.id)} title={t('common.delete')} danger />
        </div>
      </div>
    </motion.article>
  );
}
