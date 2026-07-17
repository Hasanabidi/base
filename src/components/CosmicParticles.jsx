import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { computeCurl } from '@/utils/curlNoise';

const MAX_PARTICLES = 10000;
const PARTICLE_LIFETIME = 2.8;

// Theme-matched palettes (indigo / violet accents from the design system).
const PALETTES = {
  dark: ['#818CF8', '#A78BFA', '#6366F1', '#C4B5FD'],
  light: ['#4F46E5', '#7C3AED', '#6366F1', '#8B5CF6'],
};
const CURSOR_COLOR = { dark: '#A78BFA', light: '#6D28D9' };

function makeSprite() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.2, 'rgba(255,255,255,0.85)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.25)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

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
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const isDark = theme === 'dark';

  const sprite = useMemo(makeSprite, []);
  const palette = useMemo(
    () => (isDark ? PALETTES.dark : PALETTES.light).map((c) => new THREE.Color(c)),
    [isDark]
  );

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      arr.push({
        active: false,
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        color: new THREE.Color(),
        life: 0,
      });
    }
    return arr;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
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
    p.life = PARTICLE_LIFETIME * (0.7 + Math.random() * 0.3);
    spawnIndex.current = (spawnIndex.current + 1) % MAX_PARTICLES;
  };

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dt = Math.min(delta, 1 / 30);

    // Dense emission from the cursor (constant stream + a burst while moving).
    if (mouseWorld.current) {
      const m = mouseWorld.current;
      for (let i = 0; i < 45; i++) spawn(m.x, m.y, m.z, 1.4);
    }
    // A little ambient life across the scene.
    for (let i = 0; i < 4; i++) {
      spawn(
        (Math.random() - 0.5) * viewport.width,
        (Math.random() - 0.5) * viewport.height,
        (Math.random() - 0.5) * 6,
        0.5
      );
    }

    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion();

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = particles[i];
      if (!p.active) {
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        continue;
      }

      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        continue;
      }

      const curl = computeCurl(p.position.x * 0.3, p.position.y * 0.3, p.position.z * 0.3);
      p.velocity.add(curl.multiplyScalar(dt * 5));
      p.velocity.multiplyScalar(0.96);
      p.position.addScaledVector(p.velocity, dt);

      const lifeRatio = p.life / PARTICLE_LIFETIME;
      const scale = lifeRatio * (isDark ? 0.09 : 0.1);
      const speed = p.velocity.length();
      const stretch = Math.min(4, Math.max(1, speed * 0.1));

      dummy.position.copy(p.position);
      dummy.scale.set(scale, scale, scale * stretch);
      if (speed > 0.01) {
        q.setFromUnitVectors(up, p.velocity.clone().normalize());
        dummy.quaternion.copy(q);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, p.color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, MAX_PARTICLES]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial
        map={sprite}
        transparent
        opacity={isDark ? 0.9 : 0.75}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
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
    <Trail width={0.6} length={16} color={new THREE.Color(color)} attenuation={(t) => t * t}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} toneMapped={false} />
        <mesh>
          <sphereGeometry args={[0.5, 24, 24]} />
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

  // Convert the normalised pointer to a world position on the z=0 plane.
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
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        key={theme}
        camera={{ position: [0, 0, 20], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <Scene theme={theme} />
      </Canvas>
    </div>
  );
}
