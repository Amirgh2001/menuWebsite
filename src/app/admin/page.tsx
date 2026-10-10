import Image from 'next/image';
import { getCategoriesWithItems } from '@/actions/menu';
import { Sidebar } from '@/components/Sidebar';
import { AvailabilityToggle } from '@/components/AvailabilityToggle';
import { PriceInput } from '@/components/PriceInput';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const response = await getCategoriesWithItems();
  const categories = response.success && response.data ? response.data : [];

  const totalCategories = categories.length;
  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const availableItems = categories.reduce(
    (sum, cat) => sum + cat.items.filter((item) => item.isAvailable).length,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-5 sticky top-0 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Menu Management
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Manage categories, toggle availability, and edit prices in real-time.
              </p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="inline-flex items-center px-3 py-1 rounded-full font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                ⚡ Server Actions Enabled
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl text-2xl">
                📂
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Total Categories
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {totalCategories}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl text-2xl">
                🍽️
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Total Menu Items
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {totalItems}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl text-2xl">
                ✅
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Available Items
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {availableItems} <span className="text-sm font-normal text-slate-500">/ {totalItems}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Categories & Items Data Table */}
          {categories.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 text-base">No categories or items found. Please run the database seed script.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {categories.map((category) => (
                <section
                  key={category.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="bg-slate-100/70 dark:bg-slate-800/60 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                        {category.name}
                      </h2>
                    </div>
                    <span className="text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">
                      {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  {/* Items Table for Desktop / Tablet */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
                          <th className="px-6 py-3.5 w-16">Image</th>
                          <th className="px-6 py-3.5">Item Details</th>
                          <th className="px-6 py-3.5 w-44">Price ($)</th>
                          <th className="px-6 py-3.5 w-48">Availability</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {category.items.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                          >
                            {/* Image Thumbnail */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.title}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              </div>
                            </td>

                            {/* Title & Description */}
                            <td className="px-6 py-4">
                              <div className="font-bold text-slate-900 dark:text-white text-base">
                                {item.title}
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 max-w-xl">
                                {item.description}
                              </p>
                            </td>

                            {/* Inline Price Editing */}
                            <td className="px-6 py-4 whitespace-nowrap align-middle">
                              <PriceInput itemId={item.id} initialPrice={item.price} />
                            </td>

                            {/* Inline Availability Toggle */}
                            <td className="px-6 py-4 whitespace-nowrap align-middle">
                              <AvailabilityToggle
                                itemId={item.id}
                                initialIsAvailable={item.isAvailable}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Friendly Card View */}
                  <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-800">
                    {category.items.map((item) => (
                      <div key={item.id} className="p-4 space-y-3">
                        <div className="flex space-x-3">
                          <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                              {item.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Controls Row */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-0.5">
                              Price
                            </span>
                            <PriceInput itemId={item.id} initialPrice={item.price} />
                          </div>

                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-0.5">
                              Status
                            </span>
                            <AvailabilityToggle
                              itemId={item.id}
                              initialIsAvailable={item.isAvailable}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
