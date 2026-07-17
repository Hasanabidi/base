import { gsap } from './gsap';

export const REVEAL_EASE = 'power3.out';

/**
 * Fade-in reveal driven by a ScrollTrigger. Wraps the `gsap.from` pattern
 * repeated across sections and pages: it defaults `opacity: 0` and the shared
 * ease, and lifts `trigger`/`start` out of the nested `scrollTrigger` object.
 *
 * Any extra vars (`y`, `x`, `stagger`, `duration`, ...) are forwarded to
 * `gsap.from`, and `scrollTrigger` can be extended via `scrollTrigger`.
 *
 * @param {any} targets
 * @param {{ trigger?: any, start?: string, ease?: string, scrollTrigger?: object, [key: string]: any }} [options]
 */
export function revealOnScroll(
  targets,
  { trigger, start = 'top 80%', ease = REVEAL_EASE, scrollTrigger, ...vars } = {}
) {
  return gsap.from(targets, {
    opacity: 0,
    ease,
    ...vars,
    scrollTrigger: { trigger, start, ...scrollTrigger },
  });
}
