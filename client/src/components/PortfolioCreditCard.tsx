import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '@/config';
import '../cinematic-enhancements.css';

export const PortfolioCreditCard: React.FC = () => {
  const { brandName, tagline, url } = PORTFOLIO_CONFIG;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full max-w-sm mx-auto overflow-hidden rounded-2xl cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
    >
      <div className="absolute inset-0 glass-morphism-dark rounded-2xl z-0" />

      <div className="absolute inset-0 rounded-2xl border border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-500 z-[1]" />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]"
        style={{
          boxShadow: '0 0 40px rgba(0,102,255,0.15), inset 0 0 40px rgba(0,102,255,0.05)',
        }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-7 bg-blue-600 rounded-full group-hover:scale-y-125 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white tracking-tighter">{brandName}</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-400/70">
              {tagline}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-mono text-blue-300/80 truncate flex-1">
            {url.replace(/^https?:\/\//, '')}
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>

        <motion.div
          className="mt-4 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
            Click to visit portfolio
          </span>
          <motion.span
            className="text-xs font-semibold text-blue-400 flex items-center gap-1"
            whileHover={{ x: 2 }}
          >
            Explore
            <ExternalLink className="w-3 h-3" />
          </motion.span>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-transparent"
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.a>
  );
};

export default PortfolioCreditCard;
