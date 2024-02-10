import { Column } from './types';

export const transactionColumns: Column[] = [
  { name: 'Category', uid: 'category' },
  { name: 'Amount', uid: 'amount' },
  { name: 'Type', uid: 'type' },
  { name: 'Action', uid: 'actions' },
];

export const categoryColumns: Column[] = [
  { name: 'Name', uid: 'name', isSortable: true },
  { name: 'Type', uid: 'type', isSortable: true },
  { name: 'Action', uid: 'actions' },
];

export const accountColumns: Column[] = [
  { name: 'Name', uid: 'name', isSortable: true },
  { name: 'Description', uid: 'description' },
  { name: 'Action', uid: 'actions' },
];
