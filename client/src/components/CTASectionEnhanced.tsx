import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react';
import '../cinematic-enhancements.css';

/**
 * Enhanced CTA Section Component
 * Features:
 * - Glassmorphism design with aurora background
 * - Animated form inputs
 * - Social media links with hover effects
 * - Responsive layout
 * - Accessibility-first design
 */

export const CTASectionEnhanced: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const socialLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:contact@ortech.dev',
      color: '#EC4899',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com',
      color: '#0066FF',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      color: '#00A8E8',
    },
  ];

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 aurora-background pointer-events-none"></div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            Let's Create Something
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Extraordinary Together
            </motion.span>
          </h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Whether you have a project in mind or just want to explore possibilities,
            let's connect and bring your vision to life.
          </motion.p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          className="glass-morphism rounded-2xl p-8 md:p-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-semibold text-blue-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white/5 border border-blue-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-semibold text-blue-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-white/5 border border-blue-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </motion.div>

            {/* Message Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-semibold text-blue-300 mb-2">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-blue-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold uppercase tracking-widest rounded-lg hover:shadow-[0_0_30px_rgba(0,102,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              viewport={{ once: true }}
            >
              {isSubmitting ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block"
                >
                  ⟳
                </motion.span>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Success Message */}
            {submitSuccess && (
              <motion.div
                className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center font-semibold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                ✓ Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 rounded-full flex items-center justify-center border border-blue-500/30 hover:border-blue-500/60 transition-all"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.65 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: link.color }}
                />
                <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors relative z-10" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASectionEnhanced;
