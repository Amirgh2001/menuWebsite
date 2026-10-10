import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  // Create 2 categories
  const appetizers = await prisma.category.create({
    data: {
      name: 'Starters & Appetizers',
      order: 1,
      items: {
        create: [
          {
            title: 'Truffle Burrata',
            description: 'Fresh Italian burrata served with black truffle pesto, heirloom tomatoes, and aged balsamic glaze on artisanal crostini.',
            price: 18.5,
            imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb1626d?auto=format&fit=crop&q=80&w=800',
            isAvailable: true,
          },
          {
            title: 'Seared Wagyu Beef Carpaccio',
            description: 'Thinly sliced A5 Wagyu beef topped with capers, shaved Parmigiano-Reggiano, wild arugula, and extra virgin olive oil.',
            price: 24.0,
            imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
            isAvailable: true,
          },
        ],
      },
    },
  });

  const mainCourses = await prisma.category.create({
    data: {
      name: 'Main Courses',
      order: 2,
      items: {
        create: [
          {
            title: 'Pan-Seared Chilean Sea Bass',
            description: 'Served over saffron risotto with wilted baby spinach and a lemon-herb beurre blanc sauce.',
            price: 42.0,
            imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
            isAvailable: true,
          },
          {
            title: 'Prime Dry-Aged Ribeye',
            description: '14oz 28-day dry-aged Prime ribeye steak served with truffle mashed potatoes and roasted bone marrow butter.',
            price: 58.0,
            imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
            isAvailable: true,
          },
        ],
      },
    },
  });

  console.log('Database successfully seeded with 2 categories and 4 menu items:');
  console.log(`- Category: ${appetizers.name}`);
  console.log(`- Category: ${mainCourses.name}`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
