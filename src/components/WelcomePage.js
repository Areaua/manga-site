import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Palette } from 'lucide-react';

const FEATURES = [
  { icon: Sparkles,  label: 'Free to use' },
  { icon: Palette,   label: 'Beautiful UI' },
  { icon: BookOpen,  label: 'Huge library' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const card = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-coral-100 via-blush-50 to-violet-100">

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-coral-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-violet-300/40 blur-3xl" />

      {/* Floating petals */}
      {[
        { top: '8%',  left: '6%',  size: 'text-3xl', delay: 0 },
        { top: '18%', right: '8%', size: 'text-2xl', delay: 0.4 },
        { top: '72%', left: '4%',  size: 'text-2xl', delay: 0.8 },
        { top: '80%', right: '6%', size: 'text-3xl', delay: 0.2 },
      ].map(({ top, left, right, size, delay }, i) => (
        <motion.span
          key={i}
          className={`pointer-events-none absolute ${size} opacity-40 select-none`}
          style={{ top, left, right }}
          animate={{ y: [0, -12, 0], rotate: [0, 15, -10, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          🌸
        </motion.span>
      ))}
      <motion.span
        className="pointer-events-none absolute top-[35%] right-[12%] text-4xl opacity-30 select-none"
        animate={{ y: [0, -8, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✨
      </motion.span>

      {/* Central card */}
      <motion.div
        className="relative z-10 w-full max-w-3xl mx-4 md:bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 p-10 md:p-16 text-center"
        variants={card}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center gap-5">

          {/* Book emoji */}
          <motion.div variants={item} className="text-6xl select-none leading-none">📚</motion.div>

          {/* Logo */}
          <motion.h1
            variants={item}
            className="text-6xl font-extrabold bg-gradient-to-r from-coral-500 to-violet-500 bg-clip-text text-transparent leading-tight"
          >
            AniAria
          </motion.h1>

          {/* Heading */}
          <motion.h2
            variants={item}
            className="text-3xl md:text-4xl font-bold text-ink-900 leading-snug"
          >
            Your Manga Reading Companion
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-lg text-ink-600 max-w-xl"
          >
            Discover captivating stories and adventures from around the world.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex items-center gap-4 flex-wrap justify-center mt-2">
            <button
              onClick={() => navigate('/auth')}
              className="py-3 px-8 rounded-full bg-gradient-to-r from-coral-500 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="py-3 px-8 rounded-full bg-white border-2 border-coral-200 text-coral-600 font-semibold hover:border-coral-400 hover:shadow-md transition-all duration-200 active:scale-95"
            >
              Sign In
            </button>
          </motion.div>

          {/* Feature pills */}
          <motion.div variants={item} className="flex items-center gap-6 flex-wrap justify-center mt-1">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-sm text-ink-600">
                <Icon size={15} className="text-coral-400" />
                {label}
              </div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;