import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { computeCurl } from '@/utils/curlNoise';

const MAX_PARTICLES = 7000;
const PARTICLE_LIFETIME = 3.5;

// Theme-matched palettes (indigo / violet accents from the design system).
const PALETTES = {
  dark: ['#6366F1', '#8B5CF6', '#818CF8'],
  light: ['#6366F1', '#7C3AED', '#8B5CF6'],
};

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

function ParticleSystem({ theme }) {
  const meshRef = useRef(null);
  const { viewport, gl } = useThree();

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
  // Cursor position in normalised device coords (-1..1); null until first move.
  const pointer = useRef(null);
  const prevPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointer.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };
    const onLeave = () => {
      pointer.current = null;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [gl]);

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
    const halfW = viewport.width / 2;
    const halfH = viewport.height / 2;

    // Ambient emission keeps the field alive without any interaction.
    for (let i = 0; i < 6; i++) {
      spawn(
        (Math.random() - 0.5) * viewport.width,
        (Math.random() - 0.5) * viewport.height,
        (Math.random() - 0.5) * 6,
        0.5
      );
    }

    // Cursor trail — emission scales with how fast the pointer moves.
    if (pointer.current) {
      const dx = pointer.current.x - prevPointer.current.x;
      const dy = pointer.current.y - prevPointer.current.y;
      const moved = Math.hypot(dx, dy);
      const count = Math.min(40, Math.round(moved * 260));
      const cx = pointer.current.x * halfW;
      const cy = pointer.current.y * halfH;
      for (let i = 0; i < count; i++) spawn(cx, cy, 0, 1.4);
      prevPointer.current.x = pointer.current.x;
      prevPointer.current.y = pointer.current.y;
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

      // Grow-then-shrink envelope so particles fade in and out smoothly.
      const ageRatio = 1 - p.life / PARTICLE_LIFETIME;
      const envelope = Math.sin(Math.min(1, ageRatio) * Math.PI);
      const scale = envelope * (isDark ? 0.09 : 0.11);
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
        opacity={isDark ? 0.9 : 0.6}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
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
        <ParticleSystem theme={theme} />
      </Canvas>
    </div>
  );
}
