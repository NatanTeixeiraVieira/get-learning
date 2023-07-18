'use client';

import { useRouter } from 'next/navigation';

import { Button } from 'components/Button';

export default function ButtonBackToPreviousPage() {
  const router = useRouter();

  return (
    <Button.Root width="50%" onClick={() => router.back()}>
      Página anterior
    </Button.Root>
  );
}
