import React, { useState } from 'react';
import HeroSectionEnhanced from '@/components/HeroSectionEnhanced';
import SectionHeaderEnhanced from '@/components/SectionHeaderEnhanced';
import CTASectionEnhanced from '@/components/CTASectionEnhanced';
import SkillOrbitEnhanced from '@/components/SkillOrbitEnhanced';
import ProjectCardEnhanced from '@/components/ProjectCardEnhanced';
import Timeline from '@/components/Timeline';
import HorizontalScroll from '@/components/HorizontalScroll';
import StackingCards from '@/components/StackingCards';
import WebDevShowcase from '@/components/sections/WebDevShowcase';
import MobileShowcase from '@/components/sections/MobileShowcase';
import AccountingShowcase from '@/components/sections/AccountingShowcase';
import ERPShowcase from '@/components/sections/ERPShowcase';
import AIShowcase from '@/components/sections/AIShowcase';
import EcommerceShowcase from '@/components/sections/EcommerceShowcase';
import AutomationShowcase from '@/components/sections/AutomationShowcase';
import DigitalShowcase from '@/components/sections/DigitalShowcase';
import { Button } from '@/components/ui/button';
import { Code2, Smartphone, BarChart3, Database, Brain, Zap, ArrowRight, Mail, Github, Linkedin, Lightbulb, Rocket, Shield, Users, Cpu, Palette, Layers, Target, Sparkles, ShoppingCart } from 'lucide-react';
import '../cinematic-enhancements.css';

/**
 * Premium Portfolio Homepage - Full Cinematic Edition
 * Fixed Props for all 15+ sections
 */

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  color: string;
}

const webProjects: PortfolioItem[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with real-time inventory, payment processing, and analytics dashboard',
    category: 'Web Development',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/web-development-3d-hM5vL8pML3bTVZ8fYK9NRS.webp',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    color: '#0066FF',
  },
  {
    id: 2,
    title: 'SaaS Dashboard',
    description: 'Enterprise-grade SaaS platform with multi-tenant architecture and real-time collaboration',
    category: 'Web Development',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/web-development-3d-hM5vL8pML3bTVZ8fYK9NRS.webp',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind'],
    color: '#0066FF',
  },
  {
    id: 3,
    title: 'Content Management System',
    description: 'Headless CMS with API-first architecture for seamless content delivery across channels',
    category: 'Web Development',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/web-development-3d-hM5vL8pML3bTVZ8fYK9NRS.webp',
    technologies: ['GraphQL', 'MongoDB', 'Express', 'React'],
    color: '#0066FF',
  },
];

