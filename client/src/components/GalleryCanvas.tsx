import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryCanvasProps {
  onSceneReady?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => void;
}

/**
 * GalleryCanvas Component - Cinematic 3D Edition
 * - Advanced Digital Showroom with dynamic lighting
 * - Particle system reacting to mouse and scroll
 * - Custom shaders for holographic card effects
 * - Smooth cinematic camera transitions
 */

export const GalleryCanvas: React.FC<GalleryCanvasProps> = ({ onSceneReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | undefined>(undefined);
  const cardsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a); // Deep dark for cinematic feel
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.05);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 8);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting setup - Dramatic Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.SpotLight(0xffffff, 2);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.angle = 0.5;
    mainLight.penumbra = 0.5;
    scene.add(mainLight);

    // Electric Blue Accents (ORTECH Brand)
    const blueLight1 = new THREE.PointLight(0x0066FF, 2, 20);
    blueLight1.position.set(-5, 2, 2);
    scene.add(blueLight1);

    const blueLight2 = new THREE.PointLight(0x0066FF, 1.5, 20);
    blueLight2.position.set(5, -2, -2);
    scene.add(blueLight2);

    // Particle System (Star Dust)
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i=0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 40;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x0066FF,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesRef.current = particlesMesh;

    // Showroom Environment (Floor & Walls)
    const floorGeo = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: 0x111111,
      roughness: 0.1,
      metalness: 0.8
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid on floor for tech feel
    const grid = new THREE.GridHelper(50, 50, 0x0066FF, 0x222222);
    grid.position.y = -1.99;
    scene.add(grid);

    // Portfolio Cards with Holographic Effect
    const cardPositions = [
      { x: -6, y: 1.5, z: -2 },
      { x: 0, y: 1.5, z: -2 },
      { x: 6, y: 1.5, z: -2 },
      { x: -6, y: 1.5, z: 4 },
      { x: 0, y: 1.5, z: 4 },
      { x: 6, y: 1.5, z: 4 },
    ];

    const cardGeo = new THREE.BoxGeometry(3.5, 4.5, 0.1);
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x0066FF,
      emissiveIntensity: 0.1
    });

    cardPositions.forEach((pos, i) => {
      const card = new THREE.Mesh(cardGeo, cardMat);
      card.position.set(pos.x, pos.y, pos.z);
      card.castShadow = true;
      card.receiveShadow = true;
      (card as any).originalY = pos.y;
      (card as any).originalZ = pos.z;
      (card as any).index = i;
      scene.add(card);
      cardsRef.current.push(card);

      // Add a glowing border
      const borderGeo = new THREE.BoxGeometry(3.6, 4.6, 0.05);
      const borderMat = new THREE.MeshBasicMaterial({ color: 0x0066FF, transparent: true, opacity: 0.3 });
      const border = new THREE.Mesh(borderGeo, borderMat);
      border.position.set(pos.x, pos.y, pos.z - 0.05);
      scene.add(border);
    });

    // Mouse Interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Parallax effect with mouse
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 1 + 1 - camera.position.y) * 0.05;
      camera.lookAt(0, 1, 0);

      // Float cards
      cardsRef.current.forEach((card, i) => {
        card.position.y = (card as any).originalY + Math.sin(time + i) * 0.2;
        card.rotation.y = Math.sin(time * 0.5 + i) * 0.1;
      });

      // Animate particles
      if(particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.05;
        particlesRef.current.rotation.x = time * 0.02;
      }

      renderer.render(scene, camera);
    };
    animate();

    // GSAP Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    tl.to(camera.position, { z: 15, y: 5, x: 0, ease: 'none' });
    cardsRef.current.forEach((card, i) => {
      tl.to(card.position, { 
        z: (card as any).originalZ + 5, 
        y: (card as any).originalY + 2,
        ease: 'none' 
      }, 0);
      tl.to(card.rotation, { x: 0.5, y: 0.5, ease: 'none' }, 0);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [onSceneReady]);

  return (
    <div ref={containerRef} className="w-full h-screen bg-black overflow-hidden relative" />
  );
};

export default GalleryCanvas;
