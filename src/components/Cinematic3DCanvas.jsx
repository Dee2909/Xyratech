import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Cinematic3DCanvas({ scrollProgress = 0, activeServiceIndex = 0 }) {
  const mountRef = useRef(null);
  const stateRef = useRef({ scrollProgress, activeServiceIndex });
  stateRef.current = { scrollProgress, activeServiceIndex };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060810, 0.018);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Master 3D Universe Group
    const universe = new THREE.Group();
    scene.add(universe);

    // ==========================================
    // 1. Cosmic Stardust Field (2,400 particles)
    // ==========================================
    const particleCount = 2400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x00f0ff);
    const cPurple = new THREE.Color(0xa855f7);
    const cPink = new THREE.Color(0xec4899);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 8 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i3] = radius * Math.cos(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.sin(phi);
      particlePositions[i3 + 2] = radius * Math.cos(phi) * Math.sin(theta);

      const r = Math.random();
      const col = r > 0.6 ? cPurple : r > 0.3 ? cCyan : cPink;
      particleColors[i3] = col.r;
      particleColors[i3 + 1] = col.g;
      particleColors[i3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Circular particle texture
    const makeParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(0,240,255,0.7)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(canvas);
    };

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      map: makeParticleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starField = new THREE.Points(particleGeo, particleMat);
    universe.add(starField);

    // ==========================================
    // 2. Central Prismatic Hyper-Core
    // ==========================================
    const coreGroup = new THREE.Group();
    universe.add(coreGroup);

    // Faceted Outer Glass Crystal
    const outerGeo = new THREE.IcosahedronGeometry(4.2, 0);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a1426,
      emissive: 0x002e4d,
      emissiveIntensity: 0.4,
      roughness: 0.05,
      metalness: 0.15,
      transmission: 0.85,
      ior: 1.6,
      thickness: 3.0,
      specularIntensity: 1.0,
      specularColor: 0x00f0ff,
      flatShading: true,
      transparent: true,
      opacity: 0.9,
    });
    const outerCrystal = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerCrystal);

    // Wireframe edge accents
    const edgeGeo = new THREE.EdgesGeometry(outerGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    coreGroup.add(edgeLines);

    // Inner Pulsing Core
    const innerGeo = new THREE.OctahedronGeometry(2.2, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0xa855f7,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8,
    });
    const innerCrystal = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCrystal);

    // Gyroscopic Holographic Rings
    const createEnergyRing = (radius, tube, color, rx, ry) => {
      const ringG = new THREE.TorusGeometry(radius, tube, 24, 120);
      const ringM = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 1.0,
        roughness: 0.2,
      });
      const ring = new THREE.Mesh(ringG, ringM);
      ring.rotation.x = rx;
      ring.rotation.y = ry;
      coreGroup.add(ring);
      return ring;
    };

    const ring1 = createEnergyRing(6.2, 0.04, 0x00f0ff, Math.PI / 3, Math.PI / 6);
    const ring2 = createEnergyRing(7.8, 0.035, 0x8b5cf6, -Math.PI / 4, Math.PI / 4);
    const ring3 = createEnergyRing(9.4, 0.03, 0xec4899, Math.PI / 2.4, -Math.PI / 5);

    // 8 Orbiting Service Beacon Spheres
    const orbitGroup = new THREE.Group();
    coreGroup.add(orbitGroup);
    const orbitNodes = [];
    const orbitColors = [
      0x00f0ff, 0x8b5cf6, 0xec4899, 0xf59e0b,
      0x10b981, 0x6366f1, 0xef4444, 0x06b6d4
    ];

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const rad = 11.5;
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 16, 16),
        new THREE.MeshStandardMaterial({
          color: orbitColors[i],
          emissive: orbitColors[i],
          emissiveIntensity: 1.2,
        })
      );
      sphere.position.set(Math.cos(angle) * rad, Math.sin(angle) * rad * 0.45, Math.sin(angle * 2) * 3);
      orbitGroup.add(sphere);
      orbitNodes.push({ mesh: sphere, angle, speed: 0.003 + (i % 3) * 0.001, radius: rad });
    }

    // ==========================================
    // 3. Cinematic Dynamic Lights
    // ==========================================
    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);

    const mouseSpot = new THREE.PointLight(0x00f0ff, 5, 45);
    mouseSpot.position.set(0, 0, 15);
    scene.add(mouseSpot);

    const purpleLight = new THREE.DirectionalLight(0xa855f7, 2.5);
    purpleLight.position.set(-15, 20, 15);
    scene.add(purpleLight);

    const pinkLight = new THREE.DirectionalLight(0xec4899, 2.0);
    pinkLight.position.set(15, -15, -10);
    scene.add(pinkLight);

    // ==========================================
    // 4. Mouse Tracking & Parallax
    // ==========================================
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onPointerMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.targetX = normX;
      mouse.targetY = normY;

      mouseSpot.position.x = normX * 16;
      mouseSpot.position.y = normY * 12;
    };

    window.addEventListener('pointermove', onPointerMove);

    // Window resize
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // ==========================================
    // 5. Render & Scroll Interpolation Loop
    // ==========================================
    let animId;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const progress = stateRef.current.scrollProgress;

      // Dynamic Camera Path & Position based on scroll
      // Chapter 0 (0.0): Centered Hero View
      // Chapter 1 (0.25): Tilted Corridor View (Ideas Tech Growth)
      // Chapter 2 (0.50): Wide Spatial Services View
      // Chapter 3 (0.75): Deep AI Core Zoom
      // Chapter 4 (1.0): Quantum Launch Alignment
      const targetCamX = Math.sin(progress * Math.PI * 2) * 6 + mouse.x * 3;
      const targetCamY = -progress * 18 + mouse.y * 2.5;
      const targetCamZ = 24 - Math.sin(progress * Math.PI) * 8;

      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.position.z += (targetCamZ - camera.position.z) * 0.04;

      // Camera always looks smoothly toward the moving center
      const lookTarget = new THREE.Vector3(0, -progress * 16, 0);
      camera.lookAt(lookTarget);

      // Core rotation & animations
      outerCrystal.rotation.y = time * 0.25 + progress * 4;
      outerCrystal.rotation.x = Math.sin(time * 0.2) * 0.2;
      edgeLines.rotation.copy(outerCrystal.rotation);

      innerCrystal.rotation.y = -time * 0.4;
      innerCrystal.rotation.z = time * 0.3;
      const pulse = 1 + Math.sin(time * 2.5) * 0.06;
      innerCrystal.scale.set(pulse, pulse, pulse);

      ring1.rotation.z = time * 0.35 + progress * 2;
      ring2.rotation.x = -time * 0.28;
      ring3.rotation.y = time * 0.22;

      // Orbiting beacon nodes
      orbitNodes.forEach((node, idx) => {
        const curA = node.angle + time * node.speed;
        node.mesh.position.x = Math.cos(curA) * node.radius;
        node.mesh.position.y = Math.sin(curA) * (node.radius * 0.42) + Math.sin(time * 2 + idx) * 0.4;
        node.mesh.position.z = Math.sin(curA * 2) * 3;
      });

      // Ambient stardust drift
      starField.rotation.y = time * 0.02 + mouse.x * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none"
    />
  );
}