export default function Home() {
  const [isScrolling, setIsScrolling] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolling ? 'bg-black/80 backdrop-blur-xl border-b border-blue-500/20 py-4' : 'bg-transparent py-6'}`}>
        <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-2 h-8 bg-blue-600 rounded-full group-hover:scale-y-125 transition-transform"></div>
            <span className="text-2xl font-black text-white tracking-tighter">ORTECH</span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {['Gallery', 'Projects', 'Skills', 'Services', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100/70 hover:text-blue-400 transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all hover:shadow-[0_0_20px_rgba(0,102,255,0.4)]">
              Get in Touch
            </button>
          </nav>
        </div>
      </header>

      {/* 1. Hero Section - Enhanced Cinematic */}
      <section id="gallery" className="relative w-full">
        <HeroSectionEnhanced />
      </section>

      {/* 2. Web Development Showcase */}
      <WebDevShowcase 
        projects={[
          { id: 1, title: 'E-Commerce Platform', description: 'Modern e-commerce solution', category: 'Web', color: '#0066FF', technologies: ['React', 'Node'] },
          { id: 2, title: 'SaaS Dashboard', description: 'Enterprise platform', category: 'Web', color: '#0066FF', technologies: ['Next.js', 'Supabase'] }
        ]} 
      />

      {/* 3. Mobile Applications Showcase */}
      <MobileShowcase
        apps={[
          {
            id: 1,
            name: 'FinanceApp Pro',
            description: 'Advanced mobile banking solution',
            features: ['Real-time Transactions', 'Biometric Auth', 'Analytics'],
            color: '#7C3AED',
            screens: 3,
          },
          {
            id: 2,
            name: 'ShopHub Mobile',
            description: 'E-commerce platform for iOS & Android',
            features: ['AR Try-on', 'One-Click Checkout', 'Live Chat'],
            color: '#0066FF',
            screens: 3,
          },
        ]}
      />

      {/* 4. Featured Projects - Enhanced Cards */}
      <section id="projects" className="py-24 px-6 bg-black relative">
        <div className="container max-w-7xl mx-auto">
          <SectionHeaderEnhanced 
            title="Strategic Solutions"
            subtitle="Case Studies"
            description="Deep dive into our most successful digital transformations and enterprise solutions."
            accentColor="#0066FF"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {webProjects.map((project) => (
              <ProjectCardEnhanced key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Accounting Systems Showcase */}
      <AccountingShowcase
        systems={[
          {
            id: 1,
            name: 'Financial Dashboard',
            description: 'Real-time financial reporting and analytics',
            color: '#10B981',
            features: ['Revenue Tracking', 'Expense Management', 'Tax Reports', 'Forecasting'],
            metrics: [
              { label: 'Total Revenue', value: '$2.5M' },
              { label: 'Operating Costs', value: '$850K' },
              { label: 'Net Profit', value: '$1.65M' },
              { label: 'Growth Rate', value: '+23%' },
            ],
          },
        ]}
      />

      {/* 6. ERP Solutions Showcase */}
      <ERPShowcase
        modules={[
          { id: 1, name: 'Inventory', description: 'Stock management', icon: <Database className="w-6 h-6" />, color: '#F59E0B', position: 'top-left' },
          { id: 2, name: 'Finance', description: 'Financial operations', icon: <Zap className="w-6 h-6" />, color: '#10B981', position: 'top-right' },
          { id: 3, name: 'HR', description: 'Human resources', icon: <Users className="w-6 h-6" />, color: '#0066FF', position: 'center' },
          { id: 4, name: 'Sales', description: 'Sales management', icon: <Rocket className="w-6 h-6" />, color: '#EC4899', position: 'bottom-left' },
          { id: 5, name: 'Analytics', description: 'Business intelligence', icon: <BarChart3 className="w-6 h-6" />, color: '#7C3AED', position: 'bottom-right' },
        ]}
      />

      {/* 7. AI & Machine Learning Showcase */}
      <AIShowcase
        models={[
          { id: 1, name: 'Predictive Analytics', description: 'Forecast trends and patterns', accuracy: 94, color: '#EC4899' },
          { id: 2, name: 'NLP Engine', description: 'Natural language processing', accuracy: 91, color: '#0066FF' },
          { id: 3, name: 'Computer Vision', description: 'Image recognition & analysis', accuracy: 96, color: '#10B981' },
        ]}
      />

      {/* 8. E-commerce Solutions Showcase */}
      <EcommerceShowcase
        products={[
          { id: 1, name: 'Global Storefront', category: 'Headless Commerce', price: '$2,500', rating: 5, color: '#0066FF' },
          { id: 2, name: 'Marketplace Hub', category: 'Multi-vendor', price: '$4,800', rating: 5, color: '#7C3AED' },
          { id: 3, name: 'B2B Portal', category: 'Enterprise', price: '$3,200', rating: 4, color: '#10B981' },
        ]}
      />

      {/* 9. Automation & n8n Showcase */}
      <AutomationShowcase
        flows={[
          { id: 1, name: 'Lead Automation', description: 'Automated sales funnel and CRM sync', color: '#FF6B35', steps: ['Capture', 'Qualify', 'Nurture', 'Convert', 'Analyze'] },
          { id: 2, name: 'Data Pipeline', description: 'Real-time ETL and data synchronization', color: '#0066FF', steps: ['Extract', 'Transform', 'Load', 'Validate'] },
        ]}
      />

      {/* 10. Digital Marketing Showcase */}
      <DigitalShowcase
        services={[
          { id: 1, title: 'Growth Hacking', description: 'Aggressive user acquisition strategies with data-driven optimization.', features: ['Viral Loops', 'A/B Testing', 'Conversion Optimization'], color: '#00D4FF' },
          { id: 2, title: 'Brand Identity', description: 'Strategic brand positioning and premium visual design systems.', features: ['Visual Language', 'Brand Strategy', 'Logo Design'], color: '#8B5CF6' },
        ]}
      />

      {/* 11. Technical Expertise - Enhanced 3D Orbit */}
      <section id="skills" className="bg-black relative">
        <SkillOrbitEnhanced />
      </section>

      {/* 12. Experience Timeline */}
      <section className="py-24 bg-black">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeaderEnhanced 
            title="Our Journey"
            subtitle="Milestones"
            description="A timeline of innovation, growth, and successful digital transformations."
            accentColor="#8B5CF6"
            align="center"
          />
          <Timeline 
            items={[
              { year: '2026', title: 'Global Expansion', description: 'Opened new offices in tech hubs across Europe and Asia, serving 200+ enterprise clients worldwide.', color: '#0066FF' },
              { year: '2025', title: 'AI Integration', description: 'Launched enterprise-grade AI solutions with predictive analytics, NLP, and computer vision capabilities.', color: '#7C3AED' },
              { year: '2024', title: 'Product Launch', description: 'Released flagship SaaS platform serving 50,000+ users with real-time collaboration and analytics.', color: '#10B981' },
              { year: '2023', title: 'Series A Funding', description: 'Secured $10M in Series A funding to accelerate growth and expand the engineering team.', color: '#F59E0B' },
              { year: '2022', title: 'Company Founded', description: 'Started with a vision for digital excellence, combining cutting-edge design with powerful technology.', color: '#EC4899' },
            ]}
          />
        </div>
      </section>

      {/* 13. Service Stack - Horizontal Scroll */}
      <section id="services" className="bg-black">
        <HorizontalScroll 
          items={[
            { title: 'Strategic Consulting', description: 'Digital roadmap planning', icon: <Lightbulb /> },
            { title: 'Full-Stack Dev', description: 'Scalable web applications', icon: <Code2 /> },
            { title: 'Mobile Innovation', description: 'Native & Hybrid solutions', icon: <Smartphone /> },
            { title: 'Cloud Architecture', description: 'Secure & reliable infra', icon: <Shield /> },
          ]}
        />
      </section>

      {/* 14. Value Propositions - Stacking Cards */}
      <section className="bg-black py-24">
        <StackingCards 
          cards={[
            { id: '1', title: 'Innovation First', description: 'We push boundaries with cutting-edge tech.', color: '#0066FF' },
            { id: '2', title: 'User Centric', description: 'Design that speaks to your audience.', color: '#7C3AED' },
            { id: '3', title: 'Scale Ready', description: 'Solutions built for future growth.', color: '#10B981' },
          ]}
        />
      </section>

      {/* 15. Contact Section - Enhanced CTA */}
      <section id="contact" className="bg-black relative">
        <CTASectionEnhanced />
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/5">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                <span className="text-2xl font-black text-white tracking-tighter">ORTECH</span>
              </div>
              <p className="text-gray-500 max-w-sm mb-8">
                Crafting digital excellence through innovative design and development. We transform visions into reality.
              </p>
              <div className="flex gap-4">
                {[Github, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>AI Solutions</li>
                <li>Automation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li>hello@ortech.digital</li>
                <li>+1 (555) 000-0000</li>
                <li>Silicon Valley, CA</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">
              © 2026 ORTECH Digital Innovation. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-600 text-xs">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
