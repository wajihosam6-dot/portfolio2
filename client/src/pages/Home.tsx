import React, { useState } from 'react';
import GalleryCanvas from '@/components/GalleryCanvas';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectShowcase from '@/components/ProjectShowcase';
import { Button } from '@/components/ui/button';
import { ChevronDown, Code2, Smartphone, BarChart3, Database, Brain, Zap } from 'lucide-react';

/**
 * Design Philosophy: Cinematic Minimalism
 * - Hero section with 3D gallery canvas
 * - Scroll-driven camera movement
 * - Professional gallery aesthetic with electric blue accents
 * - Multiple specialized project sections
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
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663780035759/HoFaYJ9BRNV8fUaSiyHs3Z/logo-icon-LXNzDpwEaddB6wdAjqbhzt.webp"
              alt="Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Portfolio
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#gallery" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Gallery
            </a>
            <a href="#projects" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Projects
            </a>
            <a href="#about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Contact</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section with 3D Gallery */}
      <section id="gallery" className="relative w-full h-screen pt-20">
        <GalleryCanvas />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Web Development Projects */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-8 h-8 text-blue-600" />
                <h2
                  className="text-5xl font-bold text-gray-900"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Web Development
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl">
                Cutting-edge web solutions built with modern technologies and best practices
              </p>
            </div>
          </ScrollReveal>
          <ProjectShowcase projects={webProjects} />
        </div>
      </section>

      {/* Mobile Development Projects */}
      <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
        <div className="container max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-8 h-8 text-purple-600" />
                <h2
                  className="text-5xl font-bold text-gray-900"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Mobile Applications
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl">
                Native and cross-platform mobile apps with exceptional user experiences
              </p>
            </div>
          </ScrollReveal>
          <ProjectShowcase projects={mobileProjects} />
        </div>
      </section>

      {/* Accounting Systems */}
      <section className="py-24 bg-gradient-to-b from-white to-green-50">
        <div className="container max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
                <h2
                  className="text-5xl font-bold text-gray-900"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Accounting Systems
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl">
                Comprehensive financial management solutions with advanced analytics
              </p>
            </div>
          </ScrollReveal>
          <ProjectShowcase projects={accountingProjects} />
        </div>
      </section>

      {/* Custom ERP Systems */}
      <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="container max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-8 h-8 text-amber-600" />
                <h2
                  className="text-5xl font-bold text-gray-900"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Custom ERP Solutions
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl">
                Enterprise resource planning systems tailored to your business needs
              </p>
            </div>
          </ScrollReveal>
          <ProjectShowcase projects={erpProjects} />
        </div>
      </section>

      {/* AI & Machine Learning */}
      <section className="py-24 bg-gradient-to-b from-white to-pink-50">
        <div className="container max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-8 h-8 text-pink-600" />
                <h2
                  className="text-5xl font-bold text-gray-900"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  AI & Machine Learning
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl">
                Intelligent systems powered by advanced machine learning models
              </p>
            </div>
          </ScrollReveal>
          <ProjectShowcase projects={aiProjects} />
        </div>
      </section>

      {/* Automation & Integration */}
      <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="container max-w-7xl mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
                <h2
                  className="text-5xl font-bold text-gray-900"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Automation & Integration
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl">
                Streamline operations with intelligent workflow automation and API integrations
              </p>
            </div>
          </ScrollReveal>
          <ProjectShowcase projects={automationProjects} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2
                  className="text-5xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  About My Work
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  I specialize in creating immersive digital experiences that blend cutting-edge technology with thoughtful design. Each project is an opportunity to push boundaries and deliver exceptional results.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  My approach combines strategic thinking, creative problem-solving, and meticulous attention to detail to transform visions into compelling realities.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base">
                  Let's Work Together
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-blue-600 mb-4">50+</div>
                    <p className="text-gray-700 font-semibold">Projects Delivered</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Portfolio</h3>
              <p className="text-sm text-gray-400">Cinematic 3D Gallery Experience</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Social</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <p className="text-sm text-gray-400">hello@portfolio.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Cinematic Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
