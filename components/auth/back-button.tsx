'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <div className="flex justify-center w-full">
      <Button variant="link" className="font-normal" asChild>
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};
