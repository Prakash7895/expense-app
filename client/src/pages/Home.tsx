import { Button, ModalBody, ModalFooter } from '@nextui-org/react';
import { useState } from 'react';
import DynamicForm from '../components/DynamicForm';
import { addTransaction } from '../utils/formFields';
import { addTransactionSchema } from '../utils/validations';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex justify-end m-5'>
      <Button color='secondary' onPress={() => setIsOpen(true)}>
        Add Transaction
      </Button>

      <DynamicForm
        fields={addTransaction}
        validationSchema={addTransactionSchema}
        onSubmit={(t) => console.log('T', t)}
        formHeader='Add Transaction'
        submitButtonLabel='Add'
        isOpen={isOpen}
        onOpenChange={(t) => setIsOpen(t)}
        buttonsWrapperComponent={ModalFooter}
        fieldsWrapperComponent={ModalBody}
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
    </div>
  );
};

export default Home;
