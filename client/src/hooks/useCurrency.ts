import { currencies } from '../utils/constants';
import { getUser } from '../utils/store/userSlice';
import { useAppSelector } from '../utils/types';

const useCurrency = () => {
  const user = useAppSelector(getUser);
  const currency = currencies.find((c) => c.code === user?.currency);

  return currency;
};

export default useCurrency;
