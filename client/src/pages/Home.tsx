import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import CTASection from '@/components/CTASection';
import Timeline from '@/components/Timeline';
import HorizontalScroll from '@/components/HorizontalScroll';
import SkillOrbit from '@/components/SkillOrbit';
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

/**
 * Premium Portfolio Homepage
 * Design Philosophy: Cinematic Minimalism with Premium Micro-Interactions
 * - Hero Section: 3D gallery with floating frames
 * - 8 Unique Section Showcases: Each with distinct animations and interactions
 * - Scroll-driven cinematics with GSAP
 * - Professional gallery aesthetic with electric blue accents
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

const mobileProjects: PortfolioItem[] = [
  {
    id: 4,
    title: 'Fitness Tracking App',
    description: 'Cross-platform mobile app with real-time workout tracking and social features',
    category: 'Mobile Development',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/mobile-app-3d-hT6RRj9MLtiT93x7MjPGgt.webp',
    technologies: ['React Native', 'Firebase', 'Redux', 'Mapbox'],
    color: '#7C3AED',
  },
  {
    id: 5,
    title: 'Banking Mobile App',
    description: 'Secure banking application with biometric authentication and transaction management',
    category: 'Mobile Development',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/mobile-app-3d-hT6RRj9MLtiT93x7MjPGgt.webp',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Stripe'],
    color: '#7C3AED',
  },
  {
    id: 6,
    title: 'Social Media App',
    description: 'Feature-rich social platform with real-time messaging and media sharing capabilities',
    category: 'Mobile Development',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/mobile-app-3d-hT6RRj9MLtiT93x7MjPGgt.webp',
    technologies: ['React Native', 'Node.js', 'Socket.io', 'AWS'],
    color: '#7C3AED',
  },
];

const accountingProjects: PortfolioItem[] = [
  {
    id: 7,
    title: 'Accounting Management System',
    description: 'Comprehensive accounting solution with automated invoicing, expense tracking, and financial reports',
    category: 'Accounting System',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/accounting-system-3d-GrLhzDTj86m7PJjEZBL37j.webp',
    technologies: ['React', 'Python', 'PostgreSQL', 'Chart.js'],
    color: '#10B981',
  },
  {
    id: 8,
    title: 'Tax Compliance Software',
    description: 'Automated tax filing and compliance management with multi-jurisdiction support',
    category: 'Accounting System',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/accounting-system-3d-GrLhzDTj86m7PJjEZBL37j.webp',
    technologies: ['Vue.js', 'Node.js', 'MySQL', 'PDF.js'],
    color: '#10B981',
  },
  {
    id: 9,
    title: 'Financial Analytics Platform',
    description: 'Advanced analytics and forecasting tool for financial decision-making',
    category: 'Accounting System',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/accounting-system-3d-GrLhzDTj86m7PJjEZBL37j.webp',
    technologies: ['React', 'Python', 'Pandas', 'TensorFlow'],
    color: '#10B981',
  },
];

const erpProjects: PortfolioItem[] = [
  {
    id: 10,
    title: 'Enterprise ERP System',
    description: 'Full-featured ERP solution with modules for finance, HR, supply chain, and manufacturing',
    category: 'Custom ERP',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/custom-erp-3d-6T4vJNxoDDwwGiNtgc3HsT.webp',
    technologies: ['Angular', 'Java', 'Oracle DB', 'Microservices'],
    color: '#F59E0B',
  },
  {
    id: 11,
    title: 'Manufacturing MES',
    description: 'Manufacturing Execution System with real-time production monitoring and quality control',
    category: 'Custom ERP',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/custom-erp-3d-6T4vJNxoDDwwGiNtgc3HsT.webp',
    technologies: ['React', 'Python', 'PostgreSQL', 'IoT'],
    color: '#F59E0B',
  },
  {
    id: 12,
    title: 'Supply Chain Management',
    description: 'End-to-end supply chain visibility with demand forecasting and inventory optimization',
    category: 'Custom ERP',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/custom-erp-3d-6T4vJNxoDDwwGiNtgc3HsT.webp',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'ML'],
    color: '#F59E0B',
  },
];

const aiProjects: PortfolioItem[] = [
  {
    id: 13,
    title: 'AI-Powered Chatbot',
    description: 'Intelligent conversational AI with natural language processing and machine learning capabilities',
    category: 'AI/ML',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/ai-ml-3d-nZBons5H45cZHz3Sq66axw.webp',
    technologies: ['Python', 'TensorFlow', 'NLP', 'React'],
    color: '#EC4899',
  },
  {
    id: 14,
    title: 'Computer Vision System',
    description: 'Advanced image recognition and object detection for industrial quality control',
    category: 'AI/ML',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/ai-ml-3d-nZBons5H45cZHz3Sq66axw.webp',
    technologies: ['Python', 'OpenCV', 'PyTorch', 'YOLO'],
    color: '#EC4899',
  },
  {
    id: 15,
    title: 'Predictive Analytics Engine',
    description: 'Machine learning models for demand forecasting and customer behavior prediction',
    category: 'AI/ML',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/ai-ml-3d-nZBons5H45cZHz3Sq66axw.webp',
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'FastAPI'],
    color: '#EC4899',
  },
];

const automationProjects: PortfolioItem[] = [
  {
    id: 16,
    title: 'n8n Workflow Automation',
    description: 'Complex business process automation connecting multiple APIs and services seamlessly',
    category: 'Automation',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/n8n-automation-3d-6wQHzjG7MTp53YTKqD4Nbt.webp',
    technologies: ['n8n', 'Zapier', 'APIs', 'Node.js'],
    color: '#FF6B35',
  },
  {
    id: 17,
    title: 'RPA Solution',
    description: 'Robotic Process Automation for repetitive business tasks with high accuracy',
    category: 'Automation',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/n8n-automation-3d-6wQHzjG7MTp53YTKqD4Nbt.webp',
    technologies: ['UiPath', 'Python', 'Selenium', 'OCR'],
    color: '#FF6B35',
  },
  {
    id: 18,
    title: 'Data Pipeline Automation',
    description: 'ETL workflows for data integration, transformation, and loading across systems',
    category: 'Automation',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/n8n-automation-3d-6wQHzjG7MTp53YTKqD4Nbt.webp',
    technologies: ['Apache Airflow', 'Python', 'Kafka', 'Spark'],
    color: '#FF6B35',
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
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolling ? 'bg-black/80 backdrop-blur-xl border-b border-blue-500/20 py-4' : 'bg-transparent py-6'}`}>
        <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-2 h-8 bg-blue-600 rounded-full group-hover:scale-y-125 transition-transform"></div>
            <span className="text-2xl font-black text-white tracking-tighter">ORTECH</span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {['Gallery', 'Projects', 'About', 'Services'].map((item) => (
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

      {/* Hero Section with 3D Gallery */}
      <section id="gallery" className="relative w-full pt-20">
        <HeroSection />
      </section>

      {/* 1. Web Development - Parallax Layers */}
      <WebDevShowcase projects={webProjects} />

      {/* 2. Mobile Applications - Interactive Phone Mockups */}
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

      {/* 3. Accounting Systems - Data Stream Tables */}
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

      {/* 4. ERP Solutions - Isometric Diagram */}
      <ERPShowcase
        modules={[
          {
            id: 1,
            name: 'Inventory',
            description: 'Stock management',
            icon: <Database className="w-6 h-6" />,
            color: '#F59E0B',
            position: 'top-left',
          },
          {
            id: 2,
            name: 'Finance',
            description: 'Financial operations',
            icon: <Zap className="w-6 h-6" />,
            color: '#10B981',
            position: 'top-right',
          },
          {
            id: 3,
            name: 'HR',
            description: 'Human resources',
            icon: <Users className="w-6 h-6" />,
            color: '#0066FF',
            position: 'center',
          },
          {
            id: 4,
            name: 'Sales',
            description: 'Sales management',
            icon: <Rocket className="w-6 h-6" />,
            color: '#EC4899',
            position: 'bottom-left',
          },
          {
            id: 5,
            name: 'Analytics',
            description: 'Business intelligence',
            icon: <BarChart3 className="w-6 h-6" />,
            color: '#7C3AED',
            position: 'bottom-right',
          },
        ]}
      />

      {/* 5. AI & Machine Learning - Particle System */}
      <AIShowcase
        models={[
          {
            id: 1,
            name: 'Predictive Analytics',
            description: 'Forecast trends and patterns',
            accuracy: 94,
            color: '#EC4899',
          },
          {
            id: 2,
            name: 'NLP Engine',
            description: 'Natural language processing',
            accuracy: 91,
            color: '#0066FF',
          },
          {
            id: 3,
            name: 'Computer Vision',
            description: 'Image recognition & analysis',
            accuracy: 96,
            color: '#10B981',
          },
        ]}
      />

      {/* 6. E-commerce - Magnetic Product Grid */}
      <EcommerceShowcase
        products={[
          {
            id: 1,
            name: 'Premium Dashboard',
            category: 'SaaS',
            price: '$299/mo',
            rating: 5,
            color: '#0066FF',
          },
          {
            id: 2,
            name: 'Mobile App',
            category: 'Development',
            price: '$5K+',
            rating: 5,
            color: '#7C3AED',
          },
          {
            id: 3,
            name: 'Enterprise Suite',
            category: 'Enterprise',
            price: 'Custom',
            rating: 5,
            color: '#10B981',
          },
        ]}
      />

      {/* 7. Automation & Integration - Node Flow */}
      <AutomationShowcase
        flows={[
          {
            id: 1,
            name: 'Data Pipeline',
            color: '#FF6B35',
            steps: ['Extract', 'Transform', 'Validate', 'Load', 'Archive'],
          },
          {
            id: 2,
            name: 'Customer Workflow',
            color: '#0066FF',
            steps: ['Signup', 'Verify', 'Onboard', 'Activate', 'Monitor'],
          },
        ]}
      />

      {/* 8. Digital Transformation - Scanning Effect */}
      <DigitalShowcase
        services={[
          {
            id: 1,
            title: 'Cloud Migration',
            description: 'Seamless transition to cloud infrastructure',
            color: '#0066FF',
            features: ['Zero Downtime', 'Data Security', 'Cost Optimization'],
          },
          {
            id: 2,
            title: 'API Development',
            description: 'RESTful and GraphQL API solutions',
            color: '#7C3AED',
            features: ['Scalable', 'Documented', 'Secure'],
          },
          {
            id: 3,
            title: 'DevOps Pipeline',
            description: 'Automated CI/CD workflows',
            color: '#10B981',
            features: ['Continuous Integration', 'Automated Testing', 'Deployment'],
          },
          {
            id: 4,
            title: 'Cybersecurity',
            description: 'Enterprise-grade security solutions',
            color: '#F59E0B',
            features: ['Threat Detection', 'Compliance', 'Incident Response'],
          },
        ]}
      />

      {/* Timeline Section */}
      <section className="py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader
            icon={Lightbulb}
            title="Journey & Milestones"
            subtitle="Our evolution through key achievements and transformations"
            accentColor="#0066FF"
            variant="centered"
          />
          <Timeline
            items={[
              {
                year: '2021',
                title: 'Began Professional Development',
                description: 'Started professional development career with focus on web technologies',
                color: '#0066FF',
              },
              {
                year: '2022',
                title: 'First Major Project',
                description: 'Delivered enterprise solution for leading financial institution',
                color: '#7C3AED',
              },
              {
                year: '2023',
                title: 'Expanded Services',
                description: 'Added AI and Machine Learning expertise to service offerings',
                color: '#10B981',
              },
              {
                year: '2024',
                title: 'Global Recognition',
                description: 'Achieved recognition for innovative solutions and client success',
                color: '#F59E0B',
              },
              {
                year: '2025',
                title: 'Industry Leadership',
                description: 'Established as thought leader in digital transformation',
                color: '#EC4899',
              },
            ]}
          />
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section className="py-32 bg-white">
        <HorizontalScroll
          title="Featured Projects"
          subtitle="Explore our most impactful work and innovative solutions"
          items={[
            {
              id: '1',
              title: 'Analytics Dashboard',
              subtitle: 'Real-time Data Visualization',
              description: 'Advanced analytics platform with interactive charts, real-time data processing, and predictive insights',
              color: '#0066FF',
            },
            {
              id: '2',
              title: 'Mobile Banking',
              subtitle: 'Secure Financial Platform',
              description: 'Enterprise-grade mobile banking solution with biometric security, instant transfers, and portfolio management',
              color: '#7C3AED',
            },
            {
              id: '3',
              title: 'AI Assistant',
              subtitle: 'Intelligent Automation',
              description: 'Machine learning-powered assistant that learns user preferences and automates complex workflows',
              color: '#10B981',
            },
            {
              id: '4',
              title: 'Cloud Platform',
              subtitle: 'Infrastructure as Code',
              description: 'Scalable cloud infrastructure with automatic deployment, monitoring, and disaster recovery',
              color: '#F59E0B',
            },
          ]}
        />
      </section>

      {/* Skill Orbit Section */}
      <section className="py-32 bg-gradient-to-b from-blue-50 to-white">
        <SkillOrbit
          title="Technical Expertise"
          subtitle="Interactive skill visualization with proficiency levels"
          skills={[
            { name: 'React', icon: Code2, color: '#61DAFB', level: 95 },
            { name: 'TypeScript', icon: Cpu, color: '#3178C6', level: 90 },
            { name: 'Node.js', icon: Zap, color: '#68A063', level: 88 },
            { name: 'UI/UX Design', icon: Palette, color: '#FF6B6B', level: 92 },
            { name: 'Web Performance', icon: Rocket, color: '#FF9F1C', level: 87 },
            { name: 'Database Design', icon: Database, color: '#13C2C2', level: 85 },
            { name: 'Cloud Architecture', icon: Layers, color: '#9C27B0', level: 83 },
            { name: 'DevOps', icon: Target, color: '#FF6B35', level: 80 },
          ]}
        />
      </section>

      {/* Stacking Cards Section */}
      <section className="py-32 bg-white">
        <StackingCards
          title="Our Process"
          subtitle="Step-by-step approach to delivering excellence"
          cards={[
            {
              id: '1',
              title: 'Discovery & Strategy',
              description: 'We begin by understanding your business goals, target audience, and unique challenges to create a tailored strategy.',
              color: '#0066FF',
              details: [
                'Market research and competitor analysis',
                'User persona development',
                'Technical requirements assessment',
                'Project roadmap creation',
              ],
            },
            {
              id: '2',
              title: 'Design & Prototyping',
              description: 'Our design team creates stunning, user-centric interfaces with interactive prototypes for validation.',
              color: '#7C3AED',
              details: [
                'Wireframing and user flows',
                'High-fidelity mockups',
                'Interactive prototypes',
                'Design system documentation',
              ],
            },
            {
              id: '3',
              title: 'Development & Integration',
              description: 'Expert developers build scalable, performant solutions using cutting-edge technologies and best practices.',
              color: '#10B981',
              details: [
                'Full-stack development',
                'API integration',
                'Database optimization',
                'Security implementation',
              ],
            },
            {
              id: '4',
              title: 'Testing & Deployment',
              description: 'Rigorous testing ensures quality, performance, and reliability before launching to production.',
              color: '#F59E0B',
              details: [
                'QA testing and bug fixes',
                'Performance optimization',
                'Security audits',
                'Smooth deployment',
              ],
            },
            {
              id: '5',
              title: 'Support & Growth',
              description: 'Ongoing support, monitoring, and optimization to ensure your solution continues to deliver value.',
              color: '#EC4899',
              details: [
                '24/7 technical support',
                'Performance monitoring',
                'Regular updates',
                'Continuous improvement',
              ],
            },
          ]}
        />
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Let's Create Something Amazing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to transform your vision into reality? Let's collaborate to build solutions that drive growth and innovation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg flex items-center gap-2">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 text-lg border-2 border-gray-300 hover:border-gray-400"
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">Portfolio</h3>
              <p className="text-gray-400 text-sm">Crafting digital excellence through innovative design and development</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Solutions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cloud Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Portfolio. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
