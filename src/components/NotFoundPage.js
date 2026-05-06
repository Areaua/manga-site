import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-coral-100 via-blush-50 to-violet-100">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-coral-300/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] rounded-full bg-violet-300/40 blur-3xl pointer-events-none" />

      <motion.div
        className="relative max-w-2xl mx-4 bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 p-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.p
          className="text-8xl font-extrabold bg-gradient-to-r from-coral-500 to-violet-500 bg-clip-text text-transparent leading-none mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
        </motion.p>

        <h1 className="text-3xl font-bold text-ink-900 mb-3">Page Not Found</h1>
        <p className="text-lg text-ink-600 max-w-md mx-auto mb-8">
          This chapter doesn't exist in our library yet. Maybe it's still being written?
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 py-3 px-8 rounded-full bg-gradient-to-r from-coral-500 to-violet-500 text-white font-semibold hover:from-coral-600 hover:to-violet-600 transition-all hover:scale-105 shadow-md"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 py-3 px-8 rounded-full bg-white border-2 border-coral-200 text-coral-600 font-semibold hover:border-coral-400 transition-all hover:scale-105"
          >
            <BookOpen size={18} />
            Browse Manga
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
