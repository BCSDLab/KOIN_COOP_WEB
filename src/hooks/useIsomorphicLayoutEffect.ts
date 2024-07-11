import { useEffect, useLayoutEffect } from 'react';
import type { DependencyList, EffectCallback } from 'react';

function useIsomorphicLayoutEffect(effect: EffectCallback, deps?: DependencyList) {
  const effectHook = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  effectHook(effect, deps);
}

export default useIsomorphicLayoutEffect;
