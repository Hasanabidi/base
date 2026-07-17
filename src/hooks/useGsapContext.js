import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Runs `setup` inside a scoped `gsap.context` bound to the returned ref and
 * reverts it on cleanup. Centralizes the `useLayoutEffect` + `gsap.context` +
 * `ctx.revert()` boilerplate shared by animated sections and pages.
 *
 * `setup` receives the current root element so it can be used as a
 * ScrollTrigger trigger.
 *
 * @param {(root: any) => void} setup
 * @param {import('react').DependencyList} [deps=[]]
 * @returns {import('react').MutableRefObject<any>} ref to attach to the root node.
 */
export function useGsapContext(setup, deps = []) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => setup(root.current), root);
    return () => ctx.revert();
  }, deps);

  return root;
}
