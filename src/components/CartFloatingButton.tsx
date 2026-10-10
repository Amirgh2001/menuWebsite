'use client';

import { useCartStore } from '@/store/useCartStore';

export function CartFloatingButton() {
  const { getTotalItems, getTotalPrice, openCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={openCart}
        className="flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-5 py-3.5 rounded-full shadow-2xl shadow-amber-500/40 border border-amber-400/40 active:scale-95 transition-all cursor-pointer"
      >
        <span className="text-xl">🛒</span>
        <span className="bg-slate-950 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-extrabold">
          {totalItems}
        </span>
        <span className="text-sm tracking-wide uppercase border-l border-slate-950/20 pl-2">
          View Order (${totalPrice.toFixed(2)})
        </span>
      </button>
    </div>
  );
}
