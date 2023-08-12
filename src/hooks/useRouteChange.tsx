import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type useRoteChangeParams = (handler: () => void) => void;

export const useRouteChange: useRoteChangeParams = (handler) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    handler();
  }, [pathname, searchParams, handler]);
};
