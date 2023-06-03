'use client';

import { useEffect, useState } from 'react';

import { Navigation2 } from 'lucide-react';

import { ContainerLink } from './styles';

export default function GoToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
        return;
      }
      setShowButton(false);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <ContainerLink href="#" title="Ir para o topo">
          <Navigation2 />
        </ContainerLink>
      )}
    </>
  );
}
