import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef(null);
  const [activePreset, setActivePreset] = useState('prism'); // 'prism' | 'neural' | 'nexus'

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.018);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 28);

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
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Main 3D Stage Group
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // ==========================================
    // 1. Central Prismatic Crystal Core
    // ==========================================
    const coreGroup = new THREE.Group();
    stageGroup.add(coreGroup);

    // Inner glowing geometric seed
    const innerGeo = new THREE.OctahedronGeometry(2.4, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Faceted Outer Glass Crystal (MeshPhysicalMaterial with high transmission/refraction)
    const crystalGeo = new THREE.IcosahedronGeometry(4.2, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x111c38,
      emissive: 0x22134d,
      emissiveIntensity: 0.35,
      roughness: 0.05,
      metalness: 0.15,
      transmission: 0.75, // Glass effect
      ior: 1.6,
      thickness: 3.5,
      specularIntensity: 1.0,
      specularColor: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
      flatShading: true,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    coreGroup.add(crystalMesh);

    // Wireframe edge accents on crystal
    const edgesGeo = new THREE.EdgesGeometry(crystalGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
      linewidth: 1.5,
    });
    const edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
    coreGroup.add(edgesMesh);

    // ==========================================
    // 2. Orbital Laser Rings with Energy Pulses
    // ==========================================
    const ringGroup = new THREE.Group();
    stageGroup.add(ringGroup);

    const createEnergyRing = (radius, tube, color, rotX, rotY) => {
      const ringG = new THREE.TorusGeometry(radius, tube, 24, 120);
      const ringM = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 1.2,
        roughness: 0.2,
        metalness: 0.8,
      });
      const ring = new THREE.Mesh(ringG, ringM);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      ringGroup.add(ring);
      return ring;
    };

    const ring1 = createEnergyRing(6.8, 0.045, 0x00f0ff, Math.PI / 3, Math.PI / 6);
    const ring2 = createEnergyRing(8.6, 0.04, 0x8b5cf6, -Math.PI / 4, Math.PI / 4);
    const ring3 = createEnergyRing(10.4, 0.035, 0xec4899, Math.PI / 2.5, -Math.PI / 5);

    // ==========================================
    // 3. Floating 3D SaaS Feature Capsules (8 nodes)
    // ==========================================
    const floatingNodes = [];
    const nodeGroup = new THREE.Group();
    stageGroup.add(nodeGroup);

    const nodeColors = [
      0x00f0ff, // Web
      0x8b5cf6, // App
      0xec4899, // AI Chatbot
      0xf59e0b, // Media Tech
      0x10b981, // Site Mgmt
      0x6366f1, // Data Analysis
      0xef4444, // Ad Shoots
      0x06b6d4  // Marketing
    ];

    const orbitRadius = 12.8;

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const singleNodeGroup = new THREE.Group();

      // Rounded Capsule/Pill Mesh
      const pillGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 16);
      const pillMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: nodeColors[i],
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.9,
      });
      const pillMesh = new THREE.Mesh(pillGeo, pillMat);
      pillMesh.rotation.z = Math.PI / 2;
      singleNodeGroup.add(pillMesh);

      // Glowing Halo Ring around capsule
      const haloGeo = new THREE.TorusGeometry(0.7, 0.02, 16, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: nodeColors[i],
        transparent: true,
        opacity: 0.8,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      singleNodeGroup.add(halo);

      singleNodeGroup.position.x = Math.cos(angle) * orbitRadius;
      singleNodeGroup.position.y = Math.sin(angle) * (orbitRadius * 0.45);
      singleNodeGroup.position.z = Math.sin(angle * 2) * 3;

      nodeGroup.add(singleNodeGroup);
      floatingNodes.push({
        group: singleNodeGroup,
        baseAngle: angle,
        speed: 0.004 + (i % 3) * 0.001,
        orbitRadius: orbitRadius + (i % 2 === 0 ? 0.8 : -0.8),
        yOffset: Math.sin(angle) * 4,
      });
    }

    // ==========================================
    // 4. Ambient Cybernetic Particle Swarm
    // ==========================================
    const particleCount = 2200;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const cyanC = new THREE.Color(0x00f0ff);
    const purpleC = new THREE.Color(0xa855f7);
    const pinkC = new THREE.Color(0xec4899);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spherical distribution with layered depth
      const radius = 6 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7; // subtle flatten
      posArray[i3 + 2] = radius * Math.cos(phi);

      const r = Math.random();
      let picked = cyanC;
      if (r > 0.6) picked = purpleC;
      else if (r > 0.3) picked = pinkC;

      colorArray[i3] = picked.r;
      colorArray[i3 + 1] = picked.g;
      colorArray[i3 + 2] = picked.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Custom circular particle texture via canvas
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(0,240,255,0.7)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const particleMat = new THREE.PointsMaterial({
      size: 0.32,
      map: createCircleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // 5. Cinematic Lighting Environment
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0a1020, 1.2);
    scene.add(ambientLight);

    // Dynamic Tracking Spotlight (follows mouse pointer)
    const pointerLight = new THREE.PointLight(0x00f0ff, 6, 45);
    pointerLight.position.set(0, 0, 12);
    scene.add(pointerLight);

    const rimLightPurple = new THREE.DirectionalLight(0xa855f7, 3);
    rimLightPurple.position.set(-15, 12, -8);
    scene.add(rimLightPurple);

    const rimLightPink = new THREE.DirectionalLight(0xec4899, 2.5);
    rimLightPink.position.set(15, -10, -5);
    scene.add(rimLightPink);

    // ==========================================
    // 6. Smooth Mouse Parallax & Interaction
    // ==========================================
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = normX;
      mouse.targetY = normY;

      // Update light position based on mouse
      pointerLight.position.x = normX * 14;
      pointerLight.position.y = normY * 10;

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        stageGroup.rotation.y += deltaX * 0.007;
        stageGroup.rotation.x += deltaY * 0.007;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // ==========================================
    // 7. Render Animation Loop
    // ==========================================
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate central core
      crystalMesh.rotation.y = time * 0.2;
      crystalMesh.rotation.x = Math.sin(time * 0.15) * 0.2;
      edgesMesh.rotation.copy(crystalMesh.rotation);

      innerMesh.rotation.y = -time * 0.35;
      innerMesh.rotation.z = time * 0.25;
      const pulseScale = 1 + Math.sin(time * 2.5) * 0.08;
      innerMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // Gyroscopic rings rotation
      ring1.rotation.z = time * 0.28;
      ring2.rotation.x = -time * 0.22;
      ring3.rotation.y = time * 0.18;

      // Animate floating service nodes
      floatingNodes.forEach((node, idx) => {
        const curAngle = node.baseAngle + time * node.speed;
        node.group.position.x = Math.cos(curAngle) * node.orbitRadius;
        node.group.position.y = Math.sin(curAngle) * (node.orbitRadius * 0.42) + Math.sin(time * 1.5 + idx) * 0.6;
        node.group.position.z = Math.sin(curAngle * 2) * 3.5;
        node.group.rotation.y = time * 0.8 + idx;
      });

      // Swarm rotation
      particles.rotation.y = time * 0.025 + mouse.x * 0.25;
      particles.rotation.x = mouse.y * 0.2;

      // Parallax stage tilt when not dragging
      if (!isDragging) {
        stageGroup.rotation.y = mouse.x * 0.35 + time * 0.03;
        stageGroup.rotation.x = -mouse.y * 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activePreset]);

  return (
    <div className="relative w-full h-full min-h-[520px] lg:min-h-[660px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-0" 
        style={{ touchAction: 'none' }}
      />

      {/* Floating Modern Hologram HUD Badges */}
      <div className="absolute top-6 left-6 z-10 hidden sm:flex items-center gap-2.5 bg-slate-950/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-slate-800/80 text-xs shadow-2xl">
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        <div className="flex flex-col">
          <span className="font-mono font-bold text-white tracking-wider">XYRA 3D ENGINE</span>
          <span className="text-[10px] text-slate-400 font-mono">PBR Glass Crystal • 8 Service Orbits</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 bg-slate-950/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-slate-800/80 text-xs text-slate-300 shadow-2xl pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-[11px] text-slate-300">Drag to rotate • Real-time WebGL</span>
      </div>
    </div>
  );
}
