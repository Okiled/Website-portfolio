import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

/*
  React + TypeScript + Tailwind + Vite port of the provided HTML/JS.
  Behavior, visuals, and parameters are kept 1:1.
*/

interface ParticleDatum {
  originalPos: THREE.Vector3;
  currentPos: THREE.Vector3;
  velocity: THREE.Vector3;
}

const CosmicParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Inject Google Fonts and global styles to match the original exactly
    const link1 = document.createElement("link");
    link1.rel = "preconnect";
    link1.href = "https://fonts.googleapis.com";

    const link2 = document.createElement("link");
    link2.rel = "preconnect";
    link2.href = "https://fonts.gstatic.com";
    link2.crossOrigin = "anonymous";

    const link3 = document.createElement("link");
    link3.rel = "stylesheet";
    link3.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Inter:wght@400&display=swap";

    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      body { font-family: 'Inter', sans-serif; background-color: #030014; }
      #bg-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; }
      .content-container { position: relative; z-index: 1; }
      h1 { font-family: 'Playfair Display', serif; }
      .text-shadow-gold { text-shadow: 0 0 15px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 165, 0, 0.3); }
      .button-glow { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); transition: all 0.3s ease; }
      .button-glow:hover { box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 165, 0, 0.4); }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .fade-in { animation: fadeIn 1.5s ease-out 0.5s forwards; opacity: 0; }
    `;

    document.head.appendChild(link1);
    document.head.appendChild(link2);
    document.head.appendChild(link3);
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
      document.head.removeChild(link3);
      document.head.removeChild(styleEl);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let composer: EffectComposer;
    let particles: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
    let energyLines: Line2[] = [];
    const mouse = new THREE.Vector2(10000, 10000);
    const particleData: ParticleDatum[] = [];

    const clock = new THREE.Clock();
    let rafId = 0;

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 50);

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.0,
        0.8,
        0.1
      );
      composer.addPass(bloomPass);

      createMainParticles();
      createEnergyLines();

      window.addEventListener("resize", onWindowResize);
      window.addEventListener("mousemove", onMouseMove);
    }

    function createMainParticles() {
      const particleCount = 15000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const baseColor = new THREE.Color(0x001f3f);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = (Math.random() - 0.5) * 120;
        const y = (Math.random() - 0.5) * 120;

        const originalZ = (Math.random() - 0.5) * 20;
        const currentZ = (Math.random() - 0.5) * 20;

        particleData.push({
          originalPos: new THREE.Vector3(x, y, originalZ),
          currentPos: new THREE.Vector3(x, y, currentZ),
          velocity: new THREE.Vector3(),
        });

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = originalZ;

        baseColor.toArray(colors, i3);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);
    }

    function createEnergyLines() {
      const lineCount = 30;
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < lineCount; i++) {
        const geometry = new LineGeometry();
        const points: number[] = [];
        const z = (Math.random() - 0.5) * 150 - 75;
        const startX = (Math.random() - 0.5) * 150;
        const startY = (Math.random() - 0.5) * 150;
        const length = Math.random() * 10 + 5;

        points.push(startX, startY, z);
        points.push(startX, startY - length, z);
        geometry.setPositions(points);

        const material = new LineMaterial({
          color: 0x88aaff,
          linewidth: 0.003,
          transparent: true,
          opacity: 0.5,
          dashed: false,
        });
        // Important for LineMaterial in screen space
        material.resolution.set(width, height);

        const line = new Line2(geometry, material);
        (line as any).computeLineDistances?.();

        (line as any).userData = {
          speed: Math.random() * 30 + 15,
          originalZ: z,
        };

        energyLines.push(line);
        scene.add(line);
      }
    }

    function onWindowResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      composer.setSize(width, height);

      energyLines.forEach((line) => {
        (line.material as LineMaterial).resolution.set(width, height);
      });
    }

    function onMouseMove(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function animate() {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      rafId = requestAnimationFrame(animate);

      const mousePos3D = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      mousePos3D.unproject(camera);
      const dir = mousePos3D.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const finalMousePos = camera.position.clone().add(dir.multiplyScalar(distance));

      const positions = (particles.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      const colors = (particles.geometry.attributes.color as THREE.BufferAttribute).array as Float32Array;
      const highlightColor = new THREE.Color(0xffd700);

      for (let i = 0; i < particleData.length; i++) {
        const i3 = i * 3;
        const data = particleData[i];

        const diff = new THREE.Vector3().subVectors(data.currentPos, finalMousePos);
        const dist = diff.length();
        let force = 0;
        if (dist < 20) {
          force = (1 - dist / 20) * 0.1;
          diff.normalize();
          data.velocity.add(diff.multiplyScalar(force));
        }

        const springForce = new THREE.Vector3()
          .subVectors(data.originalPos, data.currentPos)
          .multiplyScalar(0.01);
        data.velocity.add(springForce);
        data.velocity.multiplyScalar(0.92);

        data.currentPos.add(data.velocity);

        positions[i3] = data.currentPos.x;
        positions[i3 + 1] = data.currentPos.y;
        positions[i3 + 2] =
          data.currentPos.z + Math.sin(data.originalPos.x * 0.1 + elapsedTime) * 5.0;

        const colorMix = dist < 20 ? 1 - dist / 20 : 0;
        const color = new THREE.Color(0x001f3f).lerp(highlightColor, colorMix);
        color.toArray(colors, i3);
      }

      (particles.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (particles.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      energyLines.forEach((line) => {
        line.position.z = line.position.z + (line as any).userData.speed * delta;
        if (line.position.z > 50) {
          line.position.z = -150;
        }
      });

      composer.render();
    }

    init();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onMouseMove);

      // Clean up three objects
      energyLines.forEach((line) => {
        line.geometry.dispose();
        (line.material as LineMaterial).dispose();
        scene.remove(line);
      });

      if (particles) {
        particles.geometry.dispose();
        particles.material.dispose();
        scene.remove(particles);
      }

      composer?.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="content-container w-full h-screen flex items-center justify-center p-4">
      <canvas id="bg-canvas" ref={canvasRef} />

      {/* Content block (kept intentionally minimal to match original) */}
      <div className="text-center max-w-3xl mx-auto fade-in">
        <div className="mt-10 flex items-center justify-center">{/* Intentionally empty */}</div>
      </div>
    </div>
  );
};

export default CosmicParticles;