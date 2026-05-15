import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePrompts } from '../../context/PromptContext';
import {
  FileText, Heart, Megaphone, Palette, Code2, PenLine,
  Settings, ChevronLeft, ChevronRight, Menu, X,
} from 'lucide-react';
import { sidebarSpring, sidebarItemHover } from '../../animations/variants';

const NAV_ITEMS = [
  { key: 'all',       icon: FileText,  labelKey: 'sidebar.allPrompts' },
  { key: 'favorites', icon: Heart,     labelKey: 'sidebar.favorites'  },
  { key: 'marketing', icon: Megaphone, labelKey: 'sidebar.marketing'  },
  { key: 'design',    icon: Palette,   labelKey: 'sidebar.design'     },
  { key: 'coding',    icon: Code2,     labelKey: 'sidebar.coding'     },
  { key: 'writing',   icon: PenLine,   labelKey: 'sidebar.writing'    },
];

function NavItem({ item, isActive, isCollapsed, onSelect, isRTL }) {
  const { t } = useTranslation();

  return (
    <motion.button
      variants={sidebarItemHover}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: isCollapsed ? '12px' : '11px 14px',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        borderRadius: 12,
        background: isActive ? 'rgba(33,158,188,0.1)' : 'transparent',
        border: `1px solid ${isActive ? 'rgba(33,158,188,0.2)' : 'transparent'}`,
        cursor: 'pointer',
        outline: 'none',
        transition: 'background 0.2s, border 0.2s',
      }}
    >
      <item.icon
        size={19}
        style={{ color: isActive ? 'rgba(142,202,230,0.9)' : 'rgba(255,255,255,0.35)', flexShrink: 0 }}
      />
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              fontSize: '0.9rem',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              letterSpacing: '-0.01em',
            }}
          >
            {t(item.labelKey)}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function Sidebar() {
  const { i18n } = useTranslation();
  const { activeCategory, setActiveCategory, mobileMenuOpen, setMobileMenuOpen } = usePrompts();
  const [collapsed, setCollapsed] = useState(false);
  const isRTL = i18n.language === 'ar';
  const { t } = useTranslation();

  const SidebarInner = ({ isMobile = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '12px 10px' }}>
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.key}
            item={item}
            isActive={activeCategory === item.key}
            isCollapsed={!isMobile && collapsed}
            isRTL={isRTL}
            onSelect={() => { setActiveCategory(item.key); if (isMobile) setMobileMenuOpen(false); }}
          />
        ))}
      </nav>

    </div>
  );

  return (
    <>
      {/* Mobile drawer via Portal to escape CSS filters */}
      {createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  position: 'fixed', inset: 0, zIndex: 60,
                  background: 'rgba(4,8,15,0.7)',
                  backdropFilter: 'blur(4px)',
                }}
              />
              <motion.div
                initial={{ x: isRTL ? '100%' : '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: isRTL ? '100%' : '-100%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                style={{
                  position: 'fixed',
                  top: 0, bottom: 0,
                  [isRTL ? 'right' : 'left']: 0,
                  width: 280,
                  zIndex: 70,
                  background: 'rgba(7,13,23,0.98)',
                  borderRight: isRTL ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  borderLeft: isRTL ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  backdropFilter: 'blur(60px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px 12px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Menu
                  </span>
                  <button onClick={() => setMobileMenuOpen(false)} className="btn-icon" style={{ width: 32, height: 32 }}>
                    <X size={18} />
                  </button>
                </div>
                <SidebarInner isMobile />
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Desktop sidebar */}
      <motion.aside
        variants={sidebarSpring}
        animate={collapsed ? 'closed' : 'open'}
        style={{
          flexShrink: 0,
          background: 'rgba(255,255,255,0.022)',
          backdropFilter: 'blur(48px)',
          border: '1px solid rgba(255,255,255,0.055)',
          borderRadius: 22,
          position: 'sticky',
          top: 100,
          height: 'calc(100vh - 132px)',
          overflow: 'hidden',
          display: 'none',
          alignSelf: 'flex-start',
        }}
        className="lg:block"
      >
        {/* Collapse button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: 'absolute', top: 12,
            [isRTL ? 'left' : 'right']: 10,
            zIndex: 10,
            width: 28, height: 28, borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', outline: 'none',
          }}
        >
          {collapsed
            ? (isRTL ? <ChevronLeft size={14} color="rgba(255,255,255,0.4)" /> : <ChevronRight size={14} color="rgba(255,255,255,0.4)" />)
            : (isRTL ? <ChevronRight size={14} color="rgba(255,255,255,0.4)" /> : <ChevronLeft size={14} color="rgba(255,255,255,0.4)" />)
          }
        </motion.button>

        <div style={{ paddingTop: 44, height: '100%' }}>
          <SidebarInner />
        </div>
      </motion.aside>
    </>
  );
}
