import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Pipeline3DCanvas({ activeStage = 0 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Stage 0: IDEAS (Holographic Wireframe Blueprint Lattice + Lightbulbs / Data Nodes)
    const ideasGroup = new THREE.Group();
    const blueprintGeo = new THREE.BoxGeometry(3.2, 3.2, 3.2, 3, 3, 3);
    const blueprintMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const blueprintMesh = new THREE.Mesh(blueprintGeo, blueprintMat);
    ideasGroup.add(blueprintMesh);

    const innerIdeaSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.8,
        wireframe: true,
      })
    );
    ideasGroup.add(innerIdeaSphere);
    mainGroup.add(ideasGroup);

    // Stage 1: TECHNOLOGY (Solidified Microchip & Cyber Processor Block)
    const techGroup = new THREE.Group();
    const chipBase = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 0.4, 3.4),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.9 })
    );
    techGroup.add(chipBase);

    const chipCore = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.6, 2.0),
      new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.7,
        roughness: 0.1,
        metalness: 0.8,
      })
    );
    techGroup.add(chipCore);

    // Tech Bus lines
    for (let i = -3; i <= 3; i++) {
      const pin = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.2, 3.8),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.5 })
      );
      pin.position.set(i * 0.4, 0, 0);
      techGroup.add(pin);
    }
    mainGroup.add(techGroup);

    // Stage 2: GROWTH (Ascending 3D Helix / Exponential Arrow & Orbiting Rings)
    const growthGroup = new THREE.Group();
    const arrow = new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 3.4, 4),
      new THREE.MeshStandardMaterial({
        color: 0xec4899,
        emissive: 0xec4899,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      })
    );
    arrow.rotation.z = -Math.PI / 4;
    growthGroup.add(arrow);

    const ringA = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.05, 16, 60),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.7 })
    );
    ringA.rotation.x = Math.PI / 3;
    growthGroup.add(ringA);

    const ringB = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.05, 16, 60),
      new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.6 })
    );
    ringB.rotation.y = Math.PI / 3;
    growthGroup.add(ringB);
    mainGroup.add(growthGroup);

    // Ambient & Point Lights
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const pLight = new THREE.PointLight(0xffffff, 3, 20);
    pLight.position.set(5, 5, 8);
    scene.add(pLight);

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Visibility based on active stage
      ideasGroup.visible = activeStage === 0;
      techGroup.visible = activeStage === 1;
      growthGroup.visible = activeStage === 2;

      mainGroup.rotation.y = time * 0.5;
      mainGroup.rotation.x = Math.sin(time * 0.4) * 0.2;

      if (activeStage === 0) {
        innerIdeaSphere.rotation.x = time * 0.6;
        innerIdeaSphere.rotation.y = -time * 0.8;
      } else if (activeStage === 1) {
        chipCore.rotation.y = time * 0.4;
      } else if (activeStage === 2) {
        ringA.rotation.z = time * 0.8;
        ringB.rotation.z = -time * 0.6;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 280;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeStage]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-64 sm:h-72 flex items-center justify-center pointer-events-none select-none"
    />
  );
}
