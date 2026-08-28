import { auth } from '@/lib/firebase/firebase';
import { signOut } from 'firebase/auth';
import type React from 'react';
import { ButtonSecondary } from '../ButtonSecondary';

interface PageHeaderProps {
  breadcrumb: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function PageHeader({ breadcrumb, title, description, action }: PageHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between pt-6 pb-4">
        {breadcrumb}
        <ButtonSecondary onClick={() => signOut(auth)}>Sign Out</ButtonSecondary>
      </div>
      <div className="flex flex-col py-6">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xl leading-none font-medium">{title}</span>
            <span className="text-text-secondary text-sm font-normal">{description}</span>
          </div>
          <div>{action && <span>{action}</span>}</div>
        </div>
      </div>
    </>
  );
}
