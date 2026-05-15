import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.04)',
      padding: 'clamp(48px,6vw,80px) 0',
    }}>
      <div
        className="layout-container"
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}
      >
        {/* Brand */}
        <div style={{ maxWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #219ebc, #8ecae6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={15} color="white" />
            </div>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.02em' }}>
              {t('common.appName')}
            </span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.28)', lineHeight: 1.7 }}>
            {t('landing.footer')}
          </p>
        </div>

        {/* Link cols */}
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,80px)', flexWrap: 'wrap' }}>
          {[
            { heading: t('landing.footerLinks'), links: [t('landing.privacy'), t('landing.terms'), t('landing.features')] },
            { heading: t('landing.footerCompany'), links: [t('landing.about'), t('landing.blog')] },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <p style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: 20,
              }}>
                {heading}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#" style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.38)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      outline: 'none',
                    }}
                      onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.38)'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="layout-container" style={{ marginTop: 48 }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 24 }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.18)' }}>
            © 2025 Prompty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
