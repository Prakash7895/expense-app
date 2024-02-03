import { Button } from '@nextui-org/react';
import { useState } from 'react';
import DynamicForm from '../components/DynamicForm';
import { addTransaction } from '../utils/formFields';
import { addTransactionSchema } from '../utils/validations';
import PageHeader from '../components/PageHeader';
import ListTransactions from '../components/ListTransactions';

const Transaction = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='flex'>
        <PageHeader
          label='Transactions'
          description='Update and explore transactions.'
          btnLabel='Add Transaction'
          onPress={() => setIsOpen(true)}
        />
      </div>

      <DynamicForm
        fields={addTransaction}
        validationSchema={addTransactionSchema}
        onSubmit={(t) => console.log('T', t)}
        formHeader='Add Transaction'
        submitButtonLabel='Add'
        isOpen={isOpen}
        onOpenChange={(t) => setIsOpen(t)}
        fieldsWrapperClassName='gap-0'
        buttonWrapperClassName='justify-start items-center flex-row-reverse gap-3'
        otherFooterElements={
          <Button
            color='danger'
            variant='flat'
            onPress={() => setIsOpen(false)}
          >
            Close
          </Button>
        }
      />
      <ListTransactions />
    </div>
  );
};

export default Transaction;
