import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Sparkles } from 'lucide-react';
import { backdropVariants, panelVariants } from '../../animations/variants';

const CATEGORIES = ['Marketing', 'Design', 'Coding', 'Writing'];

export function PromptModal({ isOpen, onClose, onSave, editingPrompt }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ title: '', content: '', category: '', tags: '' });

  useEffect(() => {
    if (editingPrompt) {
      setForm({
        title:    editingPrompt.title,
        content:  editingPrompt.content,
        category: editingPrompt.category,
        tags:     (editingPrompt.tags || []).join(', '),
      });
    } else {
      setForm({ title: '', content: '', category: '', tags: '' });
    }
  }, [editingPrompt, isOpen]);

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));
  const setCategory = cat => setForm(f => ({ ...f, category: cat }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.category) return;
    onSave({
      title:    form.title.trim(),
      content:  form.content.trim(),
      category: form.category,
      tags:     form.tags.split(',').map(s => s.trim()).filter(Boolean),
    });
    onClose();
  };

  // Shared label style
  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.32)',
    marginBottom: 8,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(4,8,15,0.7)',
              backdropFilter: 'blur(12px)',
            }}
          />

          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 620,
              background: 'rgba(10,16,28,0.96)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 26,
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* Inner top highlight */}
            <div style={{
              position: 'absolute', top: 0, left: 32, right: 32, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            }} />

            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '28px 32px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'linear-gradient(135deg, #219ebc, #8ecae6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Sparkles size={18} color="white" />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
                    {editingPrompt ? t('prompt.editPrompt') : t('prompt.addNew')}
                  </h2>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.32)', marginTop: 2 }}>
                    {editingPrompt ? 'Make changes to your prompt' : 'Add a new prompt to your library'}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.07)' }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                className="btn-icon"
                style={{ flexShrink: 0 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: '28px 32px 32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {/* Title */}
                <div>
                  <label style={labelStyle}>{t('prompt.title')}</label>
                  <input
                    className="input-base"
                    value={form.title}
                    onChange={set('title')}
                    placeholder={t('prompt.titlePlaceholder')}
                    required
                  />
                </div>

                {/* Content */}
                <div>
                  <label style={labelStyle}>{t('prompt.content')}</label>
                  <textarea
                    className="input-base"
                    value={form.content}
                    onChange={set('content')}
                    placeholder={t('prompt.contentPlaceholder')}
                    rows={6}
                    required
                    style={{ resize: 'vertical', minHeight: 120, lineHeight: 1.65 }}
                  />
                </div>

                {/* Category */}
                <div>
                  <label style={labelStyle}>{t('prompt.category')}</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {CATEGORIES.map(cat => (
                      <motion.button
                        key={cat}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setCategory(cat)}
                        style={{
                          padding: '8px 18px',
                          borderRadius: 10,
                          border: `1px solid ${form.category === cat ? 'rgba(33,158,188,0.35)' : 'rgba(255,255,255,0.07)'}`,
                          background: form.category === cat ? 'rgba(33,158,188,0.12)' : 'rgba(255,255,255,0.025)',
                          color: form.category === cat ? 'rgba(142,202,230,0.95)' : 'rgba(255,255,255,0.4)',
                          fontSize: '0.875rem',
                          fontWeight: form.category === cat ? 600 : 400,
                          cursor: 'pointer',
                          outline: 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        {t(`prompt.${cat.toLowerCase()}`)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label style={labelStyle}>{t('prompt.tags')}</label>
                  <input
                    className="input-base"
                    value={form.tags}
                    onChange={set('tags')}
                    placeholder={t('prompt.tagsPlaceholder')}
                  />
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex', gap: 10, marginTop: 32,
                paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.9375rem', padding: '13px 24px' }}
                >
                  {editingPrompt ? t('common.save') : t('common.add')}
                </motion.button>
                <motion.button
                  type="button"
                  className="btn-ghost"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ padding: '13px 24px', fontSize: '0.9375rem' }}
                >
                  {t('common.cancel')}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
