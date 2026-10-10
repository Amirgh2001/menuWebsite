'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCategoriesWithItems() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        items: {
          orderBy: {
            title: 'asc',
          },
        },
      },
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return { success: false, error: 'Failed to fetch categories and items.' };
  }
}

export async function toggleItemAvailability(itemId: string, isAvailable: boolean) {
  try {
    const updatedItem = await prisma.menuItem.update({
      where: { id: itemId },
      data: { isAvailable },
    });
    try {
      revalidatePath('/admin');
      revalidatePath('/');
    } catch {
      // Ignore static store missing error when invoked outside Next context
    }
    return { success: true, data: updatedItem };
  } catch (error) {
    console.error(`Failed to toggle availability for item ${itemId}:`, error);
    return { success: false, error: 'Failed to update item availability.' };
  }
}

export async function updateItemPrice(itemId: string, price: number) {
  if (isNaN(price) || price < 0) {
    return { success: false, error: 'Price must be a non-negative number.' };
  }

  try {
    const updatedItem = await prisma.menuItem.update({
      where: { id: itemId },
      data: { price },
    });
    try {
      revalidatePath('/admin');
      revalidatePath('/');
    } catch {
      // Ignore static store missing error when invoked outside Next context
    }
    return { success: true, data: updatedItem };
  } catch (error) {
    console.error(`Failed to update price for item ${itemId}:`, error);
    return { success: false, error: 'Failed to update item price.' };
  }
}
