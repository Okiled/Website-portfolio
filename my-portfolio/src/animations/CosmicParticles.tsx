import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

type PointsWithUserData = THREE.Points & {
  userData: {
    fromPositions?: Float32Array;
    toPositions?: Float32Array;
    fromColors?: Float32Array;
    toColors?: Float32Array;
  };
};

const CosmicParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const sceneRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    clock: THREE.Clock;
    particles: PointsWithUserData | null;
    stars: PointsWithUserData | null;
    nebulaLayer1: THREE.Points | null;
    nebulaLayer2: THREE.Points | null;
    nebulaLayer3: THREE.Points | null;
    currentPattern: number;
    isTransitioning: boolean;
    transitionProgress: number;
    raf: number | null;
    disposables: Array<{ dispose: () => void }>;
    onResize?: () => void;
    onPointer?: () => void;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    clock: new THREE.Clock(),
    particles: null,
    stars: null,
    nebulaLayer1: null,
    nebulaLayer2: null,
    nebulaLayer3: null,
    currentPattern: 0,
    isTransitioning: false,
    transitionProgress: 0,
    raf: null,
    disposables: [],
  });

  useEffect(() => {
    const el = containerRef.current!;
    const S = sceneRef.current;

    // --- constants (ambil dari template) ---
    const particleCount = 15000;
    const starCount = 7000;
    const transitionSpeed = 0.015;

    const patternPalettes = [
      [new THREE.Color(0x00509e), new THREE.Color(0x00b4d8), new THREE.Color(0xade8f4)],
      [new THREE.Color(0x4a00e0), new THREE.Color(0x8e2de2), new THREE.Color(0xc166d8)],
      [new THREE.Color(0xff6b6b), new THREE.Color(0xffb8b8), new THREE.Color(0xfff1f1)],
      [new THREE.Color(0x007f5f), new THREE.Color(0x55a630), new THREE.Color(0xaacc00)],
    ];

    // --- init scene/camera/renderer ---
    S.scene = new THREE.Scene();
    S.scene.fog = new THREE.FogExp2(0x000815, 0.008);

    S.camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 2000);
    S.camera.position.z = 50;

    S.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    S.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    S.renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(S.renderer.domElement);

    // --- helpers dari template ---
    const normalizePoints = (points: THREE.Vector3[], size: number) => {
      if (points.length === 0) return points;
      const box = new THREE.Box3().setFromPoints(points);
      if (box.isEmpty() || !isFinite(box.max.x) || !isFinite(box.min.x)) {
        points.forEach((p) => p.set(0, 0, 0));
        return points;
      }
      const center = box.getCenter(new THREE.Vector3());
      const boxSize = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(boxSize.x, boxSize.y, boxSize.z);
      const scale = maxDim > 1e-6 ? size / maxDim : 1.0;
      points.forEach((p) => {
        if (isFinite(p.x) && isFinite(p.y) && isFinite(p.z)) {
          p.sub(center).multiplyScalar(scale);
        } else {
          p.set(0, 0, 0);
        }
      });
      return points;
    };

    const createTorusKnotPoints = (count: number) => {
      const points: THREE.Vector3[] = [];
      const radius = 18,
        tube = 6,
        p = 5,
        q = 4,
        twists = 2;
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2 * q;
        const angle = (p / q) * t;
        const R = radius + tube * Math.cos(t);
        const baseX = R * Math.cos(angle);
        const baseY = R * Math.sin(angle);
        const baseZ = tube * Math.sin(t);
        const twistAngle = twists * t;
        const twistRadius = 1.5;
        const normal = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
        const tangent =
          R > 1e-6
            ? new THREE.Vector3(-R * Math.sin(angle), R * Math.cos(angle), tube * Math.cos(t)).normalize()
            : new THREE.Vector3(0, 0, 1);
        const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();
        const x = baseX + twistRadius * (binormal.x * Math.cos(twistAngle) + normal.x * Math.sin(twistAngle));
        const y = baseY + twistRadius * (binormal.y * Math.cos(twistAngle) + normal.y * Math.sin(twistAngle));
        const z = baseZ + twistRadius * (binormal.z * Math.cos(twistAngle) + normal.z * Math.sin(twistAngle));
        points.push(new THREE.Vector3(x, y, z));
      }
      return normalizePoints(points, 65);
    };

    const createEllipticalOrbitPoints = (count: number) => {
      const points: THREE.Vector3[] = [];
      const numOrbits = 8;
      const particlesPerOrbit = Math.floor(count / numOrbits);
      const baseRadius = 6,
        orbitSpacing = 4;
      for (let orbit = 0; orbit < numOrbits; orbit++) {
        const eccentricity = 0.5 + Math.random() * 0.45;
        const a = baseRadius + orbit * orbitSpacing * (1 + (orbit / numOrbits) * 0.5);
        const b = a * Math.sqrt(1 - Math.min(eccentricity, 0.999) ** 2);
        const tiltX = (Math.random() - 0.5) * (Math.PI / 2.5);
        const tiltY = (Math.random() - 0.5) * (Math.PI / 2.5);
        const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(tiltX, tiltY, Math.random() * Math.PI));
        for (let i = 0; i < particlesPerOrbit; i++) {
          const theta = (i / particlesPerOrbit) * Math.PI * 2;
          const radiusFactor = 1.0 + (Math.random() - 0.5) * 0.1;
          const angleOffset = (Math.random() - 0.5) * 0.05;
          const x = a * Math.cos(theta + angleOffset) * radiusFactor;
          const y = b * Math.sin(theta + angleOffset) * radiusFactor;
          const zWave = 1.5 * Math.sin(theta * 3 + orbit * 0.5);
          const point = new THREE.Vector3(x, y, zWave).applyQuaternion(rotation);
          points.push(point);
        }
      }
      for (let i = points.length; i < count; i++) {
        points.push(points[i % points.length].clone().multiplyScalar(1 + (Math.random() - 0.5) * 0.05));
      }
      return normalizePoints(points, 70);
    };

    const createWaveOrbitPoints = (count: number) => {
      const points: THREE.Vector3[] = [];
      const baseRadius = 20,
        rAmp1 = 6,
        rFreq1 = 3,
        rAmp2 = 2.5,
        rFreq2 = 7;
      const zAmp1 = 5,
        zFreq1 = 4,
        zAmp2 = 2,
        zFreq2 = 11;
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        const currentRadius = baseRadius + rAmp1 * Math.sin(rFreq1 * t) + rAmp2 * Math.cos(rFreq2 * t + Math.PI / 3);
        const x = currentRadius * Math.cos(t);
        const y = currentRadius * Math.sin(t);
        const z = zAmp1 * Math.sin(zFreq1 * t + Math.PI / 5) + zAmp2 * Math.cos(zFreq2 * t);
        points.push(new THREE.Vector3(x, y, z));
      }
      return normalizePoints(points, 60);
    };

    const createCosmicWebPoints = (count: number) => {
      const points: THREE.Vector3[] = [];
      const numStrands = 15;
      const particlesPerStrand = Math.floor(count / numStrands);
      const scale = 80;
      for (let i = 0; i < numStrands; i++) {
        const start = new THREE.Vector3((Math.random() - 0.5) * scale, (Math.random() - 0.5) * scale, (Math.random() - 0.5) * scale);
        const end = new THREE.Vector3((Math.random() - 0.5) * scale, (Math.random() - 0.5) * scale, (Math.random() - 0.5) * scale);
        const control1 = start.clone().lerp(end, 0.33).add(new THREE.Vector3().randomDirection().multiplyScalar(scale / 4));
        const control2 = start.clone().lerp(end, 0.66).add(new THREE.Vector3().randomDirection().multiplyScalar(scale / 4));
        const curve = new THREE.CubicBezierCurve3(start, control1, control2, end);
        const strandPoints = curve.getPoints(particlesPerStrand - 1);
        points.push(...strandPoints);
      }
      for (let i = points.length; i < count; i++) {
        points.push(points[i % points.length].clone().multiplyScalar(1 + (Math.random() - 0.5) * 0.05));
      }
      return normalizePoints(points, 80);
    };

    const patterns = [createTorusKnotPoints, createEllipticalOrbitPoints, createWaveOrbitPoints, createCosmicWebPoints];

    // --- stars (shader) ---
    const createStarfield = (): PointsWithUserData => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const randoms = new Float32Array(starCount);
      const starRadius = 800;

      for (let i = 0; i < starCount; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = starRadius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = starRadius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = starRadius * Math.cos(phi);

        const hue = 0.55 + Math.random() * 0.2;
        const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        randoms[i] = Math.random() * Math.PI * 2;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("random", new THREE.BufferAttribute(randoms, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          uniform float time;
          attribute float random;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float size = 1.5 + 0.5 * sin(time * 0.5 + random);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.48) discard;
            gl_FragColor = vec4(vColor, 1.0);
          }
        `,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      });

      const pts = new THREE.Points(geometry, material) as PointsWithUserData;
      return pts;
    };

    // --- nebula layers ---
    const createNebulaStars = (numStars: number, baseSize: number, sizeVariation: number, radius: number, opacity: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(numStars * 3);
      const colors = new Float32Array(numStars * 3);
      const sizes = new Float32Array(numStars);

      for (let i = 0; i < numStars; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        const hue = 0.6 + Math.random() * 0.2;
        const color = new THREE.Color().setHSL(hue, 0.3, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        sizes[i] = baseSize + Math.random() * sizeVariation;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: { uOpacity: { value: opacity } },
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform float uOpacity;
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
            gl_FragColor = vec4(vColor, alpha * uOpacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      });

      const pts = new THREE.Points(geometry, material);
      return pts;
    };

    // --- main particles (shader) ---
    const createParticleSystem = (): PointsWithUserData => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const randoms = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        sizes[i] = 0.5 + Math.random() * 3.5;
        randoms[i] = Math.random() * Math.PI * 2;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("random", new THREE.BufferAttribute(randoms, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          uniform float time;
          attribute float size;
          attribute float random;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec3 pos = position;
            float angle = time * 0.4 + random;
            float displacement = 0.5 + sin(random * 2.0) * 0.2;
            pos.x += sin(angle + pos.y * 0.1) * displacement;
            pos.y += cos(angle + pos.z * 0.1) * displacement;
            pos.z += sin(angle + pos.x * 0.1) * displacement;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            float pulse = 0.95 + 0.05 * sin(time * 1.5 + random);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = size * pulse * (300.0 / -mvPosition.z);
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      });

      const pts = new THREE.Points(geometry, material) as PointsWithUserData;
      pts.userData = {};
      return pts;
    };

    // --- create scene objects ---
    const stars = (S.stars = createStarfield());
    S.scene.add(stars);
    const nebulaLayer1 = (S.nebulaLayer1 = createNebulaStars(200, 15, 8, 700, 0.15));
    const nebulaLayer2 = (S.nebulaLayer2 = createNebulaStars(300, 8, 5, 600, 0.3));
    const nebulaLayer3 = (S.nebulaLayer3 = createNebulaStars(400, 5, 3, 500, 0.5));
    S.scene.add(nebulaLayer1, nebulaLayer2, nebulaLayer3);
    const particles = (S.particles = createParticleSystem());
    S.scene.add(particles);

    // track disposables
    S.disposables.push(
      stars.geometry,
      (stars.material as THREE.Material),
      nebulaLayer1.geometry,
      (nebulaLayer1.material as THREE.Material),
      nebulaLayer2.geometry,
      (nebulaLayer2.material as THREE.Material),
      nebulaLayer3.geometry,
      (nebulaLayer3.material as THREE.Material),
      particles.geometry,
      (particles.material as THREE.Material)
    );

    // --- postprocessing ---
    S.composer = new EffectComposer(S.renderer);
    S.composer.addPass(new RenderPass(S.scene, S.camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(el.clientWidth, el.clientHeight), 0.35, 0.4, 0.8);
    S.composer.addPass(bloomPass);
    S.composer.addPass(new OutputPass());

    // --- helpers for patterns + colors ---
    const setInitialPattern = () => {
      if (!S.particles) return;
      const points = patterns[S.currentPattern](particleCount);
      const pos = S.particles.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const p = points[i] ?? new THREE.Vector3();
        pos.setXYZ(i, p.x, p.y, p.z);
      }
      pos.needsUpdate = true;

      const colors = S.particles.geometry.getAttribute("color") as THREE.BufferAttribute;
      const palette = patternPalettes[S.currentPattern];
      for (let i = 0; i < particleCount; i++) {
        const c = palette[i % palette.length];
        colors.setXYZ(i, c.r, c.g, c.b);
      }
      colors.needsUpdate = true;
    };

    const startTransition = () => {
      if (!S.particles) return;
      S.isTransitioning = true;
      S.transitionProgress = 0;

      const nextPoints = patterns[S.currentPattern](particleCount);
      const fromPositions = new Float32Array((S.particles.geometry.getAttribute("position") as THREE.BufferAttribute).array);
      const toPositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const p = nextPoints[i];
        const idx = i * 3;
        if (p) {
          toPositions[idx] = p.x;
          toPositions[idx + 1] = p.y;
          toPositions[idx + 2] = p.z;
        } else {
          toPositions[idx] = fromPositions[idx];
          toPositions[idx + 1] = fromPositions[idx + 1];
          toPositions[idx + 2] = fromPositions[idx + 2];
        }
      }

      const fromColors = new Float32Array((S.particles.geometry.getAttribute("color") as THREE.BufferAttribute).array);
      const toColors = new Float32Array(particleCount * 3);
      const palette = patternPalettes[S.currentPattern];
      for (let i = 0; i < particleCount; i++) {
        const c = palette[i % palette.length];
        toColors[i * 3] = c.r;
        toColors[i * 3 + 1] = c.g;
        toColors[i * 3 + 2] = c.b;
      }

      S.particles.userData.fromPositions = fromPositions;
      S.particles.userData.toPositions = toPositions;
      S.particles.userData.fromColors = fromColors;
      S.particles.userData.toColors = toColors;
    };

    const updateTransition = () => {
      if (!S.isTransitioning || !S.particles) return;

      S.transitionProgress += transitionSpeed;
      let eased = 0.5 - Math.cos(S.transitionProgress * Math.PI) * 0.5;
      if (S.transitionProgress >= 1) {
        eased = 1;
        S.isTransitioning = false;
      }

      const posAttr = S.particles.geometry.getAttribute("position") as THREE.BufferAttribute;
      const colAttr = S.particles.geometry.getAttribute("color") as THREE.BufferAttribute;
      const fromPos = S.particles.userData.fromPositions!;
      const toPos = S.particles.userData.toPositions!;
      const fromCol = S.particles.userData.fromColors!;
      const toCol = S.particles.userData.toColors!;

      for (let i = 0; i < posAttr.array.length; i++) {
        posAttr.array[i] = fromPos[i] + (toPos[i] - fromPos[i]) * eased;
      }
      posAttr.needsUpdate = true;

      for (let i = 0; i < colAttr.array.length; i++) {
        colAttr.array[i] = fromCol[i] + (toCol[i] - fromCol[i]) * eased;
      }
      colAttr.needsUpdate = true;

      if (!S.isTransitioning) {
        delete S.particles.userData.fromPositions;
        delete S.particles.userData.toPositions;
        delete S.particles.userData.fromColors;
        delete S.particles.userData.toColors;
      }
    };

    // --- initial pattern/colors ---
    setInitialPattern();

    // --- interactions & resize ---
    S.onPointer = () => {
      if (!S.isTransitioning) {
        S.currentPattern = (S.currentPattern + 1) % patterns.length;
        startTransition();
      }
    };
    // ✅ ganti dari pointerdown ke pointermove
     window.addEventListener("cosmic:move", S.onPointer as EventListener);


    S.onResize = () => {
      if (!S.camera || !S.renderer || !S.composer) return;
      S.camera.aspect = el.clientWidth / el.clientHeight;
      S.camera.updateProjectionMatrix();
      S.renderer.setSize(el.clientWidth, el.clientHeight);
      S.composer.setSize(el.clientWidth, el.clientHeight);
    };
    const resizeObs = new ResizeObserver(S.onResize);
    resizeObs.observe(el);

    // --- render loop ---
    const animate = () => {
      const delta = S.clock.getDelta();
      const t = S.clock.getElapsedTime();

      updateTransition();

      if (S.camera) {
        const orbitRadius = 60 - 20 * Math.sin(S.transitionProgress * Math.PI);
        S.camera.position.x = Math.sin(t * 0.08) * orbitRadius;
        S.camera.position.z = Math.cos(t * 0.08) * orbitRadius;
        S.camera.position.y = Math.sin(t * 0.1) * 20;
        S.camera.lookAt(0, 0, 0);
      }

      // update shader uniforms (hindari error undefined)
      if (S.particles) {
        const mat = S.particles.material;
        if (mat instanceof THREE.ShaderMaterial) {
          mat.uniforms.time.value = t;
        }
      }
      if (S.stars) {
        const mat = S.stars.material;
        if (mat instanceof THREE.ShaderMaterial) {
          mat.uniforms.time.value = t;
        }
      }

      if (S.nebulaLayer1) S.nebulaLayer1.rotation.y += 0.00005;
      if (S.nebulaLayer2) S.nebulaLayer2.rotation.y += 0.0001;
      if (S.nebulaLayer3) S.nebulaLayer3.rotation.y += 0.00015;

      if (S.composer) S.composer.render(delta);
      else if (S.renderer && S.scene && S.camera) S.renderer.render(S.scene, S.camera);

      S.raf = requestAnimationFrame(animate);
    };
    animate();

    // --- cleanup ---
    return () => {
      if (S.raf) cancelAnimationFrame(S.raf);
      resizeObs.disconnect();
      if (S.onPointer) window.removeEventListener("cosmic:move", S.onPointer as EventListener);
      if (S.renderer) {
        el.removeChild(S.renderer.domElement);
        S.renderer.dispose();
      }
      S.disposables.forEach((d) => d.dispose?.());
      S.scene = null;
      S.camera = null;
      S.renderer = null;
      S.composer = null;
      S.particles = null;
      S.stars = null;
      S.nebulaLayer1 = null;
      S.nebulaLayer2 = null;
      S.nebulaLayer3 = null;
    };
  }, []);

  // Wrapper full-screen + radial gradient background
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #001a35 0%, #00050a 100%)",
      }}
    >
    </div>
  );
};

export default CosmicParticles;