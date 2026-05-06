import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 40, label, inline = false }) => {
  const spinner = (
    <motion.div
      className={inline ? 'rounded-full border-white/30 border-t-white' : 'rounded-full border-blush-100 border-t-coral-500'}
      style={{ width: size, height: size, borderWidth: size < 24 ? 2 : 4, borderStyle: 'solid' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );

  if (inline) return spinner;

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      {spinner}
      {label && <p className="text-sm text-ink-600">{label}</p>}
    </div>
  );
};

export default LoadingSpinner;
