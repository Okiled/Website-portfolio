import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import * as THREE from "three";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

/* =========================
   ENHANCED SHADERS
   ========================= */

const NOISE3D = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 6; i++) {
    value += amplitude * snoise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}
`;

// Enhanced loading ring with energy field
const ENHANCED_ICON_FS = `
precision highp float;
uniform float uTime;
uniform float uProgress;
uniform float uEnergy;
uniform vec2 uRes;

${NOISE3D}

float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

float sdRing(vec2 p, float r, float thickness) {
  return abs(length(p) - r) - thickness;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uRes) * 2.0 - 1.0;
  uv.x *= uRes.x / uRes.y;
  
  float time = uTime * 0.8;
  
  // Dynamic breathing with energy
  float breath = 0.02 * sin(time * 3.0) * uEnergy;
  float pulse = 0.01 * sin(time * 8.0) * uProgress;
  uv *= 1.0 + breath + pulse;
  
  // Multi-layer noise displacement
  vec3 noisePos = vec3(uv * 1.8, time * 0.4);
  float displacement = fbm(noisePos) * 0.012 * uEnergy;
  uv += displacement;
  
  // Multiple ring layers
  float mainRing = sdRing(uv, 0.32, 0.008);
  float innerRing = sdRing(uv, 0.28, 0.004);
  float outerRing = sdRing(uv, 0.36, 0.006);
  
  // Energy field
  float dist = length(uv);
  float energyField = smoothstep(0.5, 0.2, dist) * uEnergy * 0.3;
  
  // Progressive ring appearance
  float ringMask = smoothstep(0.98, 0.02, uProgress);
  
  // Color transitions
  float hue = time * 0.1 + dist * 0.8;
  vec3 energyColor = hsv2rgb(vec3(hue, 0.8, 1.0));
  
  // Main ring glow
  float mainGlow = smoothstep(0.02, 0.0, mainRing) * 2.0;
  float innerGlow = smoothstep(0.015, 0.0, innerRing) * 1.5;
  float outerGlow = smoothstep(0.025, 0.0, outerRing) * 1.2;
  
  // Combine all elements
  vec3 col = vec3(0.0);
  col += vec3(mainGlow) * mix(vec3(1.0), energyColor, 0.3);
  col += vec3(innerGlow) * energyColor * 0.8;
  col += vec3(outerGlow) * energyColor * 0.6;
  col += energyField * energyColor;
  
  // Progress-based fade with sophisticated curve
  float fade = 1.0 - smoothstep(0.75, 1.0, uProgress);
  fade *= fade; // quadratic falloff
  
  // Add subtle noise to prevent banding
  col += (fbm(vec3(uv * 50.0, time)) * 0.01 - 0.005);
  
  gl_FragColor = vec4(col * fade, fade);
}
`;

// Enhanced particle system shader
const PARTICLE_VS = `
precision highp float;
attribute vec3 position;
attribute vec3 velocity;
attribute float life;
attribute float size;
attribute vec3 color;
uniform float uTime;
uniform float uProgress;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
varying float vLife;
varying vec3 vColor;

void main() {
  vec3 pos = position + velocity * uTime * 0.5;
  
  // Swirl effect as particles move to center
  float angle = atan(pos.y, pos.x) + uTime * 2.0 * uProgress;
  float radius = length(pos.xy) * (1.0 - uProgress * 0.8);
  pos.x = radius * cos(angle);
  pos.y = radius * sin(angle);
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + uProgress);
  
  vLife = life;
  vColor = color;
}
`;

const PARTICLE_FS = `
precision highp float;
uniform float uTime;
varying float vLife;
varying vec3 vColor;

void main() {
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  
  if (dist > 0.5) discard;
  
  float alpha = (1.0 - dist * 2.0) * vLife;
  alpha *= alpha; // smoother falloff
  
  // Add sparkle effect
  float sparkle = sin(uTime * 10.0 + dist * 20.0) * 0.3 + 0.7;
  
  gl_FragColor = vec4(vColor * sparkle, alpha);
}
`;

// Enhanced wipe with energy dissolution
const ENHANCED_WIPE_FS = `
precision highp float;
uniform float uRadius;
uniform float uTime;
uniform vec2 uRes;

