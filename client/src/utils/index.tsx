import { toast } from 'react-toastify';

export const errorToast = (err: any) =>
  toast.error(
    <div>
      {err?.response?.data?.errors?.map((el: any) => (
        <p key={el.msg}>{el.msg}</p>
      )) ??
        err?.response?.data?.message ??
        err?.message ??
        'Error'}
    </div>
  );

export const getTransactionDescription = (item: any) => {
  const name = item?.relatedUser
    ? item?.relatedUser?.firstName
      ? `${item?.relatedUser?.firstName} ${item?.relatedUser?.lastName}`
      : item?.relatedUser?.email
      ? item?.relatedUser?.email
      : `${item?.relatedUser?.countryCode}-${item?.relatedUser?.phone}`
    : '';

  if (item?.category?.name === 'Rent' && item?.relatedUser) {
    return `Rent ${item.type === 'debit' ? 'to' : 'from'} ${name}`;
  } else if (item?.category?.name === 'Borrowed' && item?.relatedUser) {
    return `Borrowed ${item.type === 'debit' ? 'to' : 'from'} ${name}`;
  }
  return item?.description;
};
