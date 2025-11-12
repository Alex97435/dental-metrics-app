import React from 'react';
import { clsx } from 'clsx';

export function Alert({ className, variant = 'default', children, ...props }) {
  return (
    <div
      className={clsx(
        'relative w-full rounded-lg border p-4',
        {
          'bg-background text-foreground': variant === 'default',
          'border-destructive/50 text-destructive dark:border-destructive': variant === 'destructive'
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertDescription({ className, children, ...props }) {
  return (
    <div className={clsx('text-sm [&_p]:leading-relaxed', className)} {...props}>
      {children}
    </div>
  );
}
