import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface ThreeRoyalCanvasProps {
  className?: string;
  particleDensity?: number;
}

export const ThreeRoyalCanvas: React.FC<ThreeRoyalCanvasProps> = ({
  className = '',
  particleDensity = 140,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to adapt load
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x270309, 0.04);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Procedural environment lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Warm & Cool Indian Wedding Ambient & Key Lights
    const warmKeyLight = new THREE.DirectionalLight(0xf7e6b0, 1.8);
    warmKeyLight.position.set(5, 8, 10);
    scene.add(warmKeyLight);

    const fillLight = new THREE.HemisphereLight(0x510712, 0x270309, 1.2);
    scene.add(fillLight);

    const goldPoint = new THREE.PointLight(0xd6b56d, 2.5, 20);
    goldPoint.position.set(0, 0, 4);
    scene.add(goldPoint);

    // 1. Floating 3D Golden Dust & Embers
    const count = isSoftwareGl ? Math.floor(particleDensity * 0.5) : particleDensity;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const sways = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      scales[i] = Math.random() * 0.12 + 0.04;
      speeds[i] = Math.random() * 0.015 + 0.005;
      sways[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Procedural round gold spark texture
    const sparkCanvas = document.createElement('canvas');
    sparkCanvas.width = 64;
    sparkCanvas.height = 64;
    const ctx = sparkCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 240, 1)');
    grad.addColorStop(0.3, 'rgba(247, 230, 176, 0.85)');
    grad.addColorStop(0.7, 'rgba(214, 181, 109, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();

    const sparkTexture = new THREE.CanvasTexture(sparkCanvas);
    sparkTexture.colorSpace = THREE.SRGBColorSpace;

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: sparkTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xf7e6b0,
    });

    const particleSystem = new THREE.Points(geometry, particlesMaterial);
    scene.add(particleSystem);

    // 2. Slow rotating 3D Golden Torus / Rings in depth
    const ringGroup = new THREE.Group();
    ringGroup.position.z = -4;

    const ringGeo = new THREE.TorusGeometry(3.6, 0.035, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd6b56d,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x510712,
      emissiveIntensity: 0.2,
    });

    const outerRing = new THREE.Mesh(ringGeo, ringMat);
    ringGroup.add(outerRing);

    const innerRingGeo = new THREE.TorusGeometry(2.4, 0.02, 16, 80);
    const innerRing = new THREE.Mesh(innerRingGeo, ringMat);
    ringGroup.add(innerRing);

    scene.add(ringGroup);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      // Update particle upward drift & sway
      for (let i = 0; i < count; i++) {
        array[i * 3 + 1] += speeds[i]; // float up
        array[i * 3] += Math.sin(elapsed + sways[i]) * 0.005; // gentle horizontal drift

        // Wrap around when rising past top
        if (array[i * 3 + 1] > 10) {
          array[i * 3 + 1] = -10;
          array[i * 3] = (Math.random() - 0.5) * 24;
        }
      }
      posAttr.needsUpdate = true;

      // Gentle rotation for background sacred rings
      ringGroup.rotation.z = elapsed * 0.04;
      ringGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.15;
      ringGroup.rotation.y = Math.cos(elapsed * 0.15) * 0.15;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      particlesMaterial.dispose();
      sparkTexture.dispose();
      ringGeo.dispose();
      innerRingGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [particleDensity]);

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
