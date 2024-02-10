import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { addTransaction } from '../utils/formFields';
import { addTransactionSchema } from '../utils/validations';
import { useAppSelector } from '../utils/types';
import { getCategory } from '../utils/store/categorySlice';
import axiosInstance from '../utils/axiosInstance';
import { transactionColumns } from '../utils/columnFields';
import { useQuery } from '@tanstack/react-query';
import CrudComponent from '../components/CrudComponent';

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
          item.type === 'debit'
            ? 'bg-danger-50 text-danger'
            : 'bg-success-50 text-success'
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
          <Card className='py-4 text-foreground-600 bg-content1'>
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
              <p className='text-tiny uppercase font-bold'>Total Earnings</p>
            </CardHeader>
            <CardBody className='overflow-visible py-2'>
              <h4 className='font-bold text-large text-success'>
                ${data?.data.totalCredit._sum.amount}
              </h4>
            </CardBody>
          </Card>
          <Card className='py-4 text-foreground-600 bg-content1'>
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
              <p className='text-tiny uppercase font-bold'>Total Expenses</p>
            </CardHeader>
            <CardBody className='overflow-visible py-2'>
              <h4 className='font-bold text-large text-danger'>
                ${data?.data.totalDebit._sum.amount}
              </h4>
            </CardBody>
          </Card>
        </div>
      }
    />
  );
};

export default Transaction;
