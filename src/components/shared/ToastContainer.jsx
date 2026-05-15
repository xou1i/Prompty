import { motion, AnimatePresence } from 'framer-motion';
import { usePrompts } from '../../context/PromptContext';
import { toastVariants } from '../../animations/variants';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function ToastContainer() {
  const { toasts } = usePrompts();

  return (
    <div
      className="fixed bottom-8 right-8 z-[200] flex flex-col gap-3 pointer-events-none"
      dir="ltr"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
            className="pointer-events-auto"
            style={{
              minWidth: 280,
              maxWidth: 400,
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(60px) saturate(200%)',
              WebkitBackdropFilter: 'blur(60px) saturate(200%)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 100,
              padding: '10px 24px 10px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
            }}
          >
            {/* Top inner highlight */}
            <div style={{
              position: 'absolute', top: 0, left: 30, right: 30, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            }} />

            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: toast.type === 'success' ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
              border: `1px solid ${toast.type === 'success' ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {toast.type === 'success'
                ? <CheckCircle2 size={18} style={{ color: '#4ade80' }} />
                : <AlertCircle  size={18} style={{ color: '#f87171' }} />
              }
            </div>
            <span style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: 'rgba(255,255,255,0.92)',
            }}>
              {toast.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
