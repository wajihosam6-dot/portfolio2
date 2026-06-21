import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x404060);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0x0066ff, 2);
    light.position.set(1, 1, 2);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0x7c3aed, 1.5);
    light2.position.set(-1, -0.5, 1);
    scene.add(light2);

    const geo = new THREE.IcosahedronGeometry(1.5, 1);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x0066ff,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
      emissive: 0x0066ff,
      emissiveIntensity: 0.2,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wireGeo = new THREE.IcosahedronGeometry(1.55, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    const count = 500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 20;
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x0066ff,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    const startTime = Date.now();
    const duration = 2500;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);

      setProgress(Math.min(Math.floor(t * 100), 100));

      mesh.rotation.x += 0.008;
      mesh.rotation.y += 0.015;
      wireMesh.rotation.x = mesh.rotation.x;
      wireMesh.rotation.y = mesh.rotation.y;
      particles.rotation.y += 0.002;

      mat.emissiveIntensity = 0.2 + Math.sin(t * Math.PI * 4) * 0.15;

      renderer.render(scene, camera);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setTimeout(() => onFinish(), 400);
      }
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="relative z-10 text-center">
        <p className="text-white/50 text-sm uppercase tracking-[0.3em] mt-48">
          Loading Experience
        </p>
        <div className="w-48 h-[1px] bg-white/10 mx-auto mt-4 overflow-hidden rounded-full">
          <div
            className="h-full rounded-full transition-all duration-200 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #0066FF, #7C3AED)',
              boxShadow: '0 0 12px rgba(0,102,255,0.5)',
            }}
          />
        </div>
        <p className="text-white/20 text-xs mt-2 font-mono tracking-wider">
          {progress}%
        </p>
      </div>
    </div>
  );
}
