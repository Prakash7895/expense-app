import { Button } from '@nextui-org/react';
import axiosInstance from '../utils/axiosInstance';
import DynamicForm from '../components/DynamicForm';
import { inviteFormFields } from '../utils/formFields';
import { inviteSchema } from '../utils/validations';
import { useState } from 'react';
import { errorToast } from '../utils';
import { toast } from 'react-toastify';

const Home = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteHandler = (t: any) => {
    console.log('TT,', t);

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

    console.log('DATA', data);

    if (data?.length) {
      axiosInstance
        .post('/api/user/invite', {
          emailOrPhoneArr: data,
        })
        .then((res) => {
          toast.success(res.data?.message);
          setIsLoading(false);
          setCount(0);
          setVisible(false);
        })
        .catch((err) => {
          setIsLoading(false);
          errorToast(err);
        });
    }
  };

  const getFields = () => {
    const arr = Array.from({ length: count + 1 }, (_, idx) => idx).map(
      (idx) => ({
        ...inviteFormFields,
        name: inviteFormFields.name + `.${idx}`,
      })
    );
    console.log('ARR', arr);
    return arr;
  };

  return (
    <div>
      <Button
        variant='shadow'
        onClick={() => {
          setCount(0);
          setVisible(true);
        }}
      >
        Invite
      </Button>

      {visible && (
        <DynamicForm
          onOpenChange={() => setVisible(false)}
          formHeader='Login'
          onSubmit={inviteHandler}
          fields={getFields()}
          submitButtonLabel='Sign In'
          validationSchema={inviteSchema}
          fieldsWrapperClassName='gap-0'
          submitButtonProps={{
            isLoading,
            isDisabled: isLoading,
          }}
          otherFormBodyElements={
            <div>
              <Button
                variant='light'
                className='text-default-500'
                isDisabled={count > 3}
                onClick={() => setCount((p) => p + 1)}
              >
                +Add more
              </Button>
            </div>
          }
          buttonWrapperClassName='justify-start items-center flex-row-reverse gap-3'
        />
      )}
    </div>
  );
};

export default Home;
