'use client';

import { useState, useTransition, KeyboardEvent } from 'react';
import { updateItemPrice } from '@/actions/menu';

interface PriceInputProps {
  itemId: string;
  initialPrice: number;
}

export function PriceInput({ itemId, initialPrice }: PriceInputProps) {
  const [price, setPrice] = useState<string>(initialPrice.toFixed(2));
  const [savedPrice, setSavedPrice] = useState<number>(initialPrice);
  const [isPending, startTransition] = useTransition();
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const handleSave = () => {
    const numericPrice = parseFloat(price);

    if (isNaN(numericPrice) || numericPrice < 0) {
      alert('Please enter a valid price.');
      setPrice(savedPrice.toFixed(2));
      return;
    }

    if (numericPrice === savedPrice) {
      setPrice(numericPrice.toFixed(2));
      return;
    }

    startTransition(async () => {
      const result = await updateItemPrice(itemId, numericPrice);
      if (result.success && result.data) {
        setSavedPrice(result.data.price);
        setPrice(result.data.price.toFixed(2));
        setShowSavedMessage(true);
        setTimeout(() => setShowSavedMessage(false), 2000);
      } else {
        alert(result.error || 'Failed to update price.');
        setPrice(savedPrice.toFixed(2));
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="relative flex items-center space-x-1">
      <span className="text-slate-500 font-semibold text-sm">$</span>
      <div className="relative">
        <input
          type="number"
          step="0.50"
          min="0"
          disabled={isPending}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={`w-24 px-2.5 py-1 text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all ${
            isPending ? 'opacity-50 cursor-wait bg-amber-50 dark:bg-amber-950/20' : ''
          }`}
        />
        {showSavedMessage && (
          <span className="absolute -top-6 left-0 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded shadow">
            Saved!
          </span>
        )}
      </div>
    </div>
  );
}
