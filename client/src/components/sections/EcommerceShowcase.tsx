import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Star } from 'lucide-react';

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
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('[data-product]');

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.05,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
          },
        }
      );
    });

    // Magnetic effect on hover
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;

      items.forEach((item) => {
        const rect = (item as HTMLElement).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 150) {
          const angle = Math.atan2(distY, distX);
          const force = (150 - distance) / 150;

          gsap.to(item, {
            x: Math.cos(angle) * force * 30,
            y: Math.sin(angle) * force * 30,
            duration: 0.3,
          });
        } else {
          gsap.to(item, {
            x: 0,
            y: 0,
            duration: 0.3,
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          E-Commerce Solutions
        </h2>
        <p className="text-lg text-gray-600 mb-16">Complete online retail platforms with advanced features</p>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <div
              key={product.id}
              data-product={product.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              {/* Product Card */}
              <div
                className="relative p-6 rounded-2xl h-80 flex flex-col justify-between overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${product.color}20, ${product.color}05)`,
                  border: `2px solid ${product.color}30`,
                }}
              >
                {/* Background Animation */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${product.color}30, transparent)`,
                  }}
                ></div>

                {/* Top Section */}
                <div className="relative z-10">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                    style={{ backgroundColor: product.color }}
                  >
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Middle Section - Product Visual */}
                <div className="relative z-10 flex items-center justify-center h-24 group-hover:scale-110 transition-transform duration-300">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${product.color}25` }}
                  >
                    <ShoppingCart className="w-10 h-10" style={{ color: product.color }} />
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs text-gray-600">Starting at</div>
                      <div className="text-2xl font-bold text-gray-900">{product.price}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          style={{
                            fill: i < product.rating ? product.color : '#e5e7eb',
                            color: i < product.rating ? product.color : '#e5e7eb',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    className="w-full py-2 rounded-lg font-semibold text-white transition-all group-hover:shadow-lg"
                    style={{ backgroundColor: product.color }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcommerceShowcase;
