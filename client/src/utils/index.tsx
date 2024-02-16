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
