import { addTransaction } from '../utils/formFields';
import { addTransactionSchema } from '../utils/validations';
import { useAppSelector } from '../utils/types';
import { getCategory } from '../utils/store/categorySlice';
import axiosInstance from '../utils/axiosInstance';
import { transactionColumns } from '../utils/columnFields';
import { useQuery } from '@tanstack/react-query';
import CrudComponent from '../components/CrudComponent';
import TransactionCard from '../components/TransactionCard';

const Transaction = () => {
  const categories = useAppSelector(getCategory);

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

  // console.log('DATA', data?.data);

  return (
    <CrudComponent
      headerLabel='Transactions'
      headerDescription='Update and explore transactions.'
      headerBtnLabel='Add Transaction'
      api='/api/transaction/list'
      queryKey={['transaction']}
      crudApi='/api/transaction/'
      formHeader='Add Transaction'
      tableColumns={transactionColumns}
      columnRenderers={{
        type: (val: string) => val[0].toUpperCase() + val.substring(1),
        category: (val: any, item: any) => {
          return (
            <div className='flex flex-col'>
              <p className='text-bold text-small capitalize'>{val?.name}</p>
              <p className='text-bold text-tiny capitalize text-default-400'>
                {item?.description}
              </p>
            </div>
          );
        },
      }}
      tableRowClassName={(item) =>
        `border-b-medium ${
          item.type === 'debit' ? 'bg-danger-50' : 'bg-success-50'
        }`
      }
      formFields={addTransaction(categories ?? [])}
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
            body={`$${data?.data.totalCredit._sum.amount ?? 0}`}
            bodyClassName='text-success'
          />
          <h4 className='font-bold text-large'>-</h4>
          <TransactionCard
            label='Total Expenses'
            body={`$${data?.data.totalDebit._sum.amount ?? 0}`}
            bodyClassName='text-danger'
          />
          <h4 className='font-bold text-large'>=</h4>
          <TransactionCard
            label='Current Balance'
            body={`$${
              (data?.data.totalCredit._sum.amount || 0) -
              (data?.data.totalDebit._sum.amount || 0)
            }`}
          />
        </div>
      }
    />
  );
};

export default Transaction;
