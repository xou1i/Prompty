import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, FileSearch } from 'lucide-react';

import { pageVariants, staggerParent, staggerChild } from '../../animations/variants';
import { Sidebar }            from '../../components/dashboard/Sidebar';
import { SearchBar }          from '../../components/dashboard/SearchBar';
import { FilterTabs }         from '../../components/dashboard/FilterTabs';
import { AnalyticsWidgets }   from '../../components/dashboard/AnalyticsWidgets';
import { PromptCard }         from '../../components/dashboard/PromptCard';
import { PromptModal }        from '../../components/dashboard/PromptModal';

import { usePrompts }         from '../../context/PromptContext';
import { storageService }     from '../../services/storage';
import { defaultPrompts }     from '../../data/defaultPrompts';

export default function DashboardPage() {
  const { t } = useTranslation();
  const {
    prompts, addPrompt, updatePrompt, deletePrompt,
    toggleFavorite, copyPrompt, getFilteredPrompts, showToast,
  } = usePrompts();

  const [modalOpen,    setModalOpen]    = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);

  /* Seed on first visit */
  useEffect(() => {
    if (storageService.getPrompts().length === 0) {
      storageService.savePrompts(defaultPrompts);
      window.location.reload();
    }
  }, []);

  const filtered = getFilteredPrompts();

  const openNew  = ()     => { setEditingPrompt(null);   setModalOpen(true);  };
  const openEdit = (p)    => { setEditingPrompt(p);      setModalOpen(true);  };
  const closeModal = ()   => { setModalOpen(false);      setEditingPrompt(null); };

  const handleSave = data => {
    if (editingPrompt) {
      updatePrompt(editingPrompt.id, data);
      showToast(t('toast.promptUpdated'));
    } else {
      addPrompt(data);
      showToast(t('toast.promptAdded'));
    }
  };

  const handleDelete = id => {
    deletePrompt(id);
    showToast(t('toast.promptDeleted'));
  };

  const handleFavorite = id => {
    const p = prompts.find(x => x.id === id);
    toggleFavorite(id);
    showToast(p?.isFavorite ? t('toast.favoriteRemoved') : t('toast.favoriteAdded'));
  };

  const handleCopy = content => {
    copyPrompt(content);
    showToast(t('toast.promptCopied'));
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Main layout */}
      <main
        className="layout-container"
        style={{
          flex: 1,
          paddingTop: 100,
          paddingBottom: 80,
          display: 'flex',
          gap: 24,
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 40 }}>

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(142,202,230,0.55)',
                marginBottom: 6,
              }}>
                {t('common.tagline')}
              </p>
              <h1 className="t-heading" style={{ color: 'rgba(255,255,255,0.92)' }}>
                {t('dashboard.welcome')}
              </h1>
            </div>

            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={openNew}
              style={{ padding: '11px 24px', fontSize: '0.875rem', borderRadius: 13, flexShrink: 0 }}
            >
              <Plus size={17} />
              {t('dashboard.addPrompt')}
            </motion.button>
          </motion.div>

          {/* Analytics */}
          <AnalyticsWidgets />

          {/* Search + filter */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <SearchBar />
            <FilterTabs />
          </motion.div>

          {/* Prompts grid */}
          {filtered.length > 0 ? (
            <motion.div
              variants={staggerParent}
              initial="hidden"
              animate="visible"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 14,
              }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map(prompt => (
                  <motion.div
                    key={prompt.id}
                    variants={staggerChild}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <PromptCard
                      prompt={prompt}
                      onEdit={openEdit}
                      onDelete={handleDelete}
                      onToggleFavorite={handleFavorite}
                      onCopy={handleCopy}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '80px 0', gap: 16, textAlign: 'center',
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 20,
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FileSearch size={26} color="rgba(255,255,255,0.2)" />
              </div>
              <div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 4 }}>
                  No prompts found
                </p>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.25)' }}>
                  {t('dashboard.noPrompts')}
                </p>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <PromptModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        editingPrompt={editingPrompt}
      />
    </motion.div>
  );
}
