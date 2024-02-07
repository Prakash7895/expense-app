import { Column } from './types';

export const transactionColumns: Column[] = [
  { name: 'Category', uid: 'category' },
  { name: 'Amount', uid: 'amount' },
  { name: 'Type', uid: 'type' },
  { name: 'Action', uid: 'actions' },
];

export const categoryColumns: Column[] = [
  { name: 'Name', uid: 'name' },
  { name: 'Type', uid: 'type' },
];
