import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SERVICES } from '../data/servicesData';
import { sound } from '../utils/audio';

export default function SpatialUniverse({ 
  currentSector, // 'nexus' | 'pipeline' | 'launch' | 'service-0' ... 'service-7'
  onSelectSector,
  isOrbiting,
  setIsOrbiting
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({ currentSector, isDragging: false });
  stateRef.current.currentSector = currentSector;
  const updateCameraRef = useRef(null);

  useEffect(() => {
    if (updateCameraRef.current) {
      updateCameraRef.current(currentSector);
    }
  }, [currentSector]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070c, 0.016);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.set(0, 18, 30);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Dynamic Tracking Camera vectors
    const cameraCurrent = {
      pos: new THREE.Vector3(0, 18, 30),
      lookAt: new THREE.Vector3(0, 0, 0),
    };
    const cameraTarget = {
      pos: new THREE.Vector3(0, 18, 30),
      lookAt: new THREE.Vector3(0, 0, 0),
    };

    // Global Universe Group
    const universe = new THREE.Group();
    scene.add(universe);

    // ==========================================
    // 2. Cyber Horizon Grid Floor
    // ==========================================
    const gridHelper = new THREE.GridHelper(90, 45, 0x00f0ff, 0x111c33);
    gridHelper.position.y = -6;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.35;
    universe.add(gridHelper);

    // Starfield / Cosmic Particle Dust (2,600 particles)
    const particleCount = 2600;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(particleCount * 3);
    const starCol = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00f0ff);
    const colorPurple = new THREE.Color(0xa855f7);
    const colorPink = new THREE.Color(0xec4899);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const rad = 10 + Math.random() * 55;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      starPos[i3] = rad * Math.cos(phi) * Math.cos(theta);
      starPos[i3 + 1] = rad * Math.sin(phi);
      starPos[i3 + 2] = rad * Math.cos(phi) * Math.sin(theta);

      const r = Math.random();
      const c = r > 0.6 ? colorPurple : r > 0.3 ? colorCyan : colorPink;
      starCol[i3] = c.r;
      starCol[i3 + 1] = c.g;
      starCol[i3 + 2] = c.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    universe.add(starField);

    // ==========================================
    // 3. Central Nexus Station (Origin [0, 0, 0])
    // ==========================================
    const nexusGroup = new THREE.Group();
    universe.add(nexusGroup);

    // Multi-faceted glass core
    const coreGeo = new THREE.IcosahedronGeometry(3.6, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x091428,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.8,
      ior: 1.5,
      thickness: 2.5,
      flatShading: true,
      transparent: true,
      opacity: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    nexusGroup.add(coreMesh);

    // Glowing inner prism seed
    const seedMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(2.0, 0),
      new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0xa855f7,
        emissiveIntensity: 0.9,
        wireframe: true,
      })
    );
    nexusGroup.add(seedMesh);

    // Gyroscopic Holographic Rings
    const createNexusRing = (radius, color, rx, ry) => {
      const g = new THREE.TorusGeometry(radius, 0.05, 16, 100);
      const m = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.9,
        roughness: 0.2,
      });
      const r = new THREE.Mesh(g, m);
      r.rotation.x = rx;
      r.rotation.y = ry;
      nexusGroup.add(r);
      return r;
    };

    const nRing1 = createNexusRing(5.6, 0x00f0ff, Math.PI / 3, 0);
    const nRing2 = createNexusRing(7.0, 0x8b5cf6, -Math.PI / 4, Math.PI / 4);
    const nRing3 = createNexusRing(8.4, 0xec4899, Math.PI / 2.3, -Math.PI / 6);

    // Nexus Base Beacon Disk
    const baseDisk = new THREE.Mesh(
      new THREE.CylinderGeometry(5.2, 5.2, 0.2, 32),
      new THREE.MeshStandardMaterial({ color: 0x080e1a, metalness: 0.9, roughness: 0.3 })
    );
    baseDisk.position.y = -5.8;
    nexusGroup.add(baseDisk);

    const baseRing = new THREE.Mesh(
      new THREE.RingGeometry(5.3, 5.5, 48),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide })
    );
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -5.7;
    nexusGroup.add(baseRing);

    // ==========================================
    // 4. The 8 Spatial Service Sectors
    // ==========================================
    const stations = [];
    const orbitRadius = 18.5;
    const clickableObjects = [];

    SERVICES.forEach((service, index) => {
      const angle = (index / 8) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      const y = Math.sin(angle * 3) * 1.5;

      const stationGroup = new THREE.Group();
      stationGroup.position.set(x, y, z);
      universe.add(stationGroup);

      const hexColor = parseInt(service.accentColor.replace('#', '0x'), 16);

      // Station Hexagonal Platform
      const platGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.35, 6);
      const platMat = new THREE.MeshStandardMaterial({
        color: 0x0c1322,
        roughness: 0.3,
        metalness: 0.8,
      });
      const platform = new THREE.Mesh(platGeo, platMat);
      platform.position.y = -2.2;
      stationGroup.add(platform);

      // Platform Glowing Rim
      const rimGeo = new THREE.RingGeometry(2.5, 2.65, 6);
      const rimMat = new THREE.MeshBasicMaterial({
        color: hexColor,
        side: THREE.DoubleSide,
      });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = -2.0;
      stationGroup.add(rim);

      // 3D Artifact for this service
      const artifactGroup = new THREE.Group();
      stationGroup.add(artifactGroup);

      const glowMat = new THREE.MeshStandardMaterial({
        color: hexColor,
        emissive: hexColor,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });

      const metallicMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.9,
        roughness: 0.2,
      });

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x111c33,
        emissive: hexColor,
        emissiveIntensity: 0.25,
        roughness: 0.1,
        transmission: 0.8,
        transparent: true,
        opacity: 0.85,
      });

      // Construct distinct authentic 3D model
      switch (service.id) {
        case 'web-dev': {
          const browser = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.2, 0.2), glassMat);
          artifactGroup.add(browser);
          const header = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.35, 0.24), metallicMat);
          header.position.y = 0.95;
          artifactGroup.add(header);
          for (let l = 0; l < 3; l++) {
            const bar = new THREE.Mesh(new THREE.BoxGeometry(1.6 - l * 0.3, 0.1, 0.05), glowMat);
            bar.position.set(-0.3, 0.4 - l * 0.4, 0.14);
            artifactGroup.add(bar);
          }
          break;
        }
        case 'app-dev': {
          const phone = new THREE.Mesh(new THREE.BoxGeometry(1.8, 3.4, 0.22), metallicMat);
          artifactGroup.add(phone);
          const screen = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.1, 0.24), glassMat);
          artifactGroup.add(screen);
          for (let a = 0; a < 2; a++) {
            const tile = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.08), glowMat);
            tile.position.set(-0.35 + a * 0.7, 0.5, 0.18);
            artifactGroup.add(tile);
          }
          break;
        }
        case 'ai-chatbot': {
          const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 1), glassMat);
          artifactGroup.add(core);
          const innerCore = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), glowMat);
          artifactGroup.add(innerCore);
          const r1 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.04, 16, 40), glowMat);
          r1.rotation.x = Math.PI / 4;
          artifactGroup.add(r1);
          break;
        }
        case 'media-tech': {
          for (let b = -2; b <= 2; b++) {
            const bar = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2 + Math.abs(b) * 0.8, 0.3), glowMat);
            bar.position.set(b * 0.5, 0, 0);
            artifactGroup.add(bar);
          }
          break;
        }
        case 'site-mgmt': {
          for (let s = -1; s <= 1; s++) {
            const blade = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 1.6), metallicMat);
            blade.position.y = s * 0.8;
            artifactGroup.add(blade);
            const led = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), glowMat);
            led.position.set(0.9, s * 0.8, 0.85);
            artifactGroup.add(led);
          }
          const ring = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.03, 16, 40), glowMat);
          ring.rotation.x = Math.PI / 2.2;
          artifactGroup.add(ring);
          break;
        }
        case 'data-analysis': {
          const heights = [0.8, 1.4, 2.1, 2.9];
          for (let d = 0; d < 4; d++) {
            const col = new THREE.Mesh(new THREE.BoxGeometry(0.45, heights[d], 0.45), d === 3 ? glowMat : metallicMat);
            col.position.set(-0.9 + d * 0.6, heights[d] / 2 - 1.2, 0);
            artifactGroup.add(col);
          }
          break;
        }
        case 'ad-shoots': {
          const barrel = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 1.8, 24), metallicMat);
          barrel.rotation.x = Math.PI / 2;
          artifactGroup.add(barrel);
          const lens = new THREE.Mesh(new THREE.SphereGeometry(1.2, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.4), glassMat);
          lens.rotation.x = -Math.PI / 2;
          lens.position.z = 0.9;
          artifactGroup.add(lens);
          break;
        }
        case 'digital-marketing': {
          const rTarget = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.03, 16, 40), glowMat);
          rTarget.rotation.x = Math.PI / 3;
          artifactGroup.add(rTarget);
          const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.6, 2.2, 4), glowMat);
          arrow.rotation.z = -Math.PI / 4;
          arrow.position.set(0.3, 0.3, 0.2);
          artifactGroup.add(arrow);
          break;
        }
        default:
          break;
      }

      // Raycast Target Box (invisible larger bounding box for easy clicking)
      const hitBox = new THREE.Mesh(
        new THREE.BoxGeometry(5.2, 5.2, 5.2),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitBox.userData = { sectorId: `service-${index}`, service };
      stationGroup.add(hitBox);
      clickableObjects.push(hitBox);

      // Connecting Laser Stream from Nexus to Station
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -3.0, 0),
        new THREE.Vector3(x, y - 2.0, z)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: hexColor,
        transparent: true,
        opacity: 0.3,
      });
      const laserLine = new THREE.Line(lineGeo, lineMat);
      universe.add(laserLine);

      stations.push({
        index,
        group: stationGroup,
        artifact: artifactGroup,
        service,
        pos: new THREE.Vector3(x, y, z),
      });
    });

    // ==========================================
    // 5. Dynamic Lighting
    // ==========================================
    const ambLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambLight);

    const coreLight = new THREE.PointLight(0x00f0ff, 5, 45);
    coreLight.position.set(0, 2, 0);
    scene.add(coreLight);

    const purpleSpot = new THREE.DirectionalLight(0xa855f7, 2.5);
    purpleSpot.position.set(-20, 25, 20);
    scene.add(purpleSpot);

    const pinkSpot = new THREE.DirectionalLight(0xec4899, 2);
    pinkSpot.position.set(20, -10, -20);
    scene.add(pinkSpot);

    // ==========================================
    // 6. Camera Warp Navigation Controller
    // ==========================================
    const updateCameraTargets = (sector) => {
      if (sector === 'nexus') {
        cameraTarget.pos.set(0, 16, 30);
        cameraTarget.lookAt.set(0, 0, 0);
      } else if (sector === 'pipeline') {
        cameraTarget.pos.set(0, 8, 14);
        cameraTarget.lookAt.set(0, 2, 0);
      } else if (sector === 'launch') {
        cameraTarget.pos.set(0, 2.5, 9.5);
        cameraTarget.lookAt.set(0, 0, 0);
      } else if (sector.startsWith('service-')) {
        const idx = parseInt(sector.split('-')[1], 10);
        const st = stations[idx];
        if (st) {
          // Camera approaches station in 3D space
          const normal = st.pos.clone().normalize();
          const camPos = st.pos.clone().add(normal.clone().multiplyScalar(5.5)).add(new THREE.Vector3(0, 1.8, 0));
          cameraTarget.pos.copy(camPos);
          cameraTarget.lookAt.copy(st.pos);
        }
      }
    };

    updateCameraRef.current = updateCameraTargets;
    updateCameraTargets(currentSector);

    // ==========================================
    // 7. Raycasting & Spatial Click Handling
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerClick = (e) => {
      // Ignore if dragging/orbiting
      if (stateRef.current.isDragging) return;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects);

      if (intersects.length > 0) {
        const target = intersects[0].object;
        if (target.userData && target.userData.sectorId) {
          sound.playWarp();
          onSelectSector(target.userData.sectorId);
        }
      }
    };

    window.addEventListener('click', onPointerClick);

    // ==========================================
    // 8. 3D Orbit & Drag Controls
    // ==========================================
    let isMouseDown = false;
    let dragDistance = 0;
    let prevMouse = { x: 0, y: 0 };
    let orbitAngle = 0;

    const onMouseDown = (e) => {
      isMouseDown = true;
      dragDistance = 0;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isMouseDown) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      dragDistance += Math.abs(dx) + Math.abs(dy);

      if (dragDistance > 5) {
        stateRef.current.isDragging = true;
      }

      // If at Nexus, rotate entire universe
      if (stateRef.current.currentSector === 'nexus') {
        universe.rotation.y += dx * 0.005;
        camera.position.y = THREE.MathUtils.clamp(camera.position.y - dy * 0.05, 4, 32);
      } else {
        // Orbit around focused station
        universe.rotation.y += dx * 0.003;
      }

      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isMouseDown = false;
      setTimeout(() => {
        stateRef.current.isDragging = false;
      }, 50);
    };

    const onWheel = (e) => {
      // Zoom camera in/out with clamp
      const zoomDelta = e.deltaY * 0.02;
      const dist = cameraTarget.pos.length();
      if ((dist > 8 || zoomDelta > 0) && (dist < 45 || zoomDelta < 0)) {
        cameraTarget.pos.add(cameraTarget.pos.clone().normalize().multiplyScalar(zoomDelta));
      }
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('wheel', onWheel, { passive: true });

    // Window Resize
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // ==========================================
    // 9. Main Animation Loop
    // ==========================================
    let animId;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Smooth camera interpolation
      cameraCurrent.pos.lerp(cameraTarget.pos, 0.045);
      cameraCurrent.lookAt.lerp(cameraTarget.lookAt, 0.045);

      camera.position.copy(cameraCurrent.pos);
      camera.lookAt(cameraCurrent.lookAt);

      // Nexus Core animations
      coreMesh.rotation.y = time * 0.25;
      coreMesh.rotation.x = Math.sin(time * 0.15) * 0.15;
      seedMesh.rotation.y = -time * 0.4;
      seedMesh.rotation.z = time * 0.3;

      nRing1.rotation.z = time * 0.3;
      nRing2.rotation.x = -time * 0.25;
      nRing3.rotation.y = time * 0.2;

      // Animate service station artifacts
      stations.forEach((st, idx) => {
        st.artifact.rotation.y = time * 0.5 + idx;
        st.artifact.position.y = Math.sin(time * 1.8 + idx) * 0.2;
      });

      // Gentle starfield sway
      starField.rotation.y = time * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('click', onPointerClick);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('wheel', onWheel);
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
      className="fixed inset-0 w-screen h-screen z-0 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'none' }}
    />
  );
}
