import React, { PropsWithChildren } from 'react';

export type AvatarGroupdCounterProps = PropsWithChildren<{
  total?: number;
  href: string;
}>;

export const AvatarGroupCounter: React.FC<AvatarGroupdCounterProps> = ({ total, href }) => {
  return (
    <a
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-xs font-medium text-white ring-2 ring-gray-300 hover:bg-gray-600 dark:border-gray-800 "
      href={href}
    >
      +{total}
    </a>
  );
};
