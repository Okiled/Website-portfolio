import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ExtrudeGeometry, Shape } from 'three'
import * as THREE from 'three'

interface BoxProps {
  position: [number, number, number];
  width?: number;
  length?: number;
  cornerRadius?: number;
  gridPosition: [number, number];
  hoveredBox: [number, number] | null;
  rippleScale?: number;
  rippleRadius?: number;
}

// Shared geometry untuk mengurangi memory usage
const createSharedGeometry = (() => {
  let sharedGeometry: THREE.ExtrudeGeometry | null = null;
  
  return (width: number, length: number, cornerRadius: number) => {
    if (!sharedGeometry) {
      const shape = new Shape();
      const radius = cornerRadius;
      const halfWidth = width / 2;
      const halfLength = length / 2;
      const angleStep = Math.PI * 0.5;

      shape.absarc(halfWidth - radius, halfLength - radius, radius, 0, angleStep);
      shape.absarc(-halfWidth + radius, halfLength - radius, radius, angleStep, angleStep * 2);
      shape.absarc(-halfWidth + radius, -halfLength + radius, radius, angleStep * 2, angleStep * 3);
      shape.absarc(halfWidth - radius, -halfLength + radius, radius, angleStep * 3, angleStep * 4);

      const extrudeSettings = {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 16, // Reduced from 20
        curveSegments: 16  // Reduced from 20
      };

      sharedGeometry = new ExtrudeGeometry(shape, extrudeSettings);
      sharedGeometry.center();
    }
    return sharedGeometry;
  };
})();

const Box = ({ 
  position, 
  width = 4, 
  length = 4, 
  cornerRadius = 2,
  gridPosition,
  hoveredBox,
  rippleScale = 0.3,
  rippleRadius = 3
}: BoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentScale, setCurrentScale] = useState(1);
  
  const geometry = useMemo(() => createSharedGeometry(width, length, cornerRadius), [width, length, cornerRadius]);

  // Optimized hover calculation
  const targetScale = useMemo(() => {
    const isThisBoxHovered = hoveredBox?.[0] === gridPosition[0] && hoveredBox?.[1] === gridPosition[1];
    
    if (isThisBoxHovered) return 5;
    if (!hoveredBox) return 1;
    
    const dx = gridPosition[0] - hoveredBox[0];
    const dz = gridPosition[1] - hoveredBox[1];
    const distance = Math.sqrt(dx * dx + dz * dz);
    
    if (distance <= rippleRadius && distance > 0) {
      const falloff = Math.max(0, 1 - distance / rippleRadius);
      return 1 + falloff * rippleScale * 3;
    }
    return 1;
  }, [hoveredBox, gridPosition, rippleScale, rippleRadius]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    const lerpFactor = 0.1;
    const newScale = currentScale + (targetScale - currentScale) * lerpFactor;
    
    // Skip update jika perubahan sangat kecil
    if (Math.abs(newScale - currentScale) > 0.001) {
      setCurrentScale(newScale);
      meshRef.current.scale.z = newScale;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.gridPosition = gridPosition;
    }
  }, [gridPosition]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshPhysicalMaterial 
        color="#232323" 
        roughness={0.5} 
        metalness={1}
        clearcoat={1}
        clearcoatRoughness={0}
        clearcoatNormalScale={1}
        clearcoatNormalMap={null}
      />
    </mesh>
  );
};

function HoverDetector({ 
  onHoverChange 
}: {
  gridSize: number;
  spacingX: number;
  spacingZ: number;
  onHoverChange: (hoveredBox: [number, number] | null) => void;
}) {
  const { camera, raycaster, pointer, scene } = useThree();
  const lastHovered = useRef<[number, number] | null>(null);

  useFrame(() => {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    let newHovered: [number, number] | null = null;
    
    if (intersects.length > 0) {
      for (const intersect of intersects) {
        const mesh = intersect.object as THREE.Object3D & { userData?: any };
        if (mesh.userData?.gridPosition) {
          newHovered = mesh.userData.gridPosition as [number, number];
          break;
        }
      }
    }
    
    // Hanya update jika berbeda dari sebelumnya
    if (lastHovered.current?.[0] !== newHovered?.[0] || lastHovered.current?.[1] !== newHovered?.[1]) {
      lastHovered.current = newHovered;
      onHoverChange(newHovered);
    }
  });

  return null;
}

function GridOfBoxes() {
  const gridSizeX = 16;
  const gridSizeZ = 10;
  const boxWidth = 4;
  const boxLength = 4;
  const gap = 0.05;
  const spacingX = boxWidth + gap;
  const spacingZ = boxLength + gap;
  const rippleScale = 2.5;
  const rippleRadius = 2;

  const [hoveredBox, setHoveredBox] = useState<[number, number] | null>(null);
  
  // Memoize hover change handler
  const handleHoverChange = useCallback((newHoveredBox: [number, number] | null) => {
    setHoveredBox(newHoveredBox);
  }, []);
  
  // Pre-calculate positions dan memoize boxes
  const boxes = useMemo(() => {
    const boxArray: React.ReactNode[] = [];
    
    for (let x = 0; x < gridSizeX; x++) {
      for (let z = 0; z < gridSizeZ; z++) {
        const posX = (x - (gridSizeX - 1) / 2) * spacingX;
        const posZ = (z - (gridSizeZ - 1) / 2) * spacingZ;

        boxArray.push(
          <Box
            key={`${x}-${z}`}
            position={[posX, -0.85, posZ]}
            width={boxWidth}
            length={boxLength}
            cornerRadius={0.8}
            gridPosition={[x, z]}
            hoveredBox={hoveredBox}
            rippleScale={rippleScale}
            rippleRadius={rippleRadius}
          />
        );
      }
    }
    return boxArray;
  }, [hoveredBox, gridSizeX, gridSizeZ, spacingX, spacingZ, boxWidth, boxLength, rippleScale, rippleRadius]);

  return (
    <>
      <HoverDetector
        gridSize={gridSizeX}
        spacingX={spacingX}
        spacingZ={spacingZ}
        onHoverChange={handleHoverChange}
      />
      {boxes}
    </>
  );
}

export default function ChromeGrid() {
  return (
    <div className="h-full w-full bg-black relative z-5">
      <Canvas
        camera={{ 
          position: [-9.31, 12, 24.72], 
          rotation: [-0.65, -0.2, -0.13],
          fov: 35 
        }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance" // Optimize untuk performance
        }}
        dpr={[1, 2]} // Limit device pixel ratio untuk performance
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 15, 10]} intensity={10} castShadow />
        <directionalLight position={[-10, 10, -5]} intensity={10} color="#ffffff" />
        <directionalLight position={[5, -10, 15]} intensity={5} color="#f0f8ff" />
        <pointLight position={[0, 20, 3]} intensity={2} distance={50} />
        <pointLight position={[15, 5, 15]} intensity={1.5} distance={40} color="#ffffff" />
        <GridOfBoxes />
      </Canvas>
    </div>
  )
}