import { Button } from '@nextui-org/react';
import { Key, useState } from 'react';
import DynamicForm from '../components/DynamicForm';
import { addTransaction } from '../utils/formFields';
import { addTransactionSchema } from '../utils/validations';
import PageHeader from '../components/PageHeader';
import { useAppSelector } from '../utils/types';
import { getCategory } from '../utils/store/categorySlice';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import DataTable from '../components/DataTable';
import { transactionColumns } from '../utils/columnFields';
import Modal from '../components/Modal';

const Transaction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refetchNum, setRefetchNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = useAppSelector(getCategory);

  const onSubmit = (t: any) => {
    const transactionData = Object.keys(t).reduce((acc, key) => {
      if (t[key]) {
        acc = {
          ...acc,
          [key]: t[key],
        };
      }
      return acc;
    }, {});

    setIsSubmitting(true);

    (selectedItem
      ? axiosInstance.put(
          `/api/transaction/${selectedItem.id}`,
          transactionData
        )
      : axiosInstance.post('/api/transaction', transactionData)
    )
      .then((response) => {
        console.log(response.data);
        toast.success(response.data?.message);
        setIsOpen(false);
        setRefetchNum((p) => p + 1);
        setSelectedItem(null);
        setIsSubmitting(false);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const handleDelete = () => {
    if (selectedItem) {
      axiosInstance
        .delete(`/api/transaction/${selectedItem.id}`)
        .then((res) => {
          toast.success(res.data?.message);
          setSelectedItem(null);
          setIsModalOpen(false);
          setRefetchNum((p) => p + 1);
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  };

  const onRowAction = (key: Key, item: any) => {
    console.log('ITEM', key, item);

    setSelectedItem(item);
    if (key === 'delete') {
      setIsModalOpen(true);
    } else if (key === 'edit') {
      setIsOpen(true);
    }
  };

  console.log('selected', selectedItem);

  return (
    <div>
      <div className='flex'>
        <PageHeader
          label='Transactions'
          description='Update and explore transactions.'
          btnLabel='Add Transaction'
          onPress={() => {
            setSelectedItem(null);
            setIsOpen(true);
          }}
        />
      </div>

      {isOpen && (
        <DynamicForm
          fields={addTransaction(categories ?? [])}
          validationSchema={addTransactionSchema}
          initialValues={selectedItem}
          onSubmit={onSubmit}
          onOpenChange={() => setIsOpen(false)}
          formHeader='Add Transaction'
          submitButtonLabel='Add'
          fieldsWrapperClassName='gap-0'
          buttonWrapperClassName='justify-start items-center flex-row-reverse gap-3'
          submitButtonProps={{
            isDisabled: isSubmitting,
          }}
          otherFooterElements={
            <Button
              color='danger'
              variant='flat'
              onPress={() => {
                setIsOpen(false);
                setSelectedItem(null);
              }}
            >
              Close
            </Button>
          }
        />
      )}

      <DataTable
        columns={transactionColumns}
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
        api='/api/transaction/list'
        queryKey={['transaction']}
        refetchNum={refetchNum}
        tableRowClassName={(item) =>
          `border-b-medium ${
            item.type === 'debit'
              ? 'bg-danger-50 text-danger'
              : 'bg-success-50 text-success'
          }`
        }
        actionItems={[
          {
            key: 'edit',
            label: 'Edit',
          },
          {
            key: 'delete',
            label: 'Delete',
            color: 'danger',
            className: 'text-danger',
          },
        ]}
        onRowAction={onRowAction}
      />
      <Modal
        isOpen={isModalOpen}
        handleClose={() => {
          setSelectedItem(null);
          setIsModalOpen(false);
        }}
        header='Confirm'
        confirmBtnAction={handleDelete}
        confirmBtnLabel='Yes'
        body='Are you sure you want to delete this item?'
      />
    </div>
  );
};

export default Transaction;
