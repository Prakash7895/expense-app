import { Image } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { BsCloudUploadFill, BsPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import userIcon from '../assets/user.svg';
import { getUser, setUser } from '../utils/store/userSlice';
import { useAppDispatch, useAppSelector } from '../utils/types';
import DynamicForm from '../components/DynamicForm';
import {
  currencyFormFields,
  nameFormFields,
  passwordFormFields,
} from '../utils/formFields';
import { currencySchema, nameSchema, passSchema } from '../utils/validations';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { errorToast } from '../utils';
import Modal from '../components/Modal';
import useCurrency from '../hooks/useCurrency';

const Profile = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [file, setFile] = useState<File>();
  const [formType, setFormType] = useState<
    'NAME_UPDATE' | 'PASSWORD_UPDATE' | 'CURRENCY_UPDATE' | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector(getUser);

  useEffect(() => {
    if (file && FileReader) {
      const fr = new FileReader();
      fr.onload = function () {
        imageRef.current!.src = fr.result as string;
      };
      fr.readAsDataURL(file);
    } else if (!file) {
      imageRef.current!.src = user?.imageUrl
        ? `${import.meta.env.VITE_BASE_URL}/${user?.imageUrl}`
        : userIcon;
    }
  }, [file, user]);

  const currency = useCurrency();

  const fetchUserData = () =>
    axiosInstance
      .get('/api/user/profile')
      .then((res) => res.data.data)
      .then((data) => {
        dispatch(setUser(data));
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorToast(error);
      });

  const onSubmit = (t: any) => {
    let dataToSend =
      formType === 'PASSWORD_UPDATE'
        ? {
            password: t.password,
          }
        : t;

    axiosInstance
      .patch('/api/user/update-profile', dataToSend)
      .then((response) => {
        toast.success(response.data?.message);
        setFormType(null);
        setSelectedItem({});
        setIsSubmitting(false);
        fetchUserData();
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorToast(error);
      });
  };

  const uploadFile = (f: File) => {
    setFile(f);
    axiosInstance
      .post(
        '/api/user/profile-image',
        {
          imageUrl: f,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        toast.success(response.data?.message);
        fetchUserData();
      })
      .catch((error) => {
        errorToast(error);
      });
  };

  const deleteFile = () => {
    axiosInstance
      .delete('/api/user/profile-image')
      .then((response) => {
        toast.success(response.data?.message);
        setFile(undefined);
        setIsModalOpen(false);
        fetchUserData();
      })
      .catch((error) => {
        errorToast(error);
      });
  };

  return (
    <div>
      <div className='flex gap-5'>
        <div className='group relative w-1/2 max-w-[300px] h-[200px]'>
          <div className='group-hover:bg-[rgba(0,0,0,0.4)] w-full h-0 group-hover:h-full transition-all absolute overflow-hidden flex justify-center items-center gap-5 z-[100] rounded-lg'>
            <BsCloudUploadFill
              size={60}
              className='text-default-600 p-2 cursor-pointer'
              onClick={() => {
                inputRef.current?.click();
              }}
            />
            {user?.imageUrl && (
              <MdDelete
                size={28}
                className='absolute cursor-pointer text-danger-700 top-3 right-3'
                onClick={() => setIsModalOpen(true)}
              />
            )}
          </div>
          <Image
            ref={imageRef}
            classNames={{
              wrapper: '!w-full h-full !max-w-[400px]',
            }}
            alt='NextUI hero Image with delay'
            className={`w-full transition-all border-2 border-default-200 h-full opacity-100 ${
              file || user?.imageUrl ? 'object-cover' : ''
            }`}
            src={
              user?.imageUrl
                ? `${import.meta.env.VITE_BASE_URL}/${user?.imageUrl}`
                : userIcon
            }
          />

          <input
            type='file'
            ref={inputRef}
            className='hidden'
            onChange={(t) => uploadFile(t.target.files?.[0]!)}
          />
        </div>
        <div className='border-2 border-default-200 rounded-md flex-1 p-3'>
          <div>
            <p className='text-bold text-default-400'>Name</p>
            <p className='text-bold capitalize flex gap-3 items-center'>
              {`${user?.firstName} ${user?.lastName}`}
              <BsPencilFill
                className='text-default-400 cursor-pointer'
                size={18}
                onClick={() => {
                  setFormType('NAME_UPDATE');
                  setSelectedItem({
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                  });
                }}
              />
            </p>
          </div>

          {user?.email && (
            <div className='mt-8'>
              <p className='text-bold text-default-400'>Email</p>
              <p className='text-bold capitalize'>{`${user?.email ?? '-'}`}</p>
            </div>
          )}

          {user?.phone && (
            <div className='mt-8'>
              <p className='text-bold text-default-400'>Phone</p>
              <p className='text-bold capitalize'>{`${user?.countryCode}-${user?.phone}`}</p>
            </div>
          )}
        </div>
      </div>
      <div className='border-2 border-default-200 rounded-md mt-10 p-3'>
        <p className='text-xl mb-4 border-b border-default-200 pb-1'>
          Settings
        </p>
        <div className='flex'>
          <div className='flex items-center flex-1 gap-3 px-3'>
            <p className='text-bold'>Change Password</p>{' '}
            <BsPencilFill
              className='text-default-400 cursor-pointer'
              size={18}
              onClick={() => setFormType('PASSWORD_UPDATE')}
            />
          </div>
          <div className='flex items-center flex-1 gap-3 px-3'>
            <span className='text-bold text-default-400'>Currency - </span>
            <span className='text-bold capitalize'>
              {currency?.code} ({currency?.symbol})
            </span>
            <BsPencilFill
              className='text-default-400 cursor-pointer'
              size={18}
              onClick={() => {
                setFormType('CURRENCY_UPDATE');
                setSelectedItem({
                  currency: currency?.code,
                });
              }}
            />
          </div>
        </div>
      </div>
      {formType && (
        <DynamicForm
          fields={
            formType === 'CURRENCY_UPDATE'
              ? currencyFormFields
              : formType === 'PASSWORD_UPDATE'
              ? passwordFormFields
              : nameFormFields
          }
          validationSchema={
            formType === 'CURRENCY_UPDATE'
              ? currencySchema
              : formType === 'PASSWORD_UPDATE'
              ? passSchema
              : nameSchema
          }
          initialValues={selectedItem}
          onSubmit={onSubmit}
          onOpenChange={() => {
            setFormType(null);
            setSelectedItem({});
          }}
          formHeader={
            formType === 'CURRENCY_UPDATE'
              ? 'Update Currency'
              : formType === 'PASSWORD_UPDATE'
              ? 'Update Password'
              : 'Update Name'
          }
          submitButtonProps={{
            isDisabled: isSubmitting,
          }}
          submitButtonLabel='Update'
        />
      )}
      <Modal
        isOpen={isModalOpen}
        handleClose={() => {
          setIsModalOpen(false);
        }}
        header='Confirm'
        confirmBtnAction={deleteFile}
        confirmBtnLabel='Yes'
        body='Are you sure you want to delete this item?'
      />
    </div>
  );
};

export default Profile;
