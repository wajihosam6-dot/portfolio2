import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryCanvasProps {
  onSceneReady?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => void;
}

/**
 * GalleryCanvas Component
 * Design Philosophy: Cinematic 3D Gallery
 * - Professional gallery lighting with ambient + directional + accent lights
 * - GSAP ScrollTrigger with scrub:1 for smooth camera movement
 * - Portfolio cards floating in 3D space
 * - Responsive to scroll position
 */

export const GalleryCanvas: React.FC<GalleryCanvasProps> = ({ onSceneReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | undefined>(undefined);
  const cardsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 30, 50);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting setup - Professional gallery lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(8, 10, 6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -25;
    directionalLight.shadow.camera.right = 25;
    directionalLight.shadow.camera.top = 25;
    directionalLight.shadow.camera.bottom = -25;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);

    // Add accent lighting (electric blue)
    const accentLight = new THREE.PointLight(0x0066FF, 0.5);
    accentLight.position.set(-8, 4, 4);
    scene.add(accentLight);

    const accentLight2 = new THREE.PointLight(0x0066FF, 0.3);
    accentLight2.position.set(8, 4, -4);
    scene.add(accentLight2);

    // Create gallery walls with better materials
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.05,
      envMapIntensity: 1,
    });

    // Back wall
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(24, 14), wallMaterial);
    backWall.position.z = -6;
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Left wall
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(12, 14), wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -12;
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(12, 14), wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = 12;
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Floor with subtle gradient
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      roughness: 0.4,
      metalness: 0.02,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 12), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    floor.receiveShadow = true;
    scene.add(floor);

    // Create portfolio cards (floating frames)
    const cardPositions = [
      { x: -7, y: 2.5, z: -2 },
      { x: 0, y: 2.5, z: -2 },
      { x: 7, y: 2.5, z: -2 },
      { x: -7, y: 2.5, z: 2.5 },
      { x: 0, y: 2.5, z: 2.5 },
      { x: 7, y: 2.5, z: 2.5 },
    ];

    const cardMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8f9fa,
      roughness: 0.2,
      metalness: 0.4,
      envMapIntensity: 1,
    });

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8e8e8,
      roughness: 0.15,
      metalness: 0.6,
    });

    cardPositions.forEach((pos, index) => {
      // Card main body
      const cardGeometry = new THREE.BoxGeometry(3.2, 4.2, 0.15);
      const card = new THREE.Mesh(cardGeometry, cardMaterial);
      card.position.set(pos.x, pos.y, pos.z);
      card.castShadow = true;
      card.receiveShadow = true;
      
      // Store original position for animation
      (card as any).originalY = pos.y;
      (card as any).originalZ = pos.z;
      (card as any).index = index;
      
      scene.add(card);
      cardsRef.current.push(card);

      // Add frame/border
      const frameGeometry = new THREE.BoxGeometry(3.4, 4.4, 0.05);
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.set(pos.x, pos.y, pos.z - 0.1);
      frame.castShadow = true;
      frame.receiveShadow = true;
      scene.add(frame);
    });

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop with card floating effect
    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.016; // ~60fps

      // Subtle floating animation for cards
      cardsRef.current.forEach((card, index) => {
        const originalY = (card as any).originalY;
        const floatAmount = Math.sin(time * 0.5 + index * 0.5) * 0.3;
        card.position.y = originalY + floatAmount;
        
        // Subtle rotation
        card.rotation.y = Math.sin(time * 0.3 + index * 0.3) * 0.05;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Setup scroll animation with GSAP ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        markers: false,
      },
    });

    // Camera movement along scroll - cinematic path
    tl.to(
      camera.position,
      {
        x: 0,
        y: 3.5,
        z: 10,
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

    // Card animations
    cardsRef.current.forEach((card, index) => {
      tl.to(
        card.position,
        {
          z: (card as any).originalZ + 2,
          ease: 'none',
        },
        0
      );
    });

    // Callback when scene is ready
    if (onSceneReady) {
      onSceneReady(scene, camera, renderer);
    }

    // Cleanup
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
    <div
      ref={containerRef}
      className="w-full h-screen bg-white overflow-hidden"
      style={{ position: 'relative' }}
    />
  );
};

export default GalleryCanvas;
