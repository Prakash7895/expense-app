import { prisma } from './utils';

const incomeList = ['Business', 'Loan', 'Salary'];
const expenseList = [
  'Bills',
  'Clothing',
  'Communications',
  'Drinks',
  'Eating Out',
  'Education',
  'Entertainment',
  'Food',
  'Fuel',
  'Fun',
  'Gifts',
  'Hospital',
  'Hotel',
  'Medical',
  'Merchandise',
  'Movie',
  'Other',
  'Personal',
  'Pets',
  'Restaurant',
  'Shopping',
  'Sports',
  'Taxi',
  'Tips',
  'Toiletry',
  'Transport',
];

async function main() {
  await prisma.category.createMany({
    data: [
      ...expenseList.map((exp) => ({
        userId: null,
        name: exp,
        type: 'debit' as any,
      })),
      ...incomeList.map((exp) => ({ userId: null, name: exp, type: 'credit' })),
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
