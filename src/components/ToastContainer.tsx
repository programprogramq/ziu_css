import { AnimatePresence, motion } from 'framer-motion';
import type { Toast } from './toastTypes';

const toastVariants = {
  initial: {
    opacity: 0,
    x: 48,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    x: 48,
    scale: 0.85,
    transition: {
      duration: 0.18,
    },
  },
};

export function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 999,
      }}
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              marginBottom: 8,
              background: '#111',
              color: '#fff',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}