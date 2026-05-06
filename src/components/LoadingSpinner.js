import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 40, label }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-8">
    <motion.div
      className="rounded-full border-4 border-blush-100 border-t-coral-500"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
    {label && <p className="text-sm text-ink-600">{label}</p>}
  </div>
);

export default LoadingSpinner;