${NOISE3D}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 center = uv - 0.5;
  float dist = length(center);
  
  // Add noise to the wipe edge for organic dissolution
  float noise = fbm(vec3(center * 8.0, uTime)) * 0.02;
  float adjustedRadius = uRadius + noise;
  
  // Smooth transition with energy effect
  float mask = smoothstep(adjustedRadius - 0.01, adjustedRadius + 0.01, dist);
  
  // Add energy rings at the wipe edge
  float edgeGlow = exp(-abs(dist - adjustedRadius) * 50.0) * 0.3;
  
  vec3 col = vec3(edgeGlow);
  gl_FragColor = vec4(col, mask);
}
`;

const FULLSCREEN_VS = `
precision highp float;
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/* =========================
   ENHANCED COMPONENTS
   ========================= */

function useFullscreenQuadMaterial(fragmentShader: string, uniforms: Record<string, any>) {
  const mat = useMemo(() => {
    const material = new THREE.RawShaderMaterial({
      vertexShader: FULLSCREEN_VS,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      blending: THREE.AdditiveBlending,
      uniforms: Object.fromEntries(
        Object.entries(uniforms).map(([k, v]) => [k, { value: v }])
      ),
    });
    return material;
  }, [fragmentShader]);
  return mat;
}

// Custom Canvas component without react-three/fiber
const CustomCanvas: React.FC<{ children: React.ReactNode; className: string }> = ({ children, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.set(0, 0, 1);

    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;

    const handleResize = () => {
      if (canvas && renderer && camera) {
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        renderer.setSize(width, height);
        camera.left = -width / height;
        camera.right = width / height;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

// Simplified 3D visualization without react-three/fiber
const VisualLoader: React.FC<{ timeline: number; energy: number }> = ({ timeline, energy }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true 
    });
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 1000);
    camera.position.z = 1;

    renderer.setSize(320, 320);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create animated ring geometry
    const ringGeometry = new THREE.RingGeometry(0.28, 0.32, 64);
    const ringMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: timeline },
        uEnergy: { value: energy }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform float uEnergy;
        varying vec2 vUv;
        
        vec3 hsv2rgb(vec3 c) {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        
        void main() {
          vec2 center = vUv - 0.5;
          float dist = length(center);
          float angle = atan(center.y, center.x);
          
          float hue = uTime * 0.1 + angle * 0.1 + dist * 0.5;
          vec3 color = hsv2rgb(vec3(hue, 0.8, 1.0));
          
          float glow = sin(uTime * 4.0 + dist * 20.0) * 0.3 + 0.7;
          float alpha = glow * uEnergy * (1.0 - smoothstep(0.9, 1.0, uProgress));
          
          gl_FragColor = vec4(color, alpha);
        }
      `
    });

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    scene.add(ring);

    // Create particles
    const particleCount = 500;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.1;
      
      positions[i * 3] = radius * Math.cos(angle);
      positions[i * 3 + 1] = radius * Math.sin(angle);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

      const color = new THREE.Color().setHSL((i / particleCount), 0.8, 0.8);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update uniforms
      ringMaterial.uniforms.uTime.value = elapsedTime;
      ringMaterial.uniforms.uProgress.value = timeline;
      ringMaterial.uniforms.uEnergy.value = energy;

      // Rotate elements
      ring.rotation.z = elapsedTime * 0.5;
      particleSystem.rotation.z = -elapsedTime * 0.3;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particles.dispose();
      particleMaterial.dispose();
    };
  }, [timeline, energy]);

  return <canvas ref={canvasRef} className="w-80 h-80" />;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [timeline, setTimeline] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [done, setDone] = useState(false);

  // Enhanced progress simulation with realistic loading behavior
  useEffect(() => {
    const phases = [
      { duration: 800, ease: (t: number) => t * t }, // slow start
      { duration: 1000, ease: (t: number) => t }, // linear middle
      { duration: 600, ease: (t: number) => 1 - Math.pow(1 - t, 3) }, // fast finish
    ];
    
    let currentPhase = 0;
    let phaseStart = performance.now();
    let totalProgress = 0;
    
    const tick = () => {
      const now = performance.now();
      const phaseElapsed = now - phaseStart;
      const phase = phases[currentPhase];
      
      if (phaseElapsed >= phase.duration) {
        totalProgress += 1 / phases.length;
        currentPhase++;
        phaseStart = now;
        
        if (currentPhase >= phases.length) {
          setTimeline(1);
          setDone(true);
          setTimeout(onLoadingComplete, 300);
          return;
        }
      }
      
      const phaseProgress = Math.min(phaseElapsed / phase.duration, 1);
      const easedPhaseProgress = phase.ease(phaseProgress);
      const currentTotal = totalProgress + (easedPhaseProgress / phases.length);
      
      setTimeline(currentTotal);
      
      // Dynamic energy based on progress and time
      const energyBase = Math.sin(now * 0.005) * 0.3 + 0.7;
      const progressEnergy = 1 - Math.abs(currentTotal - 0.5) * 2; // peak at 50%
      setEnergy(energyBase * progressEnergy);
      
      requestAnimationFrame(tick);
    };
    
    requestAnimationFrame(tick);
  }, [onLoadingComplete]);

  // Progressive loading messages
  const getLoadingMessage = useCallback((progress: number) => {
    if (progress < 0.2) return "Awakening Systems";
    if (progress < 0.4) return "Calibrating Reality";
    if (progress < 0.6) return "Synchronizing Dimensions";
    if (progress < 0.8) return "Materializing Interface";
    return "Finalizing Experience";
  }, []);

  const loadingMessage = getLoadingMessage(timeline);
  const percentage = Math.round(timeline * 100);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ${
      done ? "opacity-0 pointer-events-none" : "opacity-100"
    }`}>
      {/* Enhanced background with gradient animation */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(15, 15, 35, 0.95) 0%, rgba(5, 5, 15, 0.98) 100%),
            radial-gradient(circle at ${30 + energy * 20}% ${35 + energy * 15}%, rgba(100, 50, 200, ${0.08 * energy}) 0%, transparent 50%),
            radial-gradient(circle at ${70 - energy * 15}% ${70 + energy * 10}%, rgba(50, 150, 255, ${0.06 * energy}) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Animated grid overlay */}
      <div 
        className="absolute inset-0 opacity-5 transition-opacity duration-1000"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: `translate(${Math.sin(timeline * 4) * 10}px, ${Math.cos(timeline * 4) * 10}px)`
        }}
      />

      {/* Main loader visualization */}
      <div className="relative">
        {/* Outer glow ring */}
        <div 
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            width: "400px",
            height: "400px",
            left: "-40px",
            top: "-40px",
            background: `radial-gradient(circle, rgba(100, 200, 255, ${0.15 * energy}) 0%, transparent 70%)`,
            filter: `blur(${20 + energy * 30}px)`,
            transform: `scale(${1 + energy * 0.1})`,
          }}
        />
        
        {/* WebGL Canvas */}
        <VisualLoader timeline={timeline} energy={energy} />
      </div>

      {/* Enhanced UI */}
      <div className="absolute bottom-16 text-center">
        {/* Loading message */}
        <div 
          className="text-sm tracking-widest uppercase mb-8 transition-all duration-500"
          style={{
            color: `rgba(255, 255, 255, ${0.7 + energy * 0.3})`,
            textShadow: `0 0 ${10 + energy * 20}px rgba(100, 200, 255, ${0.5 * energy})`,
            letterSpacing: `${0.3 + energy * 0.2}em`
          }}
        >
          {loadingMessage}
        </div>
        
        {/* Enhanced progress bar */}
        <div className="relative w-80 h-0.5 bg-white/10 rounded-full overflow-hidden mb-4">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, 
                rgba(100, 200, 255, 0.8) 0%, 
                rgba(150, 100, 255, 0.9) 50%, 
                rgba(255, 100, 150, 1) 100%)`,
              boxShadow: `0 0 ${10 + energy * 20}px rgba(150, 100, 255, ${0.6 * energy})`
            }}
          />
          
          {/* Progress bar glow */}
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, 
                rgba(100, 200, 255, 0.3) 0%, 
                rgba(255, 255, 255, 0.5) 100%)`,
              filter: `blur(8px)`,
            }}
          />
        </div>
        
        {/* Percentage display */}
        <div 
          className="text-xs font-mono tabular-nums transition-all duration-300"
          style={{
            color: `rgba(255, 255, 255, ${0.6 + energy * 0.4})`,
            textShadow: `0 0 ${5 + energy * 10}px rgba(255, 255, 255, ${0.3 * energy})`
          }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

// Demo component to test the loading screen
const App: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoader(false);
  };

  const resetLoader = () => {
    setShowLoader(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {showLoader ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Loading Complete!</h1>
          <p className="text-gray-300 mb-8">Your enhanced loading screen has finished.</p>
          <button
            onClick={resetLoader}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Show Loading Screen Again
          </button>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;