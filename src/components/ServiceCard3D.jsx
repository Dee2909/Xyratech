import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ServiceCard3D({ serviceId = 'web-dev', accentColor = '#00f0ff', isHovered = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 140;
    const height = container.clientHeight || 140;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const hexColor = parseInt(accentColor.replace('#', '0x'), 16);

    // Common materials
    const metallicMat = new THREE.MeshStandardMaterial({
      color: 0x0c1322,
      roughness: 0.25,
      metalness: 0.9,
    });

    const glowMat = new THREE.MeshStandardMaterial({
      color: hexColor,
      emissive: hexColor,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.5,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111c33,
      emissive: hexColor,
      emissiveIntensity: 0.2,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
    });

    const wireMat = new THREE.LineBasicMaterial({
      color: hexColor,
      transparent: true,
      opacity: 0.6,
    });

    // Create unique, custom 3D model based on service
    const dynamicObjects = [];

    switch (serviceId) {
      case 'web-dev': {
        // 3D Browser Window Frame + Code Bars
        const frameGeo = new THREE.BoxGeometry(3.6, 2.6, 0.25);
        const frame = new THREE.Mesh(frameGeo, glassMat);
        group.add(frame);

        // Header bar
        const headerGeo = new THREE.BoxGeometry(3.6, 0.45, 0.28);
        const header = new THREE.Mesh(headerGeo, metallicMat);
        header.position.y = 1.05;
        group.add(header);

        // Traffic dots
        for (let d = 0; d < 3; d++) {
          const dot = new THREE.Mesh(
            new THREE.CircleGeometry(0.08, 16),
            new THREE.MeshBasicMaterial({ color: d === 0 ? 0xff5f56 : d === 1 ? 0xffbd2e : 0x27c93f })
          );
          dot.position.set(-1.4 + d * 0.28, 1.05, 0.16);
          group.add(dot);
        }

        // Floating Code lines
        for (let l = 0; l < 4; l++) {
          const lineGeo = new THREE.BoxGeometry(1.6 + (l % 2) * 0.8, 0.12, 0.08);
          const line = new THREE.Mesh(lineGeo, glowMat);
          line.position.set(-0.4 + (l % 2) * 0.2, 0.45 - l * 0.45, 0.18);
          group.add(line);
          dynamicObjects.push(line);
        }
        break;
      }

      case 'app-dev': {
        // 3D Smartphone Body
        const phoneGeo = new THREE.BoxGeometry(2.2, 4.0, 0.28);
        const phone = new THREE.Mesh(phoneGeo, metallicMat);
        group.add(phone);

        // Screen Glass
        const screenGeo = new THREE.BoxGeometry(1.95, 3.7, 0.3);
        const screen = new THREE.Mesh(screenGeo, glassMat);
        group.add(screen);

        // Speaker notch & home indicator
        const notch = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.32), glowMat);
        notch.position.y = 1.7;
        group.add(notch);

        const homeBar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 0.32), glowMat);
        homeBar.position.y = -1.7;
        group.add(homeBar);

        // Floating App Icon tiles
        for (let a = 0; a < 3; a++) {
          const tile = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.1), glowMat);
          tile.position.set(-0.5 + (a % 2) * 0.9, 0.8 - Math.floor(a / 2) * 0.9, 0.22);
          group.add(tile);
          dynamicObjects.push(tile);
        }
        break;
      }

      case 'ai-chatbot': {
        // Glowing Neural Core + Orbiting Synapse Rings
        const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
        const core = new THREE.Mesh(coreGeo, glassMat);
        group.add(core);

        const innerPill = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), glowMat);
        group.add(innerPill);

        const ringG = new THREE.TorusGeometry(2.3, 0.05, 16, 64);
        const r1 = new THREE.Mesh(ringG, glowMat);
        r1.rotation.x = Math.PI / 4;
        group.add(r1);

        const r2 = new THREE.Mesh(ringG, glowMat);
        r2.rotation.y = Math.PI / 3;
        group.add(r2);

        dynamicObjects.push(r1, r2, innerPill);
        break;
      }

      case 'media-tech': {
        // 3D Equalizer Audio Bars + Glowing Wave Peaks
        for (let b = -3; b <= 3; b++) {
          const h = 1.2 + Math.abs(Math.sin(b * 0.8)) * 2.2;
          const barGeo = new THREE.BoxGeometry(0.3, h, 0.3);
          const bar = new THREE.Mesh(barGeo, glowMat);
          bar.position.set(b * 0.48, 0, 0);
          group.add(bar);
          dynamicObjects.push({ mesh: bar, baseIndex: b });
        }

        // Circular aura
        const aura = new THREE.Mesh(new THREE.RingGeometry(2.4, 2.5, 40), glowMat);
        group.add(aura);
        break;
      }

      case 'site-mgmt': {
        // 3D Enterprise Server Blade Tower
        for (let s = -2; s <= 2; s++) {
          const rackGeo = new THREE.BoxGeometry(3.0, 0.55, 1.8);
          const rack = new THREE.Mesh(rackGeo, metallicMat);
          rack.position.y = s * 0.72;
          group.add(rack);

          // LED status dots
          const led1 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), glowMat);
          led1.position.set(1.2, s * 0.72, 0.95);
          group.add(led1);

          const led2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
          led2.position.set(0.9, s * 0.72, 0.95);
          group.add(led2);
        }

        // Surrounding Security Ring
        const secRing = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.04, 16, 60), glowMat);
        secRing.rotation.x = Math.PI / 2.3;
        group.add(secRing);
        dynamicObjects.push(secRing);
        break;
      }

      case 'data-analysis': {
        // 3D Stepped Matrix Bar Chart + Ascending Trend Vector
        const heights = [0.8, 1.5, 2.2, 3.2];
        for (let c = 0; c < 4; c++) {
          const h = heights[c];
          const colGeo = new THREE.BoxGeometry(0.55, h, 0.55);
          const col = new THREE.Mesh(colGeo, c === 3 ? glowMat : metallicMat);
          col.position.set(-1.2 + c * 0.8, h / 2 - 1.5, 0);
          group.add(col);
          dynamicObjects.push(col);
        }

        // Glowing Trend Beam
        const beamGeo = new THREE.CylinderGeometry(0.05, 0.05, 3.6, 16);
        const beam = new THREE.Mesh(beamGeo, glowMat);
        beam.rotation.z = -Math.PI / 4;
        beam.position.set(0, 0.3, 0.4);
        group.add(beam);
        break;
      }

      case 'ad-shoots': {
        // 3D Cinema Camera Lens with Multi-Aperture Optics
        const barrelGeo = new THREE.CylinderGeometry(1.6, 1.6, 2.2, 32);
        const barrel = new THREE.Mesh(barrelGeo, metallicMat);
        barrel.rotation.x = Math.PI / 2;
        group.add(barrel);

        // Glass Front Element
        const lensGeo = new THREE.SphereGeometry(1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35);
        const lens = new THREE.Mesh(lensGeo, glassMat);
        lens.rotation.x = -Math.PI / 2;
        lens.position.z = 1.1;
        group.add(lens);

        // Glowing focus rings
        const ringF1 = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.05, 16, 40), glowMat);
        ringF1.position.z = 0.5;
        group.add(ringF1);

        const ringF2 = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.05, 16, 40), glowMat);
        ringF2.position.z = -0.5;
        group.add(ringF2);
        break;
      }

      case 'digital-marketing': {
        // 3D Growth Rocket / Ascending Vector + Concentric Radar Rings
        const radar1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.03, 16, 50), glowMat);
        const radar2 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.03, 16, 50), glowMat);
        radar1.rotation.x = Math.PI / 3;
        radar2.rotation.x = Math.PI / 3;
        group.add(radar1);
        group.add(radar2);

        // Ascending Pointer/Arrow
        const arrowGeo = new THREE.ConeGeometry(0.7, 2.2, 4);
        const arrow = new THREE.Mesh(arrowGeo, glowMat);
        arrow.rotation.z = -Math.PI / 4;
        arrow.position.set(0.4, 0.4, 0.3);
        group.add(arrow);

        dynamicObjects.push(radar1, radar2, arrow);
        break;
      }

      default: {
        const dMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 0), glowMat);
        group.add(dMesh);
        break;
      }
    }

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const pLight = new THREE.PointLight(hexColor, 4, 15);
    pLight.position.set(4, 4, 6);
    scene.add(pLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
    backLight.position.set(-4, -4, -4);
    scene.add(backLight);

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const speed = isHovered ? 2.2 : 1.0;

      // Group base rotation & floating bob
      group.rotation.y = time * 0.4 * speed;
      group.rotation.x = Math.sin(time * 0.6) * 0.15;
      group.position.y = Math.sin(time * 1.5) * 0.12;

      // Service-specific micro-animations
      if (serviceId === 'media-tech') {
        dynamicObjects.forEach((item) => {
          if (item.mesh) {
            const dynamicScale = 0.5 + Math.abs(Math.sin(time * 4 * speed + item.baseIndex * 0.7)) * 1.8;
            item.mesh.scale.y = dynamicScale;
          }
        });
      }

      if (serviceId === 'ai-chatbot' && dynamicObjects.length >= 2) {
        dynamicObjects[0].rotation.z = time * 1.2 * speed;
        dynamicObjects[1].rotation.x = -time * 1.0 * speed;
      }

      if (serviceId === 'digital-marketing' && dynamicObjects.length >= 3) {
        dynamicObjects[0].rotation.z = time * 0.8 * speed;
        dynamicObjects[1].rotation.z = -time * 0.5 * speed;
      }

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 140;
      const h = container.clientHeight || 140;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [serviceId, accentColor, isHovered]);

  return (
    <div 
      ref={mountRef} 
      className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center pointer-events-none"
    />
  );
}
