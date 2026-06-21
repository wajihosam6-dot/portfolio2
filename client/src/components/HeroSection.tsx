import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section Component - Premium 3D Portfolio Showcase
 * Design Philosophy: Cinematic Minimalism with 3D Gallery Aesthetic
 * Inspired by: ORTECH Portfolio Design
 * - Floating portfolio frames in 3D space
 * - Professional gallery lighting with blue accent lights
 * - Smooth scroll-driven camera movement
 * - Responsive and performant Three.js implementation
 */

interface HeroSectionProps {
  onSceneReady?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSceneReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | undefined>(undefined);
  const framesRef = useRef<THREE.Group[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // ===== SCENE SETUP =====
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 40, 60);
    sceneRef.current = scene;

    // ===== CAMERA SETUP =====
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 2, 8);
    cameraRef.current = camera;

    // ===== RENDERER SETUP =====
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ===== PROFESSIONAL LIGHTING SETUP =====
    // Ambient light - soft base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Main directional light - gallery lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 12, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.far = 60;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);

    // Electric blue accent lights (matching ORTECH brand)
    const blueLight1 = new THREE.PointLight(0x0066FF, 0.8);
    blueLight1.position.set(-10, 5, 5);
    scene.add(blueLight1);

    const blueLight2 = new THREE.PointLight(0x0066FF, 0.5);
    blueLight2.position.set(10, 5, -5);
    scene.add(blueLight2);

    // Subtle fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-8, 3, -10);
    scene.add(fillLight);

    // ===== GALLERY ENVIRONMENT SETUP =====
    // Back wall
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xfafafa,
      roughness: 0.3,
      metalness: 0.05,
    });

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 18), wallMaterial);
    backWall.position.z = -8;
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left wall
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 18), wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -15;
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 18), wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = 15;
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Floor
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      roughness: 0.4,
      metalness: 0.02,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 16), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);

    // ===== CREATE FLOATING PORTFOLIO FRAMES =====
    const framePositions = [
      { x: -8, y: 2.5, z: -1 },
      { x: 0, y: 2.5, z: -1 },
      { x: 8, y: 2.5, z: -1 },
    ];

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      roughness: 0.15,
      metalness: 0.5,
    });

    const innerFrameMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.3,
    });

    framePositions.forEach((pos, index) => {
      // Create frame group
      const frameGroup = new THREE.Group();
      frameGroup.position.set(pos.x, pos.y, pos.z);
      (frameGroup as any).originalY = pos.y;
      (frameGroup as any).originalZ = pos.z;
      (frameGroup as any).index = index;

      // Outer frame (border)
      const outerFrame = new THREE.Mesh(new THREE.BoxGeometry(3.8, 5, 0.08), frameMaterial);
      outerFrame.position.z = -0.1;
      outerFrame.castShadow = true;
      outerFrame.receiveShadow = true;
      frameGroup.add(outerFrame);

      // Inner frame (content area)
      const innerFrame = new THREE.Mesh(new THREE.BoxGeometry(3.6, 4.8, 0.15), innerFrameMaterial);
      innerFrame.castShadow = true;
      innerFrame.receiveShadow = true;
      frameGroup.add(innerFrame);

      // Add subtle blue accent line on left
      const accentLine = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 4.8, 0.2),
        new THREE.MeshStandardMaterial({
          color: 0x0066FF,
          roughness: 0.1,
          metalness: 0.6,
          emissive: 0x0066FF,
          emissiveIntensity: 0.3,
        })
      );
      accentLine.position.set(-1.84, 0, 0.1);
      accentLine.castShadow = true;
      frameGroup.add(accentLine);

      scene.add(frameGroup);
      framesRef.current.push(frameGroup);
    });

    // ===== ANIMATION LOOP =====
    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.016;

      // Subtle floating animation for frames
      framesRef.current.forEach((frame) => {
        const originalY = (frame as any).originalY;
        const index = (frame as any).index;
        const floatAmount = Math.sin(time * 0.4 + index * 0.6) * 0.35;
        frame.position.y = originalY + floatAmount;

        // Subtle rotation
        frame.rotation.y = Math.sin(time * 0.2 + index * 0.4) * 0.04;
        frame.rotation.x = Math.cos(time * 0.15 + index * 0.3) * 0.02;
      });

      renderer.render(scene, camera);
    };

    animate();

    // ===== SCROLL ANIMATION =====
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        markers: false,
      },
    });

    // Cinematic camera movement
    tl.to(
      camera.position,
      {
        x: 0,
        y: 4,
        z: 12,
        ease: 'none',
      },
      0
    ).to(
      camera,
      {
        onUpdate: () => {
          camera.lookAt(0, 1.5, 0);
        },
      },
      0
    );

    // Frame animations
    framesRef.current.forEach((frame, index) => {
      tl.to(
        frame.position,
        {
          z: (frame as any).originalZ + 3,
          ease: 'none',
        },
        0
      );
    });

    // ===== WINDOW RESIZE HANDLER =====
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mark as loaded
    setIsLoaded(true);

    // Callback
    if (onSceneReady) {
      onSceneReady(scene, camera, renderer);
    }

    // ===== CLEANUP =====
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onSceneReady]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* 3D Canvas */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Hero Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {/* Logo and Brand */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-semibold tracking-widest text-gray-700">PORTFOLIO</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Portfolio</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-blue-600"></div>
            <p className="text-lg text-gray-600 font-light tracking-wide">Simplicity in Excellence</p>
            <div className="w-12 h-0.5 bg-blue-600"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <div className="animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
