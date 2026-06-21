import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryCanvasProps {
  onSceneReady?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => void;
}

/**
 * Luxury Abstract Monolith - Premium 3D Hero
 * Design: Floating crystalline structure with luxury materials
 * - Custom shaders for glass and metal effects
 * - Fluid mouse interactions
 * - Cinematic lighting and reflections
 */

const vertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uMouseX;
  uniform float uMouseY;
  
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vPosition);
    
    // Fresnel effect
    float fresnel = pow(1.0 - dot(normal, viewDir), 3.0);
    
    // Metallic reflection
    vec3 reflection = reflect(-viewDir, normal);
    float metallic = mix(0.3, 0.9, fresnel);
    
    // Color with iridescence
    vec3 color = mix(uColor, vec3(0.0, 0.4, 1.0), fresnel * 0.5);
    
    // Add shimmer based on time
    float shimmer = sin(uTime + vPosition.x * 5.0) * 0.1 + 0.5;
    color += vec3(0.0, 0.2, 0.4) * shimmer * fresnel;
    
    // Final output
    gl_FragColor = vec4(color, 0.85 + fresnel * 0.15);
  }
`;

export const GalleryCanvas: React.FC<GalleryCanvasProps> = ({ onSceneReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const monolithRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting - Luxury Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x0066FF, 3, 50);
    blueLight.position.set(-8, 3, 0);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x6600FF, 2, 50);
    purpleLight.position.set(8, -3, 0);
    scene.add(purpleLight);

    // Create Luxury Monolith Group
    const monolith = new THREE.Group();
    monolithRef.current = monolith;
    scene.add(monolith);

    // Custom Shader Material
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color(0x0066FF) },
        uTime: { value: 0 },
        uMouseX: { value: 0 },
        uMouseY: { value: 0 }
      },
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });

    // Create Main Crystalline Structure
    const geometries = [
      new THREE.IcosahedronGeometry(1.5, 4),
      new THREE.OctahedronGeometry(1.2, 3),
      new THREE.TetrahedronGeometry(1, 2),
      new THREE.BoxGeometry(0.8, 2, 0.8)
    ];

    geometries.forEach((geo, i) => {
      const mesh = new THREE.Mesh(geo, shaderMaterial.clone());
      mesh.position.set(
        Math.sin(i * Math.PI / 2) * 0.5,
        Math.cos(i * Math.PI / 2) * 0.5,
        Math.sin(i * Math.PI / 4) * 0.3
      );
      mesh.rotation.set(i * 0.3, i * 0.4, i * 0.2);
      (mesh as any).originalRotation = mesh.rotation.clone();
      monolith.add(mesh);
    });

    // Add Floating Particles Around Monolith
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x0066FF,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse Move Handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Window Resize Handler
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

      // Smooth mouse following
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      // Rotate monolith based on mouse
      if (monolith) {
        monolith.rotation.x = mouseRef.current.y * 0.5;
        monolith.rotation.y = mouseRef.current.x * 0.5;

        // Subtle floating animation
        monolith.position.y = Math.sin(time * 0.5) * 0.3;
        monolith.position.x = Math.cos(time * 0.3) * 0.2;
      }

      // Rotate particles
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0002;

      // Update shader uniforms
      monolith.children.forEach((child: any) => {
        if (child.material.uniforms) {
          child.material.uniforms.uTime.value = time;
          child.material.uniforms.uMouseX.value = mouseRef.current.x;
          child.material.uniforms.uMouseY.value = mouseRef.current.y;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // GSAP Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      }
    });

    tl.to(camera.position, { z: 15, y: 3, ease: 'none' });
    tl.to(monolith.rotation, { x: Math.PI * 2, y: Math.PI, z: Math.PI * 0.5, ease: 'none' }, 0);
    tl.to(monolith.position, { y: 5, ease: 'none' }, 0);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onSceneReady]);

  return (
    <div ref={containerRef} className="w-full h-screen bg-black overflow-hidden" />
  );
};

export default GalleryCanvas;
