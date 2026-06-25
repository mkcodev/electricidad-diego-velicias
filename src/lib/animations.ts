export const EASE = {
  smooth: 'power3.out',
  bounce: 'back.out(1.4)',
  expo: 'expo.out',
  in: 'power2.in',
} as const;

export const DUR = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  slower: 1.2,
} as const;

export type RevealVariant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blurIn';

export const REVEAL_FROM: Record<RevealVariant, gsap.TweenVars> = {
  fadeUp:    { y: 40, opacity: 0 },
  fadeLeft:  { x: -40, opacity: 0 },
  fadeRight: { x: 40, opacity: 0 },
  scale:     { scale: 0.92, opacity: 0 },
  blurIn:    { filter: 'blur(12px)', opacity: 0 },
};

export const REVEAL_TO: Record<RevealVariant, gsap.TweenVars> = {
  fadeUp:    { y: 0, opacity: 1, duration: DUR.base, ease: EASE.smooth },
  fadeLeft:  { x: 0, opacity: 1, duration: DUR.base, ease: EASE.smooth },
  fadeRight: { x: 0, opacity: 1, duration: DUR.base, ease: EASE.smooth },
  scale:     { scale: 1, opacity: 1, duration: DUR.base, ease: EASE.bounce },
  blurIn:    { filter: 'blur(0px)', opacity: 1, duration: DUR.slow, ease: EASE.smooth },
};
