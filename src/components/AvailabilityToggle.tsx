'use client';

import { useState, useTransition } from 'react';
import { toggleItemAvailability } from '@/actions/menu';

interface AvailabilityToggleProps {
  itemId: string;
  initialIsAvailable: boolean;
}

export function AvailabilityToggle({ itemId, initialIsAvailable }: AvailabilityToggleProps) {
  const [isAvailable, setIsAvailable] = useState(initialIsAvailable);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const nextState = !isAvailable;
    setIsAvailable(nextState); // optimistic update

    startTransition(async () => {
      const result = await toggleItemAvailability(itemId, nextState);
      if (!result.success) {
        setIsAvailable(!nextState); // revert on failure
        alert(result.error || 'Failed to update availability.');
      }
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        role="switch"
        aria-checked={isAvailable}
        disabled={isPending}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
          isPending ? 'opacity-60 cursor-not-allowed' : ''
        } ${isAvailable ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isAvailable ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-xs font-semibold ${isAvailable ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500'}`}>
        {isPending ? 'Updating...' : isAvailable ? 'Available' : 'Unavailable'}
      </span>
    </div>
  );
}
