'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
  } = useCartStore();

  const totalPrice = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Sliding Bottom Drawer / Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto z-50 bg-slate-900 border-t border-slate-800 rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh] text-slate-100"
          >
            {/* Header Drag Bar & Title */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/90 backdrop-blur-md rounded-t-3xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl text-xl">
                  🛒
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Your Selection</h2>
                  <p className="text-xs text-slate-400">
                    {items.length === 0
                      ? 'Your cart is empty'
                      : `${items.length} unique item${items.length === 1 ? '' : 's'}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-slate-400 hover:text-red-400 px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-800/60">
              {items.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <span className="text-4xl block">🍷</span>
                  <p className="text-slate-400 text-sm">No items added to your order yet.</p>
                  <p className="text-xs text-slate-500">Explore our menu and select delicious items to get started.</p>
                </div>
              ) : (
                items.map(({ item, quantity }) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-white truncate">{item.title}</h4>
                        <p className="text-xs text-amber-400 font-semibold mt-0.5">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Subtotal */}
                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="flex items-center bg-slate-800 border border-slate-700/80 rounded-xl p-1 space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg text-sm font-bold transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg text-sm font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-16">
                        <p className="text-sm font-extrabold text-white">
                          ${(item.price * quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[10px] text-slate-500 hover:text-red-400 block ml-auto mt-0.5"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {items.length > 0 && (
              <div className="p-5 border-t border-slate-800 bg-slate-950/80 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-medium">Subtotal</span>
                  <span className="font-extrabold text-white text-lg">${totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => {
                    alert('Order submitted successfully! Thank you for dining with us.');
                    clearCart();
                    closeCart();
                  }}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  Send Order to Kitchen (${totalPrice.toFixed(2)})
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
