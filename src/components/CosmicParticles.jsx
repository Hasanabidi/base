import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { computeCurl } from '@/utils/curlNoise';

const MAX_PARTICLES = 16000;
const PARTICLE_LIFETIME = 3.0;

// Theme-matched palettes (indigo / violet accents from the design system).
const PALETTES = {
  dark: ['#818CF8', '#A78BFA', '#6366F1', '#C4B5FD', '#E0E7FF'],
  light: ['#4F46E5', '#7C3AED', '#6366F1', '#8B5CF6'],
};
const CURSOR_COLOR = { dark: '#C4B5FD', light: '#6D28D9' };

// Soft gaussian point sprite — a smooth glow with no hard rim, so particles
// read as fine dust rather than bubbles.
function makeSprite() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(size, size);
  const c = (size - 1) / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - c) / c;
      const dy = (y - c) / c;
      const r2 = dx * dx + dy * dy;
      const a = Math.exp(-r2 * 6.0); // gaussian falloff
      const i = (y * size + x) * 4;
      img.data[i] = 255;
      img.data[i + 1] = 255;
      img.data[i + 2] = 255;
      img.data[i + 3] = Math.round(Math.min(1, a) * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

const vertexShader = `
  attribute float aScale;
  attribute float aAlpha;
  uniform float uSize;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = color;
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aScale * uSize * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float a = texture2D(uTexture, gl_PointCoord).a;
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
  }
`;

function RotatingStars() {
  const group = useRef(null);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.02;
      group.current.rotation.x += delta * 0.01;
    }
  });
  return (
    <group ref={group}>
      <Stars radius={120} depth={60} count={4000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

function Particles({ theme, mouseWorld }) {
  const pointsRef = useRef(null);
  const { viewport } = useThree();
  const isDark = theme === 'dark';

  const sprite = useMemo(makeSprite, []);
  const palette = useMemo(
    () => (isDark ? PALETTES.dark : PALETTES.light).map((c) => new THREE.Color(c)),
    [isDark]
  );

  const { positions, colors, scales, alphas } = useMemo(
    () => ({
      positions: new Float32Array(MAX_PARTICLES * 3),
      colors: new Float32Array(MAX_PARTICLES * 3),
      scales: new Float32Array(MAX_PARTICLES),
      alphas: new Float32Array(MAX_PARTICLES),
    }),
    []
  );

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      arr.push({
        active: false,
        position: new THREE.Vector3(1e6, 1e6, 1e6),
        velocity: new THREE.Vector3(),
        color: new THREE.Color(),
        size: 1,
        life: 0,
      });
    }
    return arr;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: sprite },
      uSize: { value: isDark ? 34 : 36 },
      uOpacity: { value: isDark ? 1.0 : 0.9 },
    }),
    [sprite, isDark]
  );

  const spawnIndex = useRef(0);

  const spawn = (x, y, z, spread) => {
    const p = particles[spawnIndex.current];
    p.active = true;
    p.position.set(
      x + (Math.random() - 0.5) * spread,
      y + (Math.random() - 0.5) * spread,
      z + (Math.random() - 0.5) * spread
    );
    p.velocity.set(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
    p.color.copy(palette[(Math.random() * palette.length) | 0]);
    p.size = 0.5 + Math.random() * 1.2;
    p.life = PARTICLE_LIFETIME * (0.7 + Math.random() * 0.3);
    spawnIndex.current = (spawnIndex.current + 1) % MAX_PARTICLES;
  };

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    const dt = Math.min(delta, 1 / 30);

    if (mouseWorld.current) {
      const m = mouseWorld.current;
      for (let i = 0; i < 85; i++) spawn(m.x, m.y, m.z, 1.6);
    }
    for (let i = 0; i < 6; i++) {
      spawn(
        (Math.random() - 0.5) * viewport.width,
        (Math.random() - 0.5) * viewport.height,
        (Math.random() - 0.5) * 6,
        0.5
      );
    }

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = particles[i];
      const i3 = i * 3;
      if (!p.active) {
        alphas[i] = 0;
        positions[i3] = 1e6;
        positions[i3 + 1] = 1e6;
        positions[i3 + 2] = 1e6;
        continue;
      }

      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        alphas[i] = 0;
        positions[i3] = 1e6;
        positions[i3 + 1] = 1e6;
        positions[i3 + 2] = 1e6;
        continue;
      }

      const curl = computeCurl(p.position.x * 0.3, p.position.y * 0.3, p.position.z * 0.3);
      p.velocity.add(curl.multiplyScalar(dt * 5));
      p.velocity.multiplyScalar(0.96);
      p.position.addScaledVector(p.velocity, dt);

      const ageRatio = 1 - p.life / PARTICLE_LIFETIME;
      const envelope = Math.sin(Math.min(1, ageRatio) * Math.PI);

      positions[i3] = p.position.x;
      positions[i3 + 1] = p.position.y;
      positions[i3 + 2] = p.position.z;
      colors[i3] = p.color.r;
      colors[i3 + 1] = p.color.g;
      colors[i3 + 2] = p.color.b;
      scales[i] = p.size;
      alphas[i] = envelope;
    }

    const geo = points.geometry;
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
    geo.attributes.aScale.needsUpdate = true;
    geo.attributes.aAlpha.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aAlpha" args={[alphas, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        vertexColors
        transparent
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

// Glowing cursor dot with a fading motion trail (drei <Trail/>).
function Cursor({ theme, mouseWorld }) {
  const meshRef = useRef(null);
  const color = CURSOR_COLOR[theme] || CURSOR_COLOR.dark;

  useFrame((state) => {
    if (meshRef.current && mouseWorld.current) {
      meshRef.current.position.lerp(mouseWorld.current, 0.5);
      const s = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.2;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <Trail width={0.4} length={9} color={new THREE.Color(color)} attenuation={(t) => t * t}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} toneMapped={false} />
        <mesh>
          <sphereGeometry args={[0.34, 20, 20]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </mesh>
    </Trail>
  );
}

function Scene({ theme }) {
  const { gl, viewport } = useThree();
  const isDark = theme === 'dark';
  const pointerNorm = useRef(null);
  const mouseWorld = useRef(null);

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerNorm.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };
    const onLeave = () => {
      pointerNorm.current = null;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [gl]);

  useFrame(() => {
    if (pointerNorm.current) {
      const wx = pointerNorm.current.x * (viewport.width / 2);
      const wy = pointerNorm.current.y * (viewport.height / 2);
      if (mouseWorld.current) mouseWorld.current.set(wx, wy, 0);
      else mouseWorld.current = new THREE.Vector3(wx, wy, 0);
    }
  });

  return (
    <>
      {isDark && <RotatingStars />}
      <Particles theme={theme} mouseWorld={mouseWorld} />
      <Cursor theme={theme} mouseWorld={mouseWorld} />
    </>
  );
}

export default function CosmicParticles({ theme = 'dark', className = '' }) {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        key={theme}
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <Scene theme={theme} />
      </Canvas>
    </div>
  );
}
