import DataTable from './DataTable';
import { Column } from '../utils/types';

const columns: Column[] = [
  { name: 'Type', uid: 'type' },
  { name: 'Amount', uid: 'amount' },
  { name: 'Category', uid: 'category.name' },
  { name: 'Description', uid: 'description' },
];

const ListTransactions = () => {
  return (
    <DataTable
      columns={columns}
      columnRenderers={{
        type: (val: string) => val[0].toUpperCase() + val.substring(1),
      }}
    />
  );
};

export default ListTransactions;
