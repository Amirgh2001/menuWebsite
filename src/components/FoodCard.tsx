'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MenuItemData, useCartStore } from '@/store/useCartStore';

interface FoodCardProps {
  item: MenuItemData;
}

export function FoodCard({ item }: FoodCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group relative bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 ${
        !item.isAvailable ? 'opacity-70 grayscale-[30%]' : 'hover:border-amber-500/50 hover:shadow-amber-500/10'
      }`}
    >
      <div>
        {/* Food Image Wrapper */}
        <div className="relative w-full aspect-video overflow-hidden bg-slate-950">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            quality={95}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Subtle Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

          {/* Availability Badge */}
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center">
              <span className="bg-red-500/90 text-white font-black text-xs uppercase px-3 py-1.5 rounded-full tracking-wider shadow-lg">
                Sold Out
              </span>
            </div>
          )}

          {/* Price Badge */}
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 font-extrabold text-sm px-3 py-1 rounded-full shadow-lg">
            ${item.price.toFixed(2)}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-5 space-y-2">
          <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        <button
          onClick={() => addItem(item)}
          disabled={!item.isAvailable}
          className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer ${
            item.isAvailable
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>🛒</span>
          <span>{item.isAvailable ? 'Add to Order' : 'Currently Unavailable'}</span>
        </button>
      </div>
    </motion.div>
  );
}
