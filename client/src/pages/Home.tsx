import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal';
import CTASection from '@/components/CTASection';
import Timeline from '@/components/Timeline';
import HorizontalScroll from '@/components/HorizontalScroll';
import SkillOrbit from '@/components/SkillOrbit';
import StackingCards from '@/components/StackingCards';
import { Button } from '@/components/ui/button';
import { Code2, Smartphone, BarChart3, Database, Brain, Zap, ArrowRight, Mail, Github, Linkedin, Lightbulb, Rocket, Shield, Users, Cpu, Palette, Layers, Target, Sparkles } from 'lucide-react';

/**
 * Premium Portfolio Homepage
 * Design Philosophy: Cinematic Minimalism with Premium Micro-Interactions
 * - Hero Section: 3D gallery with floating frames
 * - Project Sections: Multiple card variants with unique animations
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
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <span className="text-xl font-bold text-gray-900">Portfolio</span>
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
      <section id="gallery" className="relative w-full pt-20">
        <HeroSection />
      </section>

      {/* Web Development Projects */}
      <section className="py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader
            icon={Code2}
            title="Web Development"
            subtitle="Cutting-edge web solutions built with modern technologies and best practices"
            accentColor="#0066FF"
            variant="default"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                {...project}
                index={index}
                variant={index === 0 ? 'default' : 'default'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Development Projects */}
      <section className="py-32 bg-gradient-to-b from-purple-50 to-white">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader
            icon={Smartphone}
            title="Mobile Applications"
            subtitle="Native and cross-platform mobile apps with exceptional user experiences"
            accentColor="#7C3AED"
            variant="centered"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mobileProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                {...project}
                index={index}
                variant="glassmorphic"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Accounting Systems */}
      <section className="py-32 bg-gradient-to-b from-white to-green-50">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader
            icon={BarChart3}
            title="Accounting Systems"
            subtitle="Comprehensive financial management solutions with advanced analytics"
            accentColor="#10B981"
            variant="split"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accountingProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                {...project}
                index={index}
                variant="minimal"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Custom ERP Systems */}
      <section className="py-32 bg-gradient-to-b from-amber-50 to-white">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader
            icon={Database}
            title="Custom ERP Solutions"
            subtitle="Enterprise resource planning systems tailored to your business needs"
            accentColor="#F59E0B"
            variant="default"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {erpProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                {...project}
                index={index}
                variant={index === 1 ? 'featured' : 'default'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI & Machine Learning */}
      <section className="py-32 bg-gradient-to-b from-white to-pink-50">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader
            icon={Brain}
            title="AI & Machine Learning"
            subtitle="Intelligent systems powered by advanced machine learning models"
            accentColor="#EC4899"
            variant="centered"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                {...project}
                index={index}
                variant="glassmorphic"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Automation & Integration */}
      <section className="py-32 bg-gradient-to-b from-orange-50 to-white">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeader
            icon={Zap}
            title="Automation & Integration"
            subtitle="Seamless workflow automation and system integration solutions"
            accentColor="#FF6B35"
            variant="split"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automationProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                {...project}
                index={index}
                variant="minimal"
              />
            ))}
          </div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-5xl font-bold text-gray-900 mb-6">About My Work</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  With over a decade of experience in digital transformation, I specialize in creating innovative solutions that drive business growth and operational excellence.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our team combines technical expertise with strategic thinking to deliver solutions that not only meet today's requirements but anticipate tomorrow's challenges.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <Code2 className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Web Development</h3>
                  <p className="text-sm text-gray-600">Modern, scalable web applications</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <Smartphone className="w-8 h-8 text-purple-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Mobile Apps</h3>
                  <p className="text-sm text-gray-600">Cross-platform mobile solutions</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <Database className="w-8 h-8 text-green-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">ERP Systems</h3>
                  <p className="text-sm text-gray-600">Enterprise solutions tailored to you</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <Brain className="w-8 h-8 text-pink-600 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">AI & ML</h3>
                  <p className="text-sm text-gray-600">Intelligent system solutions</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
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

      {/* Timeline Section */}
      <section className="py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="container max-w-7xl mx-auto px-6">
          <Timeline
            title="Our Journey"
            subtitle="Milestones and achievements in our professional development"
            items={[
              {
                year: '2021',
                title: 'Career Beginning',
                description: 'Began professional development career with focus on innovative solutions',
                color: '#0066FF',
                side: 'left',
              },
              {
                year: '2022',
                title: 'First Major Project',
                description: 'Delivered enterprise solution that transformed business operations',
                color: '#7C3AED',
                side: 'right',
              },
              {
                year: '2023',
                title: 'Expanded Services',
                description: 'Added AI and automation expertise to service portfolio',
                color: '#10B981',
                side: 'left',
              },
              {
                year: '2024',
                title: 'Global Recognition',
                description: 'Achieved international acclaim for innovative digital solutions',
                color: '#F59E0B',
                side: 'right',
              },
              {
                year: '2025',
                title: 'Future Vision',
                description: 'Pioneering next-generation technologies and digital transformation',
                color: '#EC4899',
                side: 'left',
              },
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="container max-w-7xl mx-auto px-6">
          <CTASection
            title="Ready to Transform Your Business?"
            subtitle="Let's collaborate to create innovative solutions that drive growth and excellence"
            primaryCTA={{ text: 'Start Your Project', href: '#contact' }}
            secondaryCTA={{ text: 'Learn More', href: '#about' }}
            variant="gradient"
            accentColor="#0066FF"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                <span className="font-bold text-lg">Portfolio</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Creating digital excellence through innovation, precision, and strategic thinking.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ERP Systems</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Solutions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Portfolio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
