import { RefObject, useLayoutEffect, useRef, useState } from 'react';

export function useStickyObserver<T extends HTMLElement | null>(
  ref: RefObject<T>,
  className = 'sticky',
  topOffset = 0
) {
  const [distance, setDistance] = useState(0);

  const startScrollY = useRef<number | null>(null);
  const isStickyRef = useRef(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = `${topOffset}px`;
    sentinel.style.height = '1px';
    sentinel.style.width = '1px';
    sentinel.style.pointerEvents = 'none';
    sentinel.style.visibility = 'hidden';

    el.parentElement?.insertBefore(sentinel, el);

    const onScroll = () => {
      if (!isStickyRef.current || startScrollY.current === null) return;
      const delta = window.scrollY - startScrollY.current;
      setDistance(Math.max(0, delta));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isSticky = !entry.isIntersecting;

        // enter sticky
        if (isSticky && !isStickyRef.current) {
          isStickyRef.current = true;
          startScrollY.current = window.scrollY;
          setDistance(0);
          window.addEventListener('scroll', onScroll, { passive: true });
        }

        // leave sticky
        if (!isSticky && isStickyRef.current) {
          isStickyRef.current = false;
          startScrollY.current = null;
          setDistance(0);
          window.removeEventListener('scroll', onScroll);
        }

        el.classList.toggle(className, isSticky);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${topOffset}px 0px 0px 0px`,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      sentinel.remove();
      el.classList.remove(className);
      setDistance(0);
    };
  }, [ref, className, topOffset]);

  return distance;
}
