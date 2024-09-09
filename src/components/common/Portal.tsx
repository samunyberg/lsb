'use client';

import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);
  const portalRoot = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = document.createElement('div');
    const id = 'portal-root';
    div.id = id;
    document.body.appendChild(div);
    portalRoot.current = div;
    setMounted(true);

    return () => {
      if (portalRoot.current && document.body.contains(portalRoot.current)) {
        document.body.removeChild(portalRoot.current);
      }
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, portalRoot.current!);
};

export default Portal;
