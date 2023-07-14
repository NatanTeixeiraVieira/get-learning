'use client';

import { useRouter } from 'next/navigation';

import Button from 'components/Button';

export default function ButtonBackToPreviousPage() {
  const router = useRouter();

  return (
    <Button text="Página anterior" width="50%" onClick={() => router.back()} />
  );
}
