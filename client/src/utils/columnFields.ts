import { Column } from './types';

export const transactionColumns: Column[] = [
  { name: 'Category', uid: 'category' },
  { name: 'Amount', uid: 'amount' },
  { name: 'Type', uid: 'type' },
  { name: 'Date', uid: 'date' },
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

export const userColumns: Column[] = [
  { name: 'Name', uid: 'name', isSortable: true },
  { name: 'Invited On', uid: 'createdAt', isSortable: true },
];
