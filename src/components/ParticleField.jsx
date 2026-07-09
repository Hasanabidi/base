import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute vec3 aRandom;

  varying float vDistance;
  varying float vMouseInfluence;

  void main() {
    vec3 pos = position;

    // Subtle organic movement — simulates controlled chaos
    float t = uTime * 0.3;
    pos.x += sin(t + aRandom.x * 6.28) * 0.4;
    pos.y += cos(t * 0.8 + aRandom.y * 6.28) * 0.4;
    pos.z += sin(t * 0.6 + aRandom.z * 6.28) * 0.4;

    // Mouse attraction — particles flow toward cursor
    vec2 toMouse = uMouse - pos.xy;
    float distToMouse = length(toMouse);
    float influence = smoothstep(4.0, 0.0, distToMouse) * uMouseStrength;
    pos.xy += normalize(toMouse + 0.001) * influence * 0.6;

    vMouseInfluence = influence;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * uPixelRatio * (250.0 / -mvPosition.z);

    vDistance = -mvPosition.z;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uGlowColor;

  varying float vDistance;
  varying float vMouseInfluence;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, dist);
    alpha *= smoothstep(25.0, 3.0, vDistance);

    vec3 color = mix(uColor, uGlowColor, vMouseInfluence);

    gl_FragColor = vec4(color, alpha * 0.7);
  }
`;

function ParticleSystem() {
  const pointsRef = useRef();
  const materialRef = useRef();
  const { viewport, pointer } = useThree();

  const { positions, scales, randoms } = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randoms = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute in a fulcrum-like volume — wider at top, narrowing at bottom
      const t = Math.random();
      const radius = (3 + Math.random() * 6) * (0.5 + t * 0.8);
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 12;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius - 2;

      scales[i] = Math.random() * 2 + 0.5;

      randoms[i3] = Math.random();
      randoms[i3 + 1] = Math.random();
      randoms[i3 + 2] = Math.random();
    }

    return { positions, scales, randoms };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColor: { value: new THREE.Color('#C7FF3A') },
      uGlowColor: { value: new THREE.Color('#D9FF7A') },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!materialRef.current || !pointsRef.current) return;

    uniforms.uTime.value += delta;

    // Smooth mouse tracking
    const targetX = pointer.x * viewport.width * 0.5;
    const targetY = pointer.y * viewport.height * 0.5;
    uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.05;
    uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.05;

    // Mouse strength builds when cursor is active
    const targetStrength = pointer.x !== 0 || pointer.y !== 0 ? 1 : 0;
    uniforms.uMouseStrength.value +=
      (targetStrength - uniforms.uMouseStrength.value) * 0.03;

    // Subtle camera parallax
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x =
      Math.sin(uniforms.uTime.value * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SceneCamera() {
  const { camera, pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <SceneCamera />
      <ParticleSystem />
    </Canvas>
  );
}