import { Button } from '@nextui-org/react';
import axiosInstance from '../utils/axiosInstance';
import DynamicForm from '../components/DynamicForm';
import { inviteFormFields } from '../utils/formFields';
import { inviteSchema } from '../utils/validations';
import { useState } from 'react';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const inviteHandler = () => {
    axiosInstance.post('/api/user/invite', {
      emailOrPhone: 'prakash_saran@yopmail.com',
    });
  };

  return (
    <div>
      <Button variant='shadow' onClick={inviteHandler}>
        Invite
      </Button>

      <DynamicForm
        hideCloseButton
        formHeader='Login'
        onSubmit={(t) => console.log('TT,', t)}
        fields={inviteFormFields}
        submitButtonLabel='Sign In'
        validationSchema={inviteSchema}
        fieldsWrapperClassName='gap-0'
        submitButtonProps={{
          isLoading,
          isDisabled: isLoading,
        }}
        buttonWrapperClassName='justify-start items-center flex-row-reverse gap-3'
      />
    </div>
  );
};

export default Home;
