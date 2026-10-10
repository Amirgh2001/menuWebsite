import Link from 'next/link';
import { getCategoriesWithItems } from '@/actions/menu';
import { CategoryNav } from '@/components/CategoryNav';
import { FoodCard } from '@/components/FoodCard';
import { CartDrawer } from '@/components/CartDrawer';
import { CartFloatingButton } from '@/components/CartFloatingButton';

export const revalidate = 0;

export default async function CustomerMenuPage() {
  const response = await getCategoriesWithItems();
  const categories = response.success && response.data ? response.data : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80 pt-10 pb-12 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-400">
            <span>✨</span>
            <span>FINE DINING DIGITAL EXPERIENCE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            L'ÉTOILE <span className="text-amber-500">RESTAURANT</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Crafted with passion, using locally sourced organic ingredients and timeless culinary artistry.
          </p>

          <div className="pt-2 flex items-center justify-center space-x-4">
            <Link
              href="/admin"
              className="text-xs font-semibold text-slate-400 hover:text-amber-400 underline underline-offset-4 transition-colors"
            >
              ⚙️ Switch to Admin Console
            </Link>
          </div>
        </div>
      </header>

      {/* Sticky Category Nav Bar */}
      <CategoryNav categories={categories} />

      {/* Main Food Menu Display */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {categories.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-lg">No menu categories found. Please seed the database.</p>
          </div>
        ) : (
          categories.map((category) => (
            <section
              key={category.id}
              id={`category-${category.id}`}
              className="scroll-mt-32 space-y-6"
            >
              {/* Category Title */}
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {category.name}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-800 via-amber-500/30 to-transparent" />
              </div>

              {/* Food Items Responsive Grid (1 col mobile, 2 tablet, 3-4 laptop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.items.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Cart Drawer & Floating Action Button */}
      <CartFloatingButton />
      <CartDrawer />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-6 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} L'Étoile Restaurant. All rights reserved.</p>
      </footer>
    </div>
  );
}
