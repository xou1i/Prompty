import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, Languages, Menu } from 'lucide-react';
import { usePrompts } from '../../context/PromptContext';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { mobileMenuOpen, setMobileMenuOpen } = usePrompts();

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 72,
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        backgroundColor: 'rgba(4, 8, 15, 0.6)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        className="layout-container h-full flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle — dashboard only */}
          {pathname === '/dashboard' && (
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden btn-icon"
              title="Menu"
            >
              <Menu size={22} color="rgba(255,255,255,0.7)" />
            </motion.button>
          )}

          {/* Logo */}
          <Link 
            to="#" 
            style={{ textDecoration: 'none', outline: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ opacity: 0.85 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ rotate: 90, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #219ebc, #8ecae6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Sparkles size={18} color="white" />
              </motion.div>
              <span style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: 'white',
              }}>
                {t('common.appName')}
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Desktop Right actions */}
        <div className="hidden md:flex items-center" style={{ gap: 8 }}>
          {[
            { to: '/', label: t('nav.home') },
            { to: '/dashboard', label: t('nav.dashboard') },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{ textDecoration: 'none', outline: 'none' }}>
              <motion.div
                whileHover={{ color: 'white' }}
                style={{
                  padding: '8px 16px',
                  borderRadius: 10,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: pathname === to ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.42)',
                  backgroundColor: pathname === to ? 'rgba(255,255,255,0.04)' : 'transparent',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
              >
                {label}
              </motion.div>
            </Link>
          ))}

          {/* Divider */}
          <div style={{
            width: 1, height: 20,
            background: 'rgba(255,255,255,0.08)',
            margin: '0 8px',
          }} />

          {/* Language */}
          <motion.button
            onClick={toggleLang}
            className="btn-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={t('nav.language')}
          >
            <Languages size={18} />
          </motion.button>

          {/* CTA — landing only */}
          {pathname === '/' && (
            <Link to="/dashboard" style={{ textDecoration: 'none', outline: 'none', marginLeft: 8 }}>
              <motion.div
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: '9px 22px', fontSize: '0.875rem', borderRadius: 11 }}
              >
                {t('landing.getStarted')}
              </motion.div>
            </Link>
          )}
        </div>

        {/* Mobile Right actions */}
        <div className="flex md:hidden items-center gap-2">
          {/* Language */}
          <motion.button
            onClick={toggleLang}
            className="btn-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ width: 36, height: 36 }}
          >
            <Languages size={18} />
          </motion.button>

          {/* CTA — landing only */}
          {pathname === '/' && (
            <Link to="/dashboard" style={{ textDecoration: 'none', outline: 'none' }}>
              <motion.div
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: 10 }}
              >
                {t('landing.getStarted')}
              </motion.div>
            </Link>
          )}

          {/* Dashboard specific mobile link (Back to home) */}
          {pathname === '/dashboard' && (
             <Link to="/" style={{ textDecoration: 'none', outline: 'none' }}>
               <motion.div
                 className="surface-2 surface-inset"
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 style={{ 
                   padding: '8px 14px', fontSize: '0.8rem', 
                   borderRadius: 10, fontWeight: 500,
                   color: 'rgba(255,255,255,0.7)',
                 }}
               >
                 {t('nav.home')}
               </motion.div>
             </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
