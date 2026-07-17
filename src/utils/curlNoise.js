import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';

const noise3D = createNoise3D();

/**
 * Curl of a simplex-noise field — produces smooth, divergence-free flow
 * that makes particles swirl organically instead of drifting apart.
 */
export function computeCurl(x, y, z) {
  const eps = 0.0001;
  const curl = new THREE.Vector3();

  let n1 = noise3D(x, y + eps, z);
  let n2 = noise3D(x, y - eps, z);
  const a = (n1 - n2) / (2 * eps);

  n1 = noise3D(x, y, z + eps);
  n2 = noise3D(x, y, z - eps);
  const b = (n1 - n2) / (2 * eps);

  curl.x = a - b;

  n1 = noise3D(x, y, z + eps);
  n2 = noise3D(x, y, z - eps);
  const c = (n1 - n2) / (2 * eps);

  n1 = noise3D(x + eps, y, z);
  n2 = noise3D(x - eps, y, z);
  const d = (n1 - n2) / (2 * eps);

  curl.y = c - d;

  n1 = noise3D(x + eps, y, z);
  n2 = noise3D(x - eps, y, z);
  const e = (n1 - n2) / (2 * eps);

  n1 = noise3D(x, y + eps, z);
  n2 = noise3D(x, y - eps, z);
  const f = (n1 - n2) / (2 * eps);

  curl.z = e - f;

  return curl.normalize();
}
