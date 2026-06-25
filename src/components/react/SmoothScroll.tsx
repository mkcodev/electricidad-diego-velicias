'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { initGsap, ScrollTrigger } from '@lib/gsap-init';
import { gsap } from 'gsap';

export default function SmoothScroll() {
  useEffect(() => {
    initGsap();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Sincronizar Lenis con ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Exponer instancia globalmente para que otros scripts puedan usarla
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis = undefined;
    };
  }, []);

  return null;
}
