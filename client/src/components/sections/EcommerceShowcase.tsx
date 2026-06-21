import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Star, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  color: string;
}

interface EcommerceShowcaseProps {
  products: Product[];
}

export const EcommerceShowcase: React.FC<EcommerceShowcaseProps> = ({ products }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('[data-product]');
      items?.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 60, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%' } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-black to-transparent" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <ShoppingCart className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-xs uppercase tracking-[0.2em] font-bold">E-Commerce</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Commerce <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Solutions</span>
          </h2>
          <p className="text-lg text-gray-400">Scalable headless commerce platforms</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} data-product className="group relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 h-full">
                {/* Product Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${product.color}20` }}
                  whileHover={{ scale: 1.15, rotate: -10 }}
                >
                  <ShoppingCart className="w-8 h-8" style={{ color: product.color }} />
                </motion.div>

                {/* Category Badge */}
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4"
                  style={{ backgroundColor: `${product.color}30` }}
                >
                  {product.category}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-black" style={{ color: product.color }}>{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${parseInt(product.price.replace(/[^0-9]/g, '')) * 2}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < product.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({product.rating}.0)</span>
                </div>

                {/* CTA */}
                <motion.button
                  className="w-full py-3 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all"
                  style={{
                    backgroundColor: `${product.color}20`,
                    color: product.color,
                    border: `1px solid ${product.color}30`,
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    View Details <ArrowUpRight className="w-4 h-4" />
                  </span>
                </motion.button>

                {/* Hover Glow */}
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ backgroundColor: product.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcommerceShowcase;
