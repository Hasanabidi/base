import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once for the whole app. Import gsap/ScrollTrigger
// from this module instead of registering the plugin in each file.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
