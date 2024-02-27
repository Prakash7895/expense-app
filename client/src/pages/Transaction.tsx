import { addTransaction } from '../utils/formFields';
import { addTransactionSchema } from '../utils/validations';
import { useAppSelector } from '../utils/types';
import { getCategory } from '../utils/store/categorySlice';
import axiosInstance from '../utils/axiosInstance';
import { transactionColumns } from '../utils/columnFields';
import { useQuery } from '@tanstack/react-query';
import CrudComponent from '../components/CrudComponent';
import TransactionCard from '../components/TransactionCard';
import { AutocompleteItem } from '@nextui-org/react';
import { DateTime } from 'luxon';
import useCurrency from '../hooks/useCurrency';
import { getTransactionDescription } from '../utils';
import useResize from '../hooks/useResize';

const Transaction = () => {
  const categories = useAppSelector(getCategory);

  const currency = useCurrency();
  const width = useResize();

  const { data, refetch } = useQuery<{
    success: boolean;
    data: any;
  }>({
    queryKey: ['balance-info'],
    queryFn: async () => {
      return axiosInstance
        .get(`/api/transaction/balance-info`)
        .then((res) => res.data);
    },
    refetchOnWindowFocus: false,
  });

  const renderOption = (item: any) => (
    <AutocompleteItem
      key={item.id}
      textValue={`${
        item.name?.trim()?.length
          ? item.name
          : item.firstName
          ? `${item.firstName} ${item.lastName}`
          : item.email
          ? item.email
          : `${item.countryCode}-${item.phone}`
      }`}
    >
      <div className='flex gap-2 items-center'>
        <div className='flex flex-col'>
          <span className='text-small'>{`${
            item.name?.trim()?.length
              ? item.name
              : item.firstName
              ? `${item.firstName} ${item.lastName}`
              : item.email
              ? item.email
              : `${item.countryCode}-${item.phone}`
          }`}</span>
          <span className='text-tiny text-default-400'>
            {item.email ? item.email : `${item.countryCode}-${item.phone}`}
          </span>
        </div>
      </div>
    </AutocompleteItem>
  );

  let columns = transactionColumns.map((el) => ({ ...el }));

  if (width < 450) {
    columns.splice(2, 2);
    columns[0].name = 'Info';
  } else if (width < 600) {
    columns.splice(2, 1);
  }

  return (
    <CrudComponent
      key={currency?.countryCode}
      headerLabel='Transactions'
      headerDescription='Update and explore transactions.'
      headerBtnLabel='Add Transaction'
      api='/api/transaction/list'
      queryKey={['transaction']}
      crudApi='/api/transaction/'
      formHeader='Add Transaction'
      tableColumns={columns}
      defaultSortDescriptor={{
        column: 'date',
        direction: 'descending',
      }}
      columnRenderers={{
        type: (val: string) => val[0].toUpperCase() + val.substring(1),
        category: (val: any, item: any) => {
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-small capitalize'>{val?.name}</p>
              <p className='text-bold text-tiny text-default-400'>
                {getTransactionDescription(item)}
              </p>
              {width < 450 && (
                <p>{DateTime.fromISO(item.date).toFormat('DD, t a')}</p>
              )}
            </div>
          );
        },
        date: (val) => DateTime.fromISO(val).toFormat('DD, t a'),
        amount: (val) => `${currency?.symbol}${val}`,
      }}
      tableRowClassName={(item) =>
        `border-b-medium ${
          item.type === 'debit' ? 'bg-danger-50' : 'bg-success-50'
        }`
      }
      formFields={addTransaction(categories ?? [], renderOption)}
      formValidationSchema={addTransactionSchema}
      onSubmitSuccess={() => {
        refetch();
      }}
      onDeleteSuccess={() => {
        refetch();
      }}
      beforeTableComponent={
        <div className='my-5 flex gap-4 items-center'>
          <TransactionCard
            label='Total Earnings'
            body={`${currency?.symbol}${
              data?.data?.totalCredit._sum.amount ?? 0
            }`}
            bodyClassName='text-success'
          />
          <h4 className='font-bold text-large'>-</h4>
          <TransactionCard
            label='Total Expenses'
            body={`${currency?.symbol}${
              data?.data?.totalDebit._sum.amount ?? 0
            }`}
            bodyClassName='text-danger'
          />
          <h4 className='font-bold text-large'>=</h4>
          <TransactionCard
            label='Current Balance'
            body={`${currency?.symbol}${
              (data?.data?.totalCredit._sum.amount || 0) -
              (data?.data?.totalDebit._sum.amount || 0)
            }`}
          />
        </div>
      }
    />
  );
};

export default Transaction;
