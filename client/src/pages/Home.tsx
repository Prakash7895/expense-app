import { AutocompleteItem, Button } from '@nextui-org/react';
import axiosInstance from '../utils/axiosInstance';
import DynamicForm from '../components/DynamicForm';
import { addTransaction, inviteFormFields } from '../utils/formFields';
import { addTransactionSchema, inviteSchema } from '../utils/validations';
import { useState } from 'react';
import { errorToast, getTransactionDescription } from '../utils';
import { toast } from 'react-toastify';
import PieByCategory from '../components/PieByCategory';
import FAB from '../components/FAB';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { GiWallet } from 'react-icons/gi';
import { getCategory } from '../utils/store/categorySlice';
import { useAppSelector } from '../utils/types';
import TransactionCard from '../components/TransactionCard';
import useCurrency from '../hooks/useCurrency';
import { useQuery } from '@tanstack/react-query';
import DataTable from '../components/DataTable';
import { transactionColumns } from '../utils/columnFields';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const categories = useAppSelector(getCategory);

  const [formType, setFormType] = useState<'INVITE' | 'ADD_TRANSACTION' | null>(
    null
  );
  const [userCount, setUserCount] = useState(0);
  const [count, setCount] = useState(1);

  const currency = useCurrency();

  const inviteHandler = (t: any) => {
    setIsLoading(true);
    const data = t?.emailOrPhone?.map((el: string, idx: number) => {
      const isPhoneNumber = /^\d+$/.test(el);

      if (isPhoneNumber) {
        return {
          emailOrPhone: el,
          countryCode: t?.countryCode[idx]?.value,
        };
      }
      return {
        emailOrPhone: el,
      };
    });

    if (data?.length) {
      axiosInstance
        .post('/api/user/invite', {
          emailOrPhoneArr: data,
        })
        .then((res) => {
          toast.success(res.data?.message);
          setIsLoading(false);
          setUserCount(0);
          setFormType(null);
        })
        .catch((err) => {
          setIsLoading(false);
          errorToast(err);
        });
    }
  };

  const getFields = () => {
    const arr = Array.from({ length: userCount + 1 }, (_, idx) => idx).map(
      (idx) => ({
        ...inviteFormFields,
        name: inviteFormFields.name + `.${idx}`,
      })
    );
    return arr;
  };

  const actionItems = [
    {
      icon: <GiWallet size={25} />,
      label: 'Add Transaction',
      description: 'Add new transaction.',
      action: () => setFormType('ADD_TRANSACTION'),
    },
    {
      icon: <MdOutlineMarkEmailRead size={25} />,
      label: 'Invite User',
      description: 'Link them when borrowing or paying rent.',
      action: () => {
        setUserCount(0);
        setFormType('INVITE');
      },
    },
  ];

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
  });

  const addTransactionHandler = (t: any) => {
    const transactionData = Object.keys(t).reduce((acc, key) => {
      acc = {
        ...acc,
        [key]: t[key],
      };
      return acc;
    }, {});

    setIsLoading(true);

    axiosInstance
      .post(`/api/transaction/`, transactionData)
      .then((response) => {
        toast.success(response.data?.message);
        setFormType(null);
        setIsLoading(false);
        refetch();
        setCount((p) => p + 1);
      })
      .catch((error) => {
        setIsLoading(false);
        errorToast(error);
      });
  };

  const renderOption = (item: any) => (
    <AutocompleteItem
      key={item.id}
      textValue={`${
        item.name.trim().length
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
            item.name.trim().length
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

  return (
    <div className='mt-4'>
      <PieByCategory refetch={count} />

      {formType && (
        <DynamicForm
          onOpenChange={() => setFormType(null)}
          formHeader={formType === 'INVITE' ? 'Invite' : 'Add Transaction'}
          onSubmit={
            formType === 'INVITE' ? inviteHandler : addTransactionHandler
          }
          fields={
            formType === 'INVITE'
              ? getFields()
              : addTransaction(categories ?? [], renderOption)
          }
          submitButtonLabel={formType === 'INVITE' ? 'Invite' : 'Add'}
          validationSchema={
            formType === 'INVITE' ? inviteSchema : addTransactionSchema
          }
          fieldsWrapperClassName='gap-0'
          submitButtonProps={{
            isLoading,
            isDisabled: isLoading,
          }}
          otherFormBodyElements={
            formType === 'INVITE' ? (
              <div>
                <Button
                  variant='light'
                  className='text-default-500'
                  isDisabled={userCount > 3}
                  onClick={() => setUserCount((p) => p + 1)}
                >
                  +Add more
                </Button>
              </div>
            ) : null
          }
          buttonWrapperClassName='justify-start items-center flex-row-reverse gap-3'
        />
      )}
      <FAB actionItems={actionItems} />

      <div className='my-5 flex gap-4 items-center justify-center'>
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
          body={`${currency?.symbol}${data?.data?.totalDebit._sum.amount ?? 0}`}
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

      <DataTable
        refetchNum={count}
        showBottomContent={false}
        queryKey={['transaction']}
        api={'/api/transaction/list'}
        columns={transactionColumns.slice(0, transactionColumns.length - 1)}
        customTopContent={
          <div className='flex justify-between items-center'>
            <p>Recent Transactions</p>
            <Link
              to='/transaction'
              className='text-small text-secondary-500 flex items-center gap-1'
            >
              Manage Transactions
              <FaArrowRight />
            </Link>
          </div>
        }
        tableRowClassName={(item) =>
          `border-b-medium h-[50px] ${
            item.type === 'debit' ? 'bg-danger-50' : 'bg-success-50'
          }`
        }
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
              </div>
            );
          },
          date: (val) => DateTime.fromISO(val).toFormat('DD, t a'),
          amount: (val) => `${currency?.symbol}${val}`,
        }}
      />
    </div>
  );
};

export default Home;
